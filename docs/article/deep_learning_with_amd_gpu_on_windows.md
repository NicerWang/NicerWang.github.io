---
title: Deep Learning with AMD GPU on Windows
---
# Deep Learning with AMD GPU on Windows

> First written：2022/09/26

In the past，using AMD GPU for DL，we need Linux with ROCm installed.

Now, Microsoft published [DirectML](https://github.com/microsoft/DirectML), which makes any GPU supporting DirectX12 be able to be used for DL on Windows.

## How to config

Choose `PyTorch-DirectML` as an example：

1. (Optional) Install `MiniConda`（`Python3.8`）environment，and set environment variables：

   ```
   Path\To\Miniconda3
   Path\To\Miniconda3\Scripts
   Path\To\Miniconda3\Library\bin
   ```

2. Create a `Python3.8` env（If without `Conda`, you also need `Python3.8`)

   ```bash
   conda create -n directML python=3.8
   ```

3.  Activate env and install dependencies

   ```bash
   pip install torchvision==0.9.0
   pip uninstall torch
   pip install pytorch-directml
   ```

   > Attention: Becasue some third-party libs chose `torch` as dependency，`torch` will override `pytorch-directml`，so re-running the last 2 lines is needed.

4. Ok, **just need to set device to `dml`**

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
           half=False)  # need to set False in CPU mode
   else:
       bg_upsampler = None
   ```

   **Everything is OK here.**

5. DirectML Support

   In `utils.py`:

   ```python
   # Before
   self.device = torch.device('cuda' if True else 'cpu') if device is None else device
   # After
   self.device = torch.device('dml')
   ```

   After change, we still have `RuntimeError: bad optional access`, after inspection, I find file `lib\site-packages\facexlib\detection\retinaface.py` from `facexlib`, has a line of code：

   ```python
   device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
   ```

   This suggests that `facexlib` used wrong device, we need to use administartion privilege to change it to:

   ```python
   device = torch.device('dml')
   ```

   Now, GPU usage grows, but an error suddenly comes:

   ```
   Failed inference for GFPGAN: Could not run 'aten::normal_' with arguments from the 'DML' backend.
   ```

   This means `PyTorch-DirectML` does not support `aten::normal_` operator currently, blame it on Microsoft, see [RoadMap](https://github.com/microsoft/DirectML/wiki/PyTorch-DirectML-Operator-Roadmap).

   **It is worth mentioning that, the operator will be supported in the next version. You can use `tensorflow-directML` instead, or only perform easy tasks.**  



