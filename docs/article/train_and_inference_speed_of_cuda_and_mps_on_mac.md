---
title: Train And Inference Speed of CUDA and Mac with MPS
---

# Train And Inference Speed of CUDA and Mac with MPS

> First written：2023/06/17

As some deep learning frameworks support **MPS backend** on the ARM Mac, the GPU of the Mac can now be used for deep learning tasks.

There are many specific configuration methods on the network, and they are very simple, so I will not repeat them here.

I mainly compare the speed differences between the **MPS** backend and the **CUDA** backend.

|                                             | Train     | Inference |
| ------------------------------------------- | --------- | --------- |
| Nvidia Geforce RTX3060 12GB (Windows, CUDA) | 4.66x     | 1.43x     |
| **Nvidia Tesla P100 (Kaggle, CUDA)**        | **6.03x** | **1.45x** |
| Apple M1 GPU (7-core, MPS)                  | 1.00x     | 1.00x     |

> **Baseline** (All test are based on PyTorch)
>
> Train Speed: [https://huggingface.co/docs/transformers/quicktour#trainer-a-pytorch-optimized-training-loop](https://huggingface.co/docs/transformers/quicktour#trainer-a-pytorch-optimized-training-loop)
>
> Inference Speed: [https://huggingface.co/docs/transformers/quicktour#pipeline](https://huggingface.co/docs/transformers/quicktour#pipeline)
