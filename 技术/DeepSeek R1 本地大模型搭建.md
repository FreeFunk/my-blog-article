---
title: DeepSeek R1 本地大模型搭建
date: 2025-03-23 12:43:59
updated: 2025-07-01 15:20:59
categories: 技术
tags:
  - DeepSeek
  - 大模型
  - R1
  - CloudStudio
  - LINUX
  - 内网穿透
keywords:
  - DeepSeek
  - DS
  - 大模型
  - R1
  - CloudStudio
  - LINUX
  - 内网穿透
description: 利用DeepSeek官方提供的开源模型通过Ollama框架和腾讯云提供免费算力搭建一个本地大模型
top_img: 
cover: https://pic1.imgdb.cn/item/68638cd058cb8da5c882cb36.jpg
copyright_author: FreeFunk
copyright_author_href: https://blog.freefunk.pp.ua
main_color: "#e1efe1"
highlight_shrink: false
abbrlink: a6cb44c9
mathjax: true
thumbnail: false
---
# Cloud Studio 免费算力搭建

[Cloud Studio](https://ide.cloud.tencent.com/dashboard/gpu-workspace)
![](DeepSeek%20R1%20本地大模型搭建/file-20250325095722737.png)

点击`新建`
![](DeepSeek%20R1%20本地大模型搭建/file-20250325095832894.png)

选择你要用的机器，上面是腾讯云自己搭建好的`DeepSeek`服务了，下面那个需要自己搭建，之后点`下一步`平台会自己创建机器。
![](DeepSeek%20R1%20本地大模型搭建/file-20250325095930827.png)

点击数据行进入新界面
![](DeepSeek%20R1%20本地大模型搭建/file-20250325101334307.png)

看到一个类似VsCode编辑器
![](DeepSeek%20R1%20本地大模型搭建/file-20250325101401104.png)

## 算力资源

```markdown
显存：16G
算力：8 + TFlops SP
CPU：8核
内存：32G
服务器信息：Linux VM-15-170-ubuntu 5.4.0-166-generic #183-Ubuntu SMP Mon Oct 2 11:28:33 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux
```

# 搭建步骤

## 安装Ollama

[Ollama Git](https://github.com/ollama/ollama)，执行拉取命令，在根目录下执行
```shell
curl -fsSL https://ollama.com/install.sh | sh
```

{% note info no-icon %}
输出结果：
	Cleaning up old version at /usr/local/lib/ollama Installing ollama to /usr/local Downloading Linux amd64 bundle ######################################################################## 100.0%. Adding ollama user to video group... Adding current user to ollama group... Creating ollama systemd service... WARNING: systemd is not running WARNING: Unable to detect NVIDIA/AMD GPU. Install lspci or lshw to automatically detect and install GPU dependencies. The Ollama API is now available at 127.0.0.1:11434. Install complete. Run "ollama" from the command line.
{% endnote %}

## 验证Ollama

```shell
ollama --version
# 输出
# ollama version is 0.5.4 
# Warning: client version is 0.5.7
```

# DeepSeek-R1部署

{% note info no-icon %}
DeepSeek-R1是深度求索（DeepSeek）推出的一款高性能大模型，它在多项自然语言处理任务中表现出色，尤其是在文本生成、对话系统和知识问答等领域。DeepSeek-R1的参数量从8B到70B不等，用户可以根据自己的硬件配置选择合适的模型进行部署。
{% endnote %}

拉取`DeepSeek`模型
```shell
ollama run deepseek-r1:8b
```

{% note info no-icon %}
输出结果：
pulling manifest pulling 6340dc3229b0... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████▏ 4.9 GB pulling 369ca498f347... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████▏ 387 B pulling 6e4c38e1172f... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████▏ 1.1 KB pulling f4d24e9138dd... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████▏ 148 B pulling 0cb05c6e4e02... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████▏ 487 B verifying sha256 digest writing manifest success
{% endnote %}

**可直接进行问答**
![](DeepSeek%20R1%20本地大模型搭建/file-20250325102559206.png)

{% note danger no-icon %}
检查ollama端口：ps -ef | grep ollama
![](DeepSeek%20R1%20本地大模型搭建/file-20250325102802513.png)
{% endnote %}

# 内网穿透

{% note info no-icon %}
由于`Cloud Studio`提供的算力机器不支持公网ip服务，所以需要用到一个有公网ip的机器作为服务端，把`Cloud Studio`机器作为客户端把端口映射到有公网ip的服务器上，这样子就可以实现对大模型的接口调用了。
相关文档：
[FRP内网穿透服务快速搭建教学](https://blog.kejilion.pro/frp/)
[LinuxDo](https://linux.do/t/topic/375540)
[穿透服务底层基础](https://github.com/fatedier/frp)
{% endnote %}

```MarkDown
内网穿透是一种技术，用于让外部网络（如互联网）访问位于内网（如局域网）中的设备或服务。常见场景包括：• 远程访问：从外网访问家庭或公司内网中的设备（如摄像头、NAS）。• 服务暴露：将本地开发的服务暴露到公网，方便测试或分享。
常见方法
	端口映射：在路由器上配置，将外部请求转发到内网设备的指定端口。
	VPN：通过虚拟专用网络将外部设备接入内网，使其像在内网中一样访问资源。
	反向代理：使用代理服务器接收外部请求并转发到内网设备。
	P2P：通过点对点技术直接建立连接，绕过NAT限制。
```

{% note danger no-icon %}
内网穿透的简要理解就是 前提必须要有一台携带公网ip的机器，以这台公网机器安装特定的中转服务，绑定无法暴露公网的服务ip，例如：本地化应用、本地化模型、本地化存储等等，通过中转服务的映射内容 本地服务只需要暴露端口号，穿透服务即可直接访问本地服务，通过一对一的映射端口、后续也可以配置域名 进行反向代理。
{% endnote %}

## 申请服务器

服务器的步骤可以去看我的文章[DeepSeek接入微信公众号](https://blog.freefunk.pp.ua/7df2856b.html)，服务器标题章节。
申请好了之后执行线上脚本，_**注意：初次执行携带完整地址**_
```shell
bash <(curl -sL https://raw.githubusercontent.com/kejilion/sh/main/kejilion.sh)

# 或者
bash <(curl -sL kejilion.sh)
```

## 服务端安装FRP

进入脚本选择一个
执行路径：应用市场(序号11)->FRP内网穿透(服务端)(序号55)->安装
```text
下面的信息都是脚本提供的信息，具体以实际输出为准
结果输出：
客户端部署时需要用的参数
服务IP: 103.185.248.45
token: 86d9a16706021752ed8bbe81a4445984

FRP面板信息
FRP面板地址: http://103.233.253.144:8056
FRP面板用户名: user_752bbf3e
FRP面板密码: b862e4760979dbc2
```

## 客户端安装FRP

客户端的安装就以`Cloud Studio算力服务器`为准，需要先提前为机器安装这些软件
```shell
# 算力机器没有sudo下载器
apt-get update
apt-get install sudo
# 算力机器没有ifconfig net服务
sudo apt-get install net-tools
# lsof服务
sudo apt-get install lsof
# ping服务
sudo apt install iputils-ping
```

进入脚本选择一个
执行路径：应用市场(序号11)->FRP内网穿透(客户端)(序号56)->安装
`根据前面的输出，在客户端输入指定内容，对接的外网就是涉及到的中转服务器的ip ，token既是安装服务端的token信息`
![](DeepSeek%20R1%20本地大模型搭建/file-20250701150506821.png)
{% note info no-icon %}
1. 选择序号4添加对外服务
![](DeepSeek%20R1%20本地大模型搭建/file-20250701144520392.png)
2. 添加如下信息，定义名称、内网端口一定要指定的是ollama的端口，可以通过`ps -ef | grep ollama`获取端口信息，端口可能都不一样。
- 选择添加对外服务
- 服务名称（随意填写）
- 转发类型 默认tcp
- 内网ip使用本地ip 127.0.0.1
- 选择本地服务的服务端口，例如：安装的deepseek R1模型的端口是6889，这里填写6889
- 对外暴露的服务端 端口可以使用和客户端服务器同样的端口
![](DeepSeek%20R1%20本地大模型搭建/file-20250701145249961.png)
3. 效果如下
![](DeepSeek%20R1%20本地大模型搭建/file-20250701145622344.png)
使用外网地址，例如：`http://103.233.253.144:6889/api/tags`
{% endnote %}
# 相关文档

### deepseek官方模型简介

[DeepSeek R1](https://ollama.com/library/deepseek-r1](https://ollama.com/library/deepseek-r1)
### 部署文档

这个是另外一个人的部署[本地部署指南](http://www.hubwiz.com/blog/deepseek-r1-local-run-guide/)

# 总结

{% note info no-icon %}
文章把整个deepseek模型下载到内网穿透到公网上，进行使用的流程都描述差不多了，其他的模型下载运行也是这个流程，后面会单独出一个文章是专门对接模型api的客户端名字叫`Open-webUI`，真正意义上的实现使用模型进行交互交流。
{% endnote %}