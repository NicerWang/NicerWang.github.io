import{f as _,g as M,h as N,i as U,t as L,u as x,j as I,_ as k,o as d,c as h,k as E,v as O,a as m,n as w,l as P,F as R,m as G,p as v,q as S,s as F}from"./app.76e8dadb.js";const B=[{path:"/Contact.html",title:"Contact",pathLocale:"/",contents:[{header:"Contact",slug:"contact",content:`\u{1F388}Welcome to me\uFF01 Mail
nicer_wang@qq.com`}]},{path:"/",title:"HomePage",pathLocale:"/",contents:[{header:"HomePage",slug:"homepage",content:"Hi there, I'm Nicer Wang!"},{header:"\u{1F3AF}Focus",slug:"\u{1F3AF}focus",content:""},{header:"Projects",slug:"projects",content:`Name
Desc DJudger
Docker-based code execution container nkcsavp
Interactive algorithm visualization platform AlgoMotion
Lightweight Canvas drawing tool for algorithm visualization Scweet-Enhanced
A Scraper for Twitter (Enhanced from Scweet)`},{header:"Scripts",slug:"scripts",content:"Leetcode-cn Cleaner Bilibili Video SpeedController"},{header:"And More...",slug:"and-more",content:""},{header:"\u{1F4DC}Blog",slug:"\u{1F4DC}blog",content:`Deep Learning with AMD GPU on Windows
Install ROCm Tensorflow for Old AMD GPU
Train And Inference Speed of CUDA and Mac with MPS`}]},{path:"/article/deep_learning_with_amd_gpu_on_windows.html",title:"Deep Learning with AMD GPU on Windows",pathLocale:"/",contents:[{header:"Deep Learning with AMD GPU on Windows",slug:"deep-learning-with-amd-gpu-on-windows",content:`First written\uFF1A2022/09/26
Last updated\uFF1A2023/07/15 In the past\uFF0Cusing AMD GPU for DL\uFF0Cwe need Linux with ROCm installed.
Now, Microsoft published DirectML, which makes any GPU supporting DirectX12 be able to be used for DL on Windows.`},{header:"How to config",slug:"how-to-config",content:`Choose PyTorch-DirectML as an example\uFF1A (Optional) Install MiniConda environment\uFF0Cand set environment variables\uFF1A
Path\\To\\Miniconda3
Path\\To\\Miniconda3\\Scripts
Path\\To\\Miniconda3\\Library\\bin Create a Python env\uFF08If without Conda, you also need Python3.8-3.10)
conda create -n directML python=3.8 Activate env and install dependencies
conda activate directML
pip install torch-directml Usage
import torch_directml
dml = torch_directml.device() # device=dml`},{header:"Run an Opensource Project",slug:"run-an-opensource-project",content:`Choose GFPGAN from Tencent as an example, which aims at recover faces, with Real-ESRGAN built in, which can enhance the background. Follow its Guide\uFF1A
Mentioned: If you want to enhance the background, Real-ESRGAN installation is needed
After Guide, download pre-trained model:
wget https://github.com/TencentARC/GFPGAN/releases/download/v1.3.0/GFPGANv1.3.pth -P experiments/pretrained_models You can use other tools to download to specific directory. How to use\uFF1A
Usage: python inference_gfpgan.py -i inputs/whole_imgs -o results -v 1.3 -s 2 [options]... -h show this help -i input Input image or folder. Default: inputs/whole_imgs -o output Output folder. Default: results -v version GFPGAN model version. Option: 1 | 1.2 | 1.3. Default: 1.3 -s upscale The final upsampling scale of the image. Default: 2 -bg_upsampler background upsampler. Default: realesrgan -bg_tile Tile size for background sampler, 0 for no tile during testing. Default: 400 -suffix Suffix of the restored faces -only_center_face Only restore the center face -aligned Input are aligned faces -ext Image extension. Options: auto | jpg | png, auto means using the same extension as inputs. Default: auto Because basicsr and facexlib both depend on torch, you need to uninstalltorch, and force to reinstall pytorch-directml: (Dependency relations will not be satisfied, but ok)
pip uninstall torch
pip install --force-reinstall pytorch-directml About Real-ESRGAN
The unoptimized RealESRGAN is slow on CPU. If you really want to use it on CPU, please modify the corresponding codes: (inference_gfpgan.py Line59)
# ------------------------ set up background upsampler ------------------------
if args.bg_upsampler == 'realesrgan': from basicsr.archs.rrdbnet_arch import RRDBNet from realesrgan import RealESRGANer model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64, num_block=23, num_grow_ch=32, scale=2) bg_upsampler = RealESRGANer( scale=2, model_path='https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.1/RealESRGAN_x2plus.pth', model=model, tile=args.bg_tile, tile_pad=10, pre_pad=0, half=False) # use fp16, need to set False in CPU mode
else: bg_upsampler = None
Everything is OK here. DirectML Support
In inference_gfpgan.py: add device parameter to constructors of RealESRGANer and GFPGANer.
import torch_directml
dml = torch_directml.device() bg_upsampler = RealESRGANer(..., device=dml)
restorer = GFPGANer(..., device=dml)
But there are currently two problems: upsampler triggers an assertion in basicsr\\archs\\arch_util.py after processing several tiles, which is not solved:
Assert that hh % scale == 0 and hw % scale == 0 If realesrgan is disabled, the face can be processed normally, but result is very weird.
In order to avoid discomfort, no results are shown here.
The CPU output are normal, but the DirectML output is abnormal.
After analysis, the problem may be in the bilinear interpolation calculation, I have raised an issue in the DirectML project, click here.`}]},{path:"/article/install_rocm_tensorflow_for_old_AMD_GPU.html",title:"Install ROCm Tensorflow for Old AMD GPU",pathLocale:"/",contents:[{header:"Install ROCm Tensorflow for Old AMD GPU",slug:"install-rocm-tensorflow-for-old-amd-gpu",content:`First written\uFF1A2022/09/30 Old AMD GPU stands for gfx803 GPU Chip: Polaris 20 / Polaris 21 / Polaris 30 / Polaris 31.
Click Here (Recommended) or Here`},{header:"Other Problems",slug:"other-problems",content:`How to install pip for old Python version?\uFF08#.# stands for a specfic version\uFF09
Download corresponding get-pip.py file from https://bootstrap.pypa.io/pip/, or:
curl https://bootstrap.pypa.io/pip/#.#/get-pip.py -o get-pip.py
Then python#.# get-pip.py . If this error occurs:
ModuleNotFoundError: No module named 'distutils.cmd'
Run sudo apt-get install python#.#-distutils , then re-run get-pip.py. How to deal with drivers?
Download and install. If driver needs to be compiled, run sudo apt-get install build-essential first, then compile.`}]},{path:"/article/train_and_inference_speed_of_cuda_and_mps_on_mac.html",title:"Train And Inference Speed of CUDA and Mac with MPS",pathLocale:"/",contents:[{header:"Train And Inference Speed of CUDA and Mac with MPS",slug:"train-and-inference-speed-of-cuda-and-mac-with-mps",content:`First written\uFF1A2023/06/17 As some deep learning frameworks support MPS backend on the ARM Mac, the GPU of the Mac can now be used for deep learning tasks.
There are many specific configuration methods on the network, and they are very simple, so I will not repeat them here.
I mainly compare the speed differences between the MPS backend and the CUDA backend. Train
Inference Nvidia Geforce RTX3060 12GB (Windows, CUDA)
4.66x
1.43x Nvidia Tesla P100 (Kaggle, CUDA)
6.03x
1.45x Apple M1 GPU (7-core, MPS)
1.00x
1.00x Baseline (All test are based on PyTorch)
Train Speed: https://huggingface.co/docs/transformers/quicktour#trainer-a-pytorch-optimized-training-loop
Inference Speed: https://huggingface.co/docs/transformers/quicktour#pipeline`}]},{path:"/zh/Contact.html",title:"\u8054\u7CFB\u4F5C\u8005",pathLocale:"/zh/",contents:[{header:"\u8054\u7CFB\u4F5C\u8005",slug:"\u8054\u7CFB\u4F5C\u8005",content:`\u{1F388}\u6B22\u8FCE\u8054\u7CFB\uFF01 \u90AE\u7BB1
nicer_wang@qq.com`}]},{path:"/zh/",title:"\u4E3B\u9875",pathLocale:"/zh/",contents:[{header:"\u4E3B\u9875",slug:"\u4E3B\u9875",content:"\u4F60\u597D\uFF0C\u8FD9\u91CC\u662FNicerWang\u7684\u7A7A\u95F4\uFF01"},{header:"\u{1F3AF}Focus",slug:"\u{1F3AF}focus",content:""},{header:"\u9879\u76EE",slug:"\u9879\u76EE",content:`\u540D\u79F0
\u63CF\u8FF0 DJudger
\u57FA\u4E8E Docker \u7684\u4EE3\u7801\u6267\u884C\u5BB9\u5668 nkcsavp
\u4EA4\u4E92\u5F0F\u7B97\u6CD5\u53EF\u89C6\u5316\u5E73\u53F0 AlgoMotion
\u7528\u4E8E\u7B97\u6CD5\u53EF\u89C6\u5316\u7684\u8F7B\u91CF\u7EA7 Canvas \u7ED8\u5236\u5DE5\u5177 Scweet-Enhanced
\u7528\u4E8E\u63A8\u7279\u7684\u722C\u866B\u6846\u67B6\uFF08\u7531Scweet\u6539\u8FDB\uFF09`},{header:"\u811A\u672C",slug:"\u811A\u672C",content:"\u529B\u6263\uFF08Leetcode-cn\uFF09\u6E05\u7406\u5927\u5E08 BiliBili\u89C6\u9891\u901F\u5EA6\u63A7\u5236"},{header:"\u66F4\u591A...",slug:"\u66F4\u591A",content:""},{header:"\u{1F4DC}Blog",slug:"\u{1F4DC}blog",content:`\u5728Windows\u4E0A\u4F7F\u7528AMD\u663E\u5361\u8FDB\u884C\u6DF1\u5EA6\u5B66\u4E60
\u4E3A\u65E7AMD\u663E\u5361\u5B89\u88C5ROCm\u7248\u672C\u7684tensorflow
CUDA\u4E0EMPS\u7684\u6DF1\u5EA6\u5B66\u4E60\u8BAD\u7EC3\u4E0E\u63A8\u7406\u901F\u5EA6\u6BD4\u8F83`}]},{path:"/zh/article/deep_learning_with_amd_gpu_on_windows.html",title:"\u5728Windows\u4E0A\u4F7F\u7528AMD\u663E\u5361\u8FDB\u884C\u6DF1\u5EA6\u5B66\u4E60",pathLocale:"/zh/",contents:[{header:"\u5728Windows\u4E0A\u4F7F\u7528AMD\u663E\u5361\u8FDB\u884C\u6DF1\u5EA6\u5B66\u4E60",slug:"\u5728windows\u4E0A\u4F7F\u7528amd\u663E\u5361\u8FDB\u884C\u6DF1\u5EA6\u5B66\u4E60",content:`\u521D\u6B21\u7F16\u5199\u65F6\u95F4\uFF1A2022/09/26
\u4E0A\u6B21\u66F4\u65B0\u65F6\u95F4\uFF1A2023/07/15 \u4EE5\u5F80\uFF0CAMD\u663E\u5361\u8FDB\u884C\u6DF1\u5EA6\u5B66\u4E60\uFF0C\u9700\u8981\u4F7F\u7528Linux\u7CFB\u7EDF\uFF0C\u5E76\u5B89\u88C5ROCm\u3002
\u800C\u73B0\u5728\uFF0C\u5FAE\u8F6F\u5F00\u6E90\u4E86DirectML\u9879\u76EE\uFF0C\u4F7F\u5F97\u4EFB\u4F55\u652F\u6301DirectX12\u7684\u663E\u5361\uFF0C\u90FD\u53EF\u4EE5\u5728Windows\u5E73\u53F0\u4E0A\u8FDB\u884C\u6DF1\u5EA6\u5B66\u4E60\u3002`},{header:"\u5982\u4F55\u914D\u7F6E",slug:"\u5982\u4F55\u914D\u7F6E",content:`\u8FD9\u91CC\u4EE5PyTorch-DirectML\u4E3A\u4F8B\u8FDB\u884C\u914D\u7F6E\uFF1A \uFF08\u53EF\u9009\uFF09\u5B89\u88C5MiniConda\u73AF\u5883\uFF0C\u5E76\u914D\u7F6E\u73AF\u5883\u53D8\u91CF\uFF1A
Path\\To\\Miniconda3
Path\\To\\Miniconda3\\Scripts
Path\\To\\Miniconda3\\Library\\bin \u521B\u5EFA\u4E00\u4E2APython\u73AF\u5883\uFF08\u82E5\u4E0D\u4F7F\u7528Conda\uFF0C\u4E5F\u9700\u4F7F\u75283.8-3.10\u7248\u672C\uFF09
conda create -n directML python=3.8 \u6FC0\u6D3B\u73AF\u5883\u5E76\u5F00\u59CB\u5B89\u88C5\u4F9D\u8D56
conda activate directML
pip install torch-directml \u4F7F\u7528\u65B9\u6CD5
import torch_directml
dml = torch_directml.device() # device=dml`},{header:"\u8FD0\u884C\u4E00\u4E2A\u5F00\u6E90\u9879\u76EE",slug:"\u8FD0\u884C\u4E00\u4E2A\u5F00\u6E90\u9879\u76EE",content:`\u9009\u62E9\u4E86\u817E\u8BAF\u5F00\u6E90\u7684GFPGAN\uFF0C\u8FD9\u662F\u4E00\u4E2A\u6062\u590D\u771F\u5B9E\u4EBA\u8138\u7684\u6DF1\u5EA6\u795E\u7ECF\u7F51\u7EDC\uFF0C\u540C\u65F6\u5185\u7F6E\u4E86Real-ESRGAN\u652F\u6301\uFF0C\u53EF\u4EE5\u6062\u590D\u4EBA\u8138\u4E4B\u5916\u7684\u80CC\u666F\u3002 \u6309\u7167\u5176\u63D0\u793A\u8FDB\u884C\u5B89\u88C5\uFF1A
\u6559\u7A0B\u4E2D\u63D0\u53CA\uFF1A\u5982\u679C\u4E0D\u4EC5\u60F3\u8981\u4FEE\u590D\u4EBA\u8138\uFF0C\u8FD8\u9700\u8981\u589E\u5F3A\u80CC\u666F\uFF0C\u5219\u8FD8\u9700\u8981\u5B89\u88C5Real-ESRGAN\u3002
\u5728\u5B8C\u6210\u6559\u7A0B\u540E\uFF0C\u9700\u8981\u624B\u52A8\u4E0B\u8F7D\u9884\u8BAD\u7EC3\u7684\u6A21\u578B\uFF1A
wget https://github.com/TencentARC/GFPGAN/releases/download/v1.3.0/GFPGANv1.3.pth -P experiments/pretrained_models \u4E5F\u53EF\u4EE5\u4F7F\u7528\u5176\u4ED6\u5DE5\u5177\u4E0B\u8F7D\u540E\u79FB\u52A8\u5230\u5BF9\u5E94\u76EE\u5F55\u3002
\u53E6\u5916\uFF0C\u6B64\u9879\u76EE\u8FD8\u4F9D\u8D56\u4E86\u5F88\u591A\u5176\u4ED6\u7684\u6DF1\u5EA6\u795E\u7ECF\u7F51\u7EDC\uFF0C\u8FD9\u4E9B\u53C2\u6570\u4F1A\u5728\u9996\u6B21\u8FD0\u884C\u65F6\u4E0B\u8F7D\uFF0C\u4F60\u4E5F\u53EF\u4EE5\u89C2\u5BDF\u63A7\u5236\u53F0\u4FE1\u606F\u8FDB\u884C\u624B\u52A8\u4E0B\u8F7D\uFF0C\u5E76\u79FB\u52A8\u5230\u5BF9\u5E94\u76EE\u5F55\u3002 \u9879\u76EE\u7684\u4F7F\u7528\u65B9\u6CD5\u4E3A\uFF1A
Usage: python inference_gfpgan.py -i inputs/whole_imgs -o results -v 1.3 -s 2 [options]... -h show this help -i input Input image or folder. Default: inputs/whole_imgs -o output Output folder. Default: results -v version GFPGAN model version. Option: 1 | 1.2 | 1.3. Default: 1.3 -s upscale The final upsampling scale of the image. Default: 2 -bg_upsampler background upsampler. Default: realesrgan -bg_tile Tile size for background sampler, 0 for no tile during testing. Default: 400 -suffix Suffix of the restored faces -only_center_face Only restore the center face -aligned Input are aligned faces -ext Image extension. Options: auto | jpg | png, auto means using the same extension as inputs. Default: auto \u5173\u4E8EReal-ESRGAN
\u7531\u4E8E\u5176\u5728CPU\u4E0A\u8FD0\u884C\u8F83\u6162\uFF0C\u6240\u4EE5\u5728CPU\u8BBE\u5907\u4E0A\u9ED8\u8BA4\u5173\u95ED\uFF0C\u5728inference_gfpgan.py\u7B2C59\u884C\uFF0C\u5C06\u8FD9\u90E8\u5206\u4EE3\u7801\u4FEE\u6539\u5373\u53EF\u542F\u7528\u8BE5\u529F\u80FD\uFF1A
# ------------------------ set up background upsampler ------------------------
if args.bg_upsampler == 'realesrgan': from basicsr.archs.rrdbnet_arch import RRDBNet from realesrgan import RealESRGANer model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64, num_block=23, num_grow_ch=32, scale=2) bg_upsampler = RealESRGANer( scale=2, model_path='https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.1/RealESRGAN_x2plus.pth', model=model, tile=args.bg_tile, tile_pad=10, pre_pad=0, half=False) # \u89C6\u662F\u5426\u652F\u6301fp16\u800C\u5B9A\uFF0CCPU\u4E0D\u652F\u6301
else: bg_upsampler = None
\u81F3\u6B64\uFF0C\u53EF\u5728CPU\u4E0A\u987A\u5229\u5B8C\u6210\u5B8C\u6574\u7684\u56FE\u7247\u4FEE\u590D\u5DE5\u4F5C\u3002 \u652F\u6301DirectML
\u5728inference_gfpgan.py\u4E2D\uFF1A\u4E3ARealESRGANer\u548CGFPGANer\u7684\u6784\u9020\u51FD\u6570\uFF0C\u6DFB\u52A0device\u53C2\u6570\u3002
import torch_directml
dml = torch_directml.device() bg_upsampler = RealESRGANer(..., device=dml)
restorer = GFPGANer(..., device=dml) **\u4F46\u76EE\u524D\u5B58\u5728\u4E24\u4E2A\u95EE\u9898\uFF1A** * \`upsampler\`\u5728\u6267\u884C\u51E0\u6B21\u540E\uFF0C\u4FBF\u4F1A\u89E6\u53D1\`basicsr\\archs\\arch_util.py\`\u4E2D\u7684\u65AD\u8A00\uFF0C\u76EE\u524D\u6682\u672A\u89E3\u51B3\uFF1A \`\`\`python assert hh % scale == 0 and hw % scale == 0 \u5982\u679C\u7981\u7528realesrgan\uFF0C\u5219\u4EBA\u8138\u53EF\u4EE5\u6B63\u5E38\u5B8C\u6210\u5904\u7406\uFF0C\u4F46\u5904\u7406\u7ED3\u679C\u5341\u5206\u8BE1\u5F02\u3002 \u4E3A\u907F\u514D\u5F15\u8D77\u4E0D\u9002\uFF0C\u8FD9\u91CC\u4E0D\u5C55\u793A\u7ED3\u679C\uFF0C\u95EE\u9898\u5728\u4E8ECPU\u8F93\u51FA\u7ED3\u679C\u6B63\u5E38\uFF0C\u800CDirectML\u8F93\u51FA\u5F02\u5E38\u3002
\u7ECF\u8FC7\u5206\u6790\uFF0C\u95EE\u9898\u53EF\u80FD\u51FA\u5728\u53CC\u7EBF\u6027\u63D2\u503C\u7B97\u5B50\u5F53\u4E2D\uFF0C\u6211\u5DF2\u5728DirectML\u9879\u76EE\u5F53\u4E2D\u63D0\u51FAIssue\uFF0C\u70B9\u51FB\u8FD9\u91CC\u8DF3\u8F6C\u3002`}]},{path:"/zh/article/install_rocm_tensorflow_for_old_AMD_GPU.html",title:"\u4E3A\u65E7AMD\u663E\u5361\u5B89\u88C5ROCm\u7248\u672C\u7684tensorflow",pathLocale:"/zh/",contents:[{header:"\u4E3A\u65E7AMD\u663E\u5361\u5B89\u88C5ROCm\u7248\u672C\u7684tensorflow",slug:"\u4E3A\u65E7amd\u663E\u5361\u5B89\u88C5rocm\u7248\u672C\u7684tensorflow",content:`\u521D\u6B21\u7F16\u5199\u65F6\u95F4\uFF1A2022/09/30 \u65E7AMD\u663E\u5361\u662F\u6307gfx803\u6838\u5FC3\uFF1APolaris 20 / Polaris 21 / Polaris 30 / Polaris 31
\u70B9\u51FB\u8FD9\u91CC\uFF08\u63A8\u8350\uFF09\u6216\u8FD9\u91CC`},{header:"\u5176\u4ED6\u95EE\u9898",slug:"\u5176\u4ED6\u95EE\u9898",content:`\u5B89\u88C5\u65E7\u7248\u672CPython\u540E\uFF0C\u5982\u4F55\u5B89\u88C5pip\uFF1F\uFF08#.#\u8868\u793A\u67D0\u4E2A\u7248\u672C\uFF09
\u5230https://bootstrap.pypa.io/pip/\u4E0B\u8F7D\u5BF9\u5E94\u7248\u672C\u7684get-pip.py\u6587\u4EF6\uFF0C\u6216\u8005\u4F7F\u7528\uFF1A
curl https://bootstrap.pypa.io/pip/#.#/get-pip.py -o get-pip.py
\u800C\u540E\u6267\u884C\uFF1Apython#.# get-pip.py\u3002\u5982\u679C\u51FA\u73B0\u9519\u8BEF\uFF1A
ModuleNotFoundError: No module named 'distutils.cmd'
\u5219\u9700\u8981\u6267\u884Csudo apt-get install python#.#-distutils \uFF0C\u800C\u540E\u91CD\u65B0\u6267\u884Cget-pip.py\u3002 \u9A71\u52A8\u95EE\u9898\u5982\u4F55\u89E3\u51B3\uFF1F
\u4E0B\u8F7D\u5BF9\u5E94\u9A71\u52A8\u8FDB\u884C\u5B89\u88C5\uFF0C\u5982\u679C\u9A71\u52A8\u9700\u8981\u7F16\u8BD1\uFF0C\u5219\u5148\u6267\u884Csudo apt-get install build-essential\uFF0C\u800C\u540E\u518D\u8FDB\u884C\u7F16\u8BD1\u3002 \u955C\u50CF\u6E90\u95EE\u9898 apt
\u4F7F\u7528\u955C\u50CF\u6E90\uFF1Ahttps://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/
\u5982\u679C\u67D0\u4E9B\u8F6F\u4EF6\u6E90\u6CA1\u6709\u5BF9\u5E94\u955C\u50CF\u6E90\uFF0C\u5219\u53EF\u4EE5\u8BBE\u7F6E\u4EE3\u7406\u670D\u52A1\u5668\uFF08apt\u4F3C\u4E4E\u4E0D\u53D7\u73AF\u5883\u53D8\u91CF\u4E2D\u7684\u4EE3\u7406\u5F71\u54CD\uFF09\uFF1A
sudo vim /etc/apt/apt.conf.d/proxy.conf
# \u5728\u5176\u4E2D\u8F93\u5165
Acquire::http::Proxy "http://server_ip:port/";
Acquire::https::Proxy "http://server_ip:port/"; pip
\u5355\u6B21\u4F7F\u7528\uFF1A-i https://pypi.tuna.tsinghua.edu.cn/simple
\u4E00\u52B3\u6C38\u9038\uFF1A
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple`}]},{path:"/zh/article/train_and_inference_speed_of_cuda_and_mps_on_mac.html",title:"CUDA\u4E0EMPS\u7684\u6DF1\u5EA6\u5B66\u4E60\u8BAD\u7EC3\u4E0E\u63A8\u7406\u901F\u5EA6\u6BD4\u8F83",pathLocale:"/zh/",contents:[{header:"CUDA\u4E0EMPS\u7684\u6DF1\u5EA6\u5B66\u4E60\u8BAD\u7EC3\u4E0E\u63A8\u7406\u901F\u5EA6\u6BD4\u8F83",slug:"cuda\u4E0Emps\u7684\u6DF1\u5EA6\u5B66\u4E60\u8BAD\u7EC3\u4E0E\u63A8\u7406\u901F\u5EA6\u6BD4\u8F83",content:`\u521D\u6B21\u7F16\u5199\u65F6\u95F4\uFF1A2023/06/17 \u968F\u7740\u5404\u6DF1\u5EA6\u5B66\u4E60\u6846\u67B6\u5728ARM Mac\u4E0A\u652F\u6301\u4E86MPS\u540E\u7AEF\uFF0C\u76EE\u524D\u53EF\u4EE5\u4F7F\u7528Mac\u7684GPU\u8FDB\u884C\u6DF1\u5EA6\u5B66\u4E60\u4EFB\u52A1\u3002
\u5177\u4F53\u7684\u914D\u7F6E\u65B9\u6CD5\u7F51\u7EDC\u4E0A\u6709\u5F88\u591A\uFF0C\u4E14\u5F88\u7B80\u5355\uFF0C\u8FD9\u91CC\u4E0D\u518D\u8D58\u8FF0\uFF0C\u4E3B\u8981\u6BD4\u8F83MPS\u540E\u7AEF\u4E0ECUDA\u540E\u7AEF\u7684\u901F\u5EA6\u5DEE\u5F02\u3002 \u8BAD\u7EC3\u901F\u5EA6
\u63A8\u7406\u901F\u5EA6 Nvidia Geforce RTX3060 12GB (Windows, CUDA)
4.66x
1.43x Nvidia Tesla P100 (Kaggle, CUDA)
6.03x
1.45x Apple M1 GPU (\u4E10\u72487\u6838, MPS)
1.00x
1.00x \u6D4B\u8BD5\u57FA\u51C6 \uFF08\u6240\u6709\u6D4B\u8BD5\u57FA\u4E8EPyTorch\uFF09
\u8BAD\u7EC3\u901F\u5EA6\uFF1Ahttps://huggingface.co/docs/transformers/quicktour#trainer-a-pytorch-optimized-training-loop
\u63A8\u7406\u901F\u5EA6\uFF1Ahttps://huggingface.co/docs/transformers/quicktour#pipeline`}]},{path:"/404.html",title:"",pathLocale:"/",contents:[]}],z="update-vuepress-plugin-full-text-search2-search-index";var A=_(B),W=M(()=>{const e=new Map;for(const t of A.value)e.set(t.path,t);return e});import.meta.webpackHot&&(__VUE_HMR_RUNTIME__[z]=e=>{A.value=e});function $(e){const t=_([]);let i=null;return N(e,()=>{i&&clearTimeout(i),i=setTimeout(a,100)}),t;function a(){const p=e.value.toLowerCase().trim();if(!p){t.value=[];return}const s=new Map,c=new Set;for(const o of A.value)for(const r of H(o,p)){c.add(r.parentPageTitle);let l=s.get(r.parentPageTitle);l||(l=[],s.set(r.parentPageTitle,l)),l.push(r)}const n=[...c].sort((o,r)=>{const l=s.get(o);return s.get(r).length-l.length});t.value=[...s].flatMap(([,o])=>o).sort((o,r)=>o.parentPagePriority-r.parentPagePriority||n.indexOf(o.parentPageTitle)-n.indexOf(r.parentPageTitle)||o.priority-r.priority)}}function*H(e,t){const i=b(e.title,t);if(i){yield{path:e.path,parentPageTitle:y(e),title:e.title,display:i,page:e,content:null,parentPagePriority:1,priority:1};return}for(const a of e.contents){const p=b(a.header,t);if(p){yield{path:e.path+(a.slug?`#${a.slug}`:""),parentPageTitle:y(e),title:e.title,display:p,page:e,content:null,parentPagePriority:10,priority:2};continue}const s=b(a.content,t);s&&(yield{path:e.path+(a.slug?`#${a.slug}`:""),parentPageTitle:y(e),title:e.title,display:[{type:"header",str:`${a.header}
`},...s],page:e,content:null,parentPagePriority:10,priority:10})}}function y(e){const t=e.path.split("/");let i="/";return t[1]&&(i=`/${t[1]}/`),(W.value.get(i)||e).title}function b(e,t){const i=[];let a=0;const p=e.toLowerCase().replace(/\s/gu," ");let s=0,c=p.indexOf(t,s);if(c<0)return null;for(;c>=0;){const o=c+t.length;if(n(e.slice(s,c),"normal"),n(e.slice(c,o),"highlight"),s=o,c=p.indexOf(t,s),a>100)break}return n(e.slice(s),"normal"),i.filter(o=>o.str);function n(o,r){let l=o;r==="normal"&&l.length>100&&a===0&&(l=`\u2026 ${l.slice(-10)}`);let g=!1;if(a+l.length>100){if(i.some(f=>f.type==="ellipsis"))return;l=l.slice(0,Math.max(100-a,1)),g=!0}i.push({type:r,str:l}),a+=l.length,g&&(i.push({type:"ellipsis",str:" \u2026"}),a+=2)}}const q={"/":{placeholder:"Full-Text Search"},"/zh/":{placeholder:"\u5168\u6587\u641C\u7D22"}},j=U({name:"SearchBox",props:{locales:{type:Object,required:!1,default:()=>q}},setup(e){const{locales:t}=L(e),i=_(""),a=_(!1),p=_(-1),s=$(i),c=M(()=>i.value&&a.value&&s.value.length),n=x(),o=I(),r=M(()=>{var u;return(u=t.value[o.value])!=null?u:{}});function l(){if(!c.value)return;let u=p.value-1;u<0&&(u=s.value.length-1),f(u)}function g(){if(!c.value)return;let u=p.value+1;u>=s.value.length&&(u=0),f(u)}function f(u){p.value=u}function T(){p.value=-1}function C(u){if(!c.value)return;const D=s.value[u];D&&n.push(D.path)}return{query:i,focused:a,focusIndex:p,suggestions:s,activeSuggestion:c,onUp:l,onDown:g,focus:f,unfocus:T,go:C,locale:r}}});const K={class:"search-box",role:"search"},V=["placeholder"],X=["onMousedown","onMouseenter"],J=["href"],Y={key:0,class:"parent-page-title"},Q={class:"suggestion-row"},Z={class:"page-title"},ee={class:"suggestion-content"};function te(e,t,i,a,p,s){var c;return d(),h("div",K,[E(m("input",{ref:"input","onUpdate:modelValue":t[0]||(t[0]=n=>e.query=n),"aria-label":"Search",class:w({focused:e.focused}),placeholder:(c=e.locale.placeholder)!=null?c:"Search",autocomplete:"off",spellcheck:"false",onFocus:t[1]||(t[1]=()=>e.focused=!0),onBlur:t[2]||(t[2]=()=>e.focused=!1),onKeyup:[t[3]||(t[3]=P(n=>e.go(e.focusIndex),["enter"])),t[4]||(t[4]=P((...n)=>e.onUp&&e.onUp(...n),["up"])),t[5]||(t[5]=P((...n)=>e.onDown&&e.onDown(...n),["down"]))]},null,42,V),[[O,e.query]]),e.activeSuggestion?(d(),h("ul",{key:0,class:"suggestions",onMouseleave:t[7]||(t[7]=(...n)=>e.unfocus&&e.unfocus(...n))},[(d(!0),h(R,null,G(e.suggestions,(n,o)=>(d(),h("li",{key:o,class:w(["suggestion",{focused:o===e.focusIndex}]),onMousedown:r=>e.go(o),onMouseenter:r=>e.focus(o)},[m("a",{href:n.path,onClick:t[6]||(t[6]=F(()=>{},["prevent"]))},[n.parentPageTitle&&(!e.suggestions[o-1]||e.suggestions[o-1].parentPageTitle!==n.parentPageTitle)?(d(),h("div",Y,v(n.parentPageTitle),1)):S("v-if",!0),m("div",Q,[m("div",Z,v(n.title||n.path),1),m("div",ee,[(d(!0),h(R,null,G(n.display,(r,l)=>(d(),h("span",{key:l,class:w(r.type)},v(r.str),3))),128))])])],8,J)],42,X))),128))],32)):S("v-if",!0)])}const oe=k(j,[["render",te],["__scopeId","data-v-fd6cd4d5"],["__file","SearchBox.vue"]]);export{oe as default};
