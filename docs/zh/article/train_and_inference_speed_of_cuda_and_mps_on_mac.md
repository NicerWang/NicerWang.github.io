---
title: CUDA与MPS的深度学习训练与推理速度比较
---

# CUDA与MPS的深度学习训练与推理速度比较

> 初次编写时间：2023/06/17

随着各深度学习框架在ARM Mac上支持了MPS后端，目前可以使用Mac的GPU进行深度学习任务。

具体的配置方法网络上有很多，且很简单，这里不再赘述，主要比较MPS后端与CUDA后端的速度差异。

|                                             | 训练速度  | 推理速度  |
| ------------------------------------------- | --------- | --------- |
| Nvidia Geforce RTX3060 12GB (Windows, CUDA) | 4.66x     | 1.43x     |
| **Nvidia Tesla P100 (Kaggle, CUDA)**        | **6.03x** | **1.45x** |
| Apple M1 GPU (丐版7核, MPS)                 | 1.00x     | 1.00x     |

> **测试基准** （所有测试基于PyTorch）
>
> 训练速度：[https://huggingface.co/docs/transformers/quicktour#trainer-a-pytorch-optimized-training-loop](https://huggingface.co/docs/transformers/quicktour#trainer-a-pytorch-optimized-training-loop)
>
> 推理速度：[https://huggingface.co/docs/transformers/quicktour#pipeline](https://huggingface.co/docs/transformers/quicktour#pipeline)
