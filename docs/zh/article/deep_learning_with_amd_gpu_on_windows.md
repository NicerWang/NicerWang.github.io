---
title: 在Windows上使用AMD显卡进行深度学习
---
# 在Windows上使用AMD显卡进行深度学习

> 初次编写时间：2022/09/26
>
> 上次更新时间：2023/07/15

以往，AMD显卡进行深度学习，需要使用Linux系统，并安装ROCm。

而现在，微软开源了[DirectML](https://github.com/microsoft/DirectML)项目，使得任何支持DirectX12的显卡，都可以在Windows平台上进行深度学习。

## 如何配置

这里以`PyTorch-DirectML`为例进行配置：

1. （可选）安装`MiniConda`环境，并配置环境变量：

   ```
   Path\To\Miniconda3
   Path\To\Miniconda3\Scripts
   Path\To\Miniconda3\Library\bin
   ```

2. 创建一个`Python`环境（若不使用`Conda`，也需使用`3.8-3.10`版本）

   ```bash
   conda create -n directML python=3.8
   ```

3. 激活环境并开始安装依赖

   ```bash
   conda activate directML
   pip install torch-directml
   ```

4. 使用方法

   ```python
   import torch_directml
   dml = torch_directml.device() # device=dml
   ```

## 运行一个开源项目

选择了腾讯开源的[GFPGAN](https://github.com/TencentARC/GFPGAN)，这是一个恢复真实人脸的深度神经网络，同时内置了[Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN)支持，可以恢复人脸之外的背景。

1. 按照其[提示](https://github.com/TencentARC/GFPGAN#wrench-dependencies-and-installation)进行安装：

   **教程中提及：如果不仅想要修复人脸，还需要增强背景，则还需要安装Real-ESRGAN。**

   在完成教程后，需要手动下载预训练的模型：

   ```bash
   wget https://github.com/TencentARC/GFPGAN/releases/download/v1.3.0/GFPGANv1.3.pth -P experiments/pretrained_models
   ```

   > 也可以使用其他工具下载后移动到对应目录。
   >
   > 另外，此项目还依赖了很多其他的深度神经网络，这些参数会在首次运行时下载，你也可以观察控制台信息进行手动下载，并移动到对应目录。

2. 项目的使用方法为：

   ```bash
   Usage: python inference_gfpgan.py -i inputs/whole_imgs -o results -v 1.3 -s 2 [options]...
   
     -h                   show this help
     -i input             Input image or folder. Default: inputs/whole_imgs
     -o output            Output folder. Default: results
     -v version           GFPGAN model version. Option: 1 | 1.2 | 1.3. Default: 1.3
     -s upscale           The final upsampling scale of the image. Default: 2
     -bg_upsampler        background upsampler. Default: realesrgan
     -bg_tile             Tile size for background sampler, 0 for no tile during testing. Default: 400
     -suffix              Suffix of the restored faces
     -only_center_face    Only restore the center face
     -aligned             Input are aligned faces
     -ext                 Image extension. Options: auto | jpg | png, auto means using the same extension as inputs. Default: auto
   ```

3. 关于Real-ESRGAN

   由于其在CPU上运行较慢，所以在CPU设备上默认关闭，在`inference_gfpgan.py`第59行，将这部分代码修改即可启用该功能：

   ```python
   # ------------------------ set up background upsampler ------------------------
   if args.bg_upsampler == 'realesrgan':
       from basicsr.archs.rrdbnet_arch import RRDBNet
       from realesrgan import RealESRGANer
       model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64, num_block=23, num_grow_ch=32, scale=2)
       bg_upsampler = RealESRGANer(
           scale=2,
           model_path='https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.1/RealESRGAN_x2plus.pth',
           model=model,
           tile=args.bg_tile,
           tile_pad=10,
           pre_pad=0,
           half=False)  # 视是否支持fp16而定，CPU不支持
   else:
       bg_upsampler = None
   ```

   **至此，可在CPU上顺利完成完整的图片修复工作。**

5. 支持DirectML

   在`inference_gfpgan.py`中：为`RealESRGANer`和`GFPGANer`的构造函数，添加`device`参数。

   ```python
   import torch_directml
   dml = torch_directml.device()
   
   bg_upsampler = RealESRGANer(..., device=dml)
   restorer = GFPGANer(..., device=dml)
```
   
**但目前存在两个问题：**
   
   * `upsampler`在执行几次后，便会触发`basicsr\archs\arch_util.py`中的断言，目前暂未解决：
   
  ```python
     assert hh % scale == 0 and hw % scale == 0
  ```
   
   * 如果禁用`realesrgan`，则人脸可以正常完成处理，但处理结果十分诡异。
   
  为避免引起不适，这里不展示结果，问题在于CPU输出结果正常，而DirectML输出异常。
   
  经过分析，问题可能出在双线性插值算子当中，我已在DirectML项目当中提出Issue，[点击这里跳转](https://github.com/microsoft/DirectML/issues/482)。

