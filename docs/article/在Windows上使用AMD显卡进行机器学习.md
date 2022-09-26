---
title: 在Windows上使用AMD显卡进行深度学习
sidebar: auto
---
# 在Windows上使用AMD显卡进行深度学习

> 初次编写时间：2022/09/26

以往，AMD显卡进行深度学习，需要使用Linux系统，并安装ROCm。

而现在，微软开源了[DirectML](https://github.com/microsoft/DirectML)项目，使得任何支持DirectX12的显卡，都可以在Windows平台上进行深度学习。

## 如何配置

这里以`PyTorch-DirectML`为例进行配置：

1. （可选）安装`MiniConda`（`Python3.8`版本）环境，并配置环境变量：

   ```
   Path\To\Miniconda3
   Path\To\Miniconda3\Scripts
   Path\To\Miniconda3\Library\bin
   ```

2. 创建一个`Python3.8`环境（若不使用`Conda`，也需使用`Python3.8`环境）

   ```bash
   conda create -n directML python=3.8
   ```

3.  激活环境并开始安装依赖

   ```bash
   pip install torchvision==0.9.0
   pip uninstall torch
   pip install pytorch-directml
   ```

   > 这里需要注意，由于很多第三方库都是以`torch`为依赖，在安装后，`torch`将会覆盖`pytorch-directml`，需要重新执行后两行。

4. 至此，配置完成，**只需要在训练时选择设备为`dml`即可。**

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

3. 由于教程中安装的`basicsr`和`facexlib`都依赖`torch`，所以需要再次卸载`torch`，并强制安装`pytorch-directml`：(**卸载后将不满足依赖关系，但可以正常使用**)

   ```bash
   pip uninstall torch
   pip install --force-reinstall pytorch-directml
   ```

4. 关于Real-ESRGAN

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
           half=False)  # need to set False in CPU mode
   else:
       bg_upsampler = None
   ```

   **至此，可在CPU上顺利完成完整的图片修复工作。**

5. 支持DirectML

   在`utils.py`中：

   ```python
   # 将以下代码
   self.device = torch.device('cuda' if True else 'cpu') if device is None else device
   # 改为
   self.device = torch.device('dml')
   ```

   进行以上操作后，仍然报错`RuntimeError: bad optional access`，排查问题发现，在`facexlib`的文件`lib\site-packages\facexlib\detection\retinaface.py`中，出现了这一行代码：

   ```python
   device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
   ```

   说明`facexlib`没有使用我们的设备设置，使用管理员权限，强制修改该文件的这一行为：

   ```python
   device = torch.device('dml')
   ```

   此时，运行项目注意到GPU占用率开始提高，但随即报错：

   ```
   Failed inference for GFPGAN: Could not run 'aten::normal_' with arguments from the 'DML' backend.
   ```

   这说明`PyTorch-DirectML`尚不支持项目中使用的`aten::normal_`算子，这不是我们的问题，而是微软还没有完成这一部分的工作，详见[RoadMap](https://github.com/microsoft/DirectML/wiki/PyTorch-DirectML-Operator-Roadmap)。

   **值得一提的是，该算子将会在下个版本中被支持，不支持该算子并不意味着不能使用其进行一般的深度学习任务，或者，可以使用`tensorflow-directML`。**



