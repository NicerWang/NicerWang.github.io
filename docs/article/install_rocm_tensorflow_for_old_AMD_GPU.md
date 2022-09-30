---
title: Install ROCm Tensorflow for Old AMD GPU
---

# Install ROCm Tensorflow for Old AMD GPU

> First written：2022/09/30

`Old AMD GPU` stands for **gfx803** GPU Chip: Polaris 20 / Polaris 21 / Polaris 30 / Polaris 31.

[Click Here](https://github.com/NicerWang/RX580-rocM-tensorflow-ubuntu20.4-guide) (Recommended) or [Here](https://github.com/Grench6/RX580-rocM-tensorflow-ubuntu20.4-guide)

## Other Problems

1. How to install pip for old Python version?（#.# stands for a specfic version）

   Download corresponding `get-pip.py` file from https://bootstrap.pypa.io/pip/, or:

   ```
   curl https://bootstrap.pypa.io/pip/#.#/get-pip.py -o get-pip.py
   ```

   Then `python#.# get-pip.py` . If this error occurs:

   ```
   ModuleNotFoundError: No module named 'distutils.cmd'
   ```

   Run `sudo apt-get install python#.#-distutils `, then re-run `get-pip.py`.

2. How to deal with drivers?

   Download and install. If driver needs to be compiled, run `sudo apt-get install build-essential` first, then compile.
