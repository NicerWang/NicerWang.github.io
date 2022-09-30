---
title: 为旧AMD显卡安装ROCm版本的tensorflow
---

# 为旧AMD显卡安装ROCm版本的tensorflow

> 初次编写时间：2022/09/30

旧AMD显卡是指**gfx803**核心：Polaris 20 / Polaris 21 / Polaris 30 / Polaris 31

[点击这里](https://github.com/NicerWang/RX580-rocM-tensorflow-ubuntu20.4-guide)（推荐）或[这里](https://github.com/Grench6/RX580-rocM-tensorflow-ubuntu20.4-guide)

## 其他问题

1. 安装旧版本Python后，如何安装pip？（#.#表示某个版本）

   到https://bootstrap.pypa.io/pip/下载对应版本的`get-pip.py`文件，或者使用：

   ```
   curl https://bootstrap.pypa.io/pip/#.#/get-pip.py -o get-pip.py
   ```

   而后执行：`python#.# get-pip.py`。如果出现错误：

   ```
   ModuleNotFoundError: No module named 'distutils.cmd'
   ```

   则需要执行`sudo apt-get install python#.#-distutils `，而后重新执行`get-pip.py`。

2. 驱动问题如何解决？

   下载对应驱动进行安装，如果驱动需要编译，则先执行`sudo apt-get install build-essential`，而后再进行编译。

3. 镜像源问题

   * `apt`

     使用镜像源：https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/

     如果某些软件源没有对应镜像源，则可以设置代理服务器（`apt`似乎不受环境变量中的代理影响）：

     ```
     sudo vim /etc/apt/apt.conf.d/proxy.conf
     # 在其中输入
     Acquire::http::Proxy "http://server_ip:port/";
     Acquire::https::Proxy "http://server_ip:port/";
     ```

   * `pip`

     单次使用：`-i https://pypi.tuna.tsinghua.edu.cn/simple`

     一劳永逸：

     ```
     pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
     ```
