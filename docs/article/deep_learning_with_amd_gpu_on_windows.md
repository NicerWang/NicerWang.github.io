---
title: Deep Learning with AMD GPU on Windows
---
# Deep Learning with AMD GPU on Windows

> First written：2022/09/26
>
> Last updated：2023/07/15

In the past，using AMD GPU for DL，we need Linux with ROCm installed.

Now, Microsoft published [DirectML](https://github.com/microsoft/DirectML), which makes any GPU supporting DirectX12 be able to be used for DL on Windows.

## How to config

Choose `PyTorch-DirectML` as an example：

1. (Optional) Install `MiniConda` environment，and set environment variables：

   ```
   Path\To\Miniconda3
   Path\To\Miniconda3\Scripts
   Path\To\Miniconda3\Library\bin
   ```

2. Create a `Python` env（If without `Conda`, you also need `Python3.8-3.10`)

   ```bash
   conda create -n directML python=3.8
   ```

3. Activate env and install dependencies

   ```bash
   conda activate directML
   pip install torch-directml
   ```

4. Usage

   ```python
   import torch_directml
   dml = torch_directml.device() # device=dml
   ```

## Run an Opensource Project

Choose [GFPGAN](https://github.com/TencentARC/GFPGAN) from Tencent as an example, which aims at recover faces, with [Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN) built in, which can enhance the background.

1. Follow its [Guide](https://github.com/TencentARC/GFPGAN#wrench-dependencies-and-installation)：

   **Mentioned: If you want to enhance the background, Real-ESRGAN installation is needed**

   After Guide, download pre-trained model:

   ```bash
   wget https://github.com/TencentARC/GFPGAN/releases/download/v1.3.0/GFPGANv1.3.pth -P experiments/pretrained_models
   ```

   > You can use other tools to download to specific directory.

2. How to use：

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

3. Because `basicsr` and `facexlib` both depend on `torch`, you need to uninstall`torch`, and force to reinstall `pytorch-directml`: (**Dependency relations will not be satisfied, but ok**)

   ```bash
   pip uninstall torch
   pip install --force-reinstall pytorch-directml
   ```

4. About Real-ESRGAN

   The unoptimized RealESRGAN is slow on CPU. If you really want to use it on CPU, please modify the corresponding codes: (`inference_gfpgan.py` Line59)

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
           half=False)  # use fp16, need to set False in CPU mode
   else:
       bg_upsampler = None
   ```

   **Everything is OK here.**

5. DirectML Support

   In `inference_gfpgan.py`: add `device` parameter to constructors of `RealESRGANer` and `GFPGANer`.

   ```python
   import torch_directml
   dml = torch_directml.device()
   
   bg_upsampler = RealESRGANer(..., device=dml)
   restorer = GFPGANer(..., device=dml)
   ```
   
   **But there are currently two problems:**
   
   * `upsampler` triggers an assertion in `basicsr\archs\arch_util.py` after processing several tiles, which is not solved:
   
     ```` python
     Assert that hh % scale == 0 and hw % scale == 0
     ````
   
   * If `realesrgan` is disabled, the face can be processed normally, but result is very weird.
   
     In order to avoid discomfort, no results are shown here. 
   
     The CPU output are normal, but the DirectML output is abnormal.
     
     After analysis, the problem may be in the bilinear interpolation calculation, I have raised an issue in the DirectML project, [click here](https://github.com/microsoft/DirectML/issues/482).



