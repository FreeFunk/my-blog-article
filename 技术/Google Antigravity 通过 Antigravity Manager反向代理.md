---
title: Antigravity 通过 Antigravity Tools反向代理
date: 2026-01-27 09:44:36
updated: 2026-02-12 09:50:36
categories: 技术
tags:
  - Antigravity
  - Tools
  - 反向代理
  - 大模型API
keywords:
  - Antigravity
  - Tools
  - Manager
  - 反向代理
  - API
  - 大模型
  - Google
description: 通过Manager服务管理Google账号，代理出Antigravity的内置大模型转成标准的API内容
top_img:
cover: https://pic1.imgdb.cn/item/69781c3fa583b567209bd6d7.jpg
copyright_author: FreeFunk
copyright_author_href: https://blog.freefunk.pp.ua
main_color: "#e1efe1"
highlight_shrink: false
abbrlink: de34e669
mathjax: true
thumbnail: false
---
# 前言

{% note info no-icon %}
本文章主要是解决跳出[Antigravity](https://antigravity.google/)限制在当前服务中使用优质的大模型内容(`Gemini`/`Claude`)，通过本文章说到的工具[Antigravity Manager](https://github.com/lbjlaq/Antigravity-Manager)可以很好的维护管理账号与协议反代系统，支持通过OAuth 2.0方式登录授权，不需要手动黏贴Cookie等，并且可以标准化出API接入到任何第三方调用。
{% endnote %}
# 安装Antigravity Manager

建议终端安装操作系统是`mac`或`linux`
## masOS
如果您已安装 [Homebrew](https://brew.sh/)，可以通过以下命令快速安装：
```shell
# 1. 订阅本仓库的 Tap
brew tap lbjlaq/antigravity-manager https://github.com/lbjlaq/Antigravity-Manager

# 2. 安装应用
brew install --cask antigravity-tools
```
{% note default simple %}**提示**: 如果遇到权限问题，建议添加 `--no-quarantine` 参数。{% endnote %}
## Arch Linux
您可以选择通过一键安装脚本或 Homebrew 进行安装：
### **一键安装脚本 (推荐)**
```shell
curl -sSL https://raw.githubusercontent.com/lbjlaq/Antigravity-Manager/main/deploy/arch/install.sh | bash
```
### **通过 Homebrew** (如果您已安装 [Linuxbrew](https://sh.brew.sh/))
```shell
brew tap lbjlaq/antigravity-manager https://github.com/lbjlaq/Antigravity-Manager
brew install --cask antigravity-tools
```

## 也支持`Docker`部署但是建议在`NAS`/`服务器`
服务器资源如下：
**访问地址**: `http://localhost:8045` (管理后台) | `http://localhost:8045/v1` (API Base) **系统要求**:
- **内存**: 建议 **1GB** (最小 256MB)。
- **持久化**: 需挂载 `/root/.antigravity_tools` 以保存数据。
- **架构**: 支持 x86_64 和 ARM64。 **详情见**: [Docker 部署指南 (docker)](https://github.com/lbjlaq/Antigravity-Manager/blob/main/docker/README.md)
```shell
# 方式 1: 直接运行 (推荐)
# - API_KEY: 必填。用于所有协议的 AI 请求鉴定。
# - WEB_PASSWORD: 可选。用于管理后台登录。若不设置则默认使用 API_KEY。
docker run -d --name antigravity-manager \
  -p 8045:8045 \
  -e API_KEY=sk-your-api-key \
  -e WEB_PASSWORD=your-login-password \
  -e ABV_MAX_BODY_SIZE=104857600 \
  -v ~/.antigravity_tools:/root/.antigravity_tools \
  lbjlaq/antigravity-manager:latest

# 忘记密钥？执行 docker logs antigravity-manager 或 grep -E '"api_key"|"admin_password"' ~/.antigravity_tools/gui_config.json

#### 🔐 鉴权逻辑说明
*   **场景 A：仅设置了 `API_KEY`**
    - **Web 登录**：使用 `API_KEY` 进入后台。
    - **API 调用**：使用 `API_KEY` 进行 AI 请求鉴权。
*   **场景 B：同时设置了 `API_KEY` 和 `WEB_PASSWORD` (推荐)**
    - **Web 登录**：**必须**使用 `WEB_PASSWORD`，使用 API Key 将被拒绝（更安全）。
    - **API 调用**：统一使用 `API_KEY`。这样您可以将 API Key 分发给成员，而保留密码仅供管理员使用。

#### 🆙 旧版本升级指引
如果您是从 v4.0.1 及更早版本升级，系统默认未设置 `WEB_PASSWORD`。您可以通过以下任一方式设置：
1.  **Web UI 界面 (推荐)**：使用原有 `API_KEY` 登录后，在 **API 反代设置** 页面手动设置并保存。新密码将持久化存储在 `gui_config.json` 中。
2.  **环境变量 (Docker)**：在启动容器时增加 `-e WEB_PASSWORD=您的新密码`。**注意：环境变量具有最高优先级，将覆盖 UI 中的任何修改。**
3.  **配置文件 (持久化)**：直接修改 `~/.antigravity_tools/gui_config.json`，在 `proxy` 对象中修改或添加 `"admin_password": "您的新密码"` 字段。
    - *注：`WEB_PASSWORD` 是环境变量名，`admin_password` 是配置文件中的 JSON 键名。*

> [!TIP]
> **密码优先级逻辑 (Priority)**:
> - **第一优先级 (环境变量)**: `ABV_WEB_PASSWORD` 或 `WEB_PASSWORD`。只要设置了环境变量，系统将始终使用它。
> - **第二优先级 (配置文件)**: `gui_config.json` 中的 `admin_password` 字段。UI 的“保存”操作会更新此值。
> - **保底回退 (向后兼容)**: 若上述均未设置，则回退使用 `API_KEY` 作为登录密码。

# 方式 2: 使用 Docker Compose
# 1. 进入项目的 docker 目录
cd docker
# 2. 启动服务
docker compose up -d
```

docker-compose.yml内容
```yml
services:
  antigravity-manager:
    image: lbjlaq/antigravity-manager:latest
    container_name: antigravity-manager
    ports:
      - "8045:8045"
    volumes:
      - ~/.antigravity_tools:/root/.antigravity_tools
    environment:
      - LOG_LEVEL=info
      - API_KEY=your-secret-key  # [重要] 請設置您的安全密鑰，若不設置則在日誌中查看隨機密鑰
      - WEB_PASSWORD=your-password
    restart: unless-stopped
```

执行docker compose up -d 输出以下内容即为成功
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260127113408283.png)
## 安装问题排查
本文章基于服务器的安装，其他问题内容请前往[Antigravity Manager](https://github.com/lbjlaq/Antigravity-Manager)查看。

# 进入Antigravity页面使用

启动完成后在浏览器输入`服务器公网ip:8045`，即可进入下面页面，输入你在`docker-compose.yml`的`WEB_PASSWORD`配置的内容
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260127113742798.png)

进入首页，点击添加右上角的`添加账号`
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260127113903047.png)

切换至OAuth授权
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260127114018816.png)

如果跳转验证登录出现失败，如图
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260127142922598.png)

请检查一下`Antigravity tool`是不是最新的
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260127143004452.png)
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260127143020505.png)
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260127143050203.png)

检查[docker](https://hub.docker.com/r/lbjlaq/antigravity-manager)镜像版本，会发现latest不是最新版本
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260127143849187.png)

修改docker-compose.yml文件，调整`latest`为`v4.0.3`
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260127143954862.png)

之后执行`docker compose pull`更新镜像
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260127144058394.png)

重新启动容器`docker compose up -d`
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260127144156507.png)

在检查一下版本为最新即可
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260127144229365.png)

重新进入认证
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260202110228575.png)

页面输出出现`Auth Success`的文本字眼即为成功
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260202152016979.png)

返回你的Antigravity就会多出一个账号信息
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260202115252715.png)

# 启动API反代服务

进入`API服务`标签下
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260202115452952.png)

下面有相关的模型接入配置项，挨个去尝试即可
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260202144827148.png)

# 相关问题记录

## 接入`API`出现403返回验证失败问题

请求大模型内容的时候出现认证的问题
```json
All accounts exhausted. Last error: HTTP 403: {
  "error": {
    "code": 403,
    "message": "To continue, verify your account at\n\nhttps://accounts.google.com/signin/continue?sarp=1&scc=1&continue=https://developers.google.com/gemini-code-assist/auth/auth_success_gemini&plt=AKgnsbs0U14WuRUh2wNbtNKtOTaqlN-cehZyfYoDOcbmH1TnefW57rcV4l_qk6G0cIaiwSoLf94sipChuO4VvZt0e10bNGXgBbqd6kli_iHZZoPAyadAJzSnYAr_tPWc9iMnKkNlXoua&flowName=GlifWebSignIn&authuser\n\nLearn more\n\nhttps://support.google.com/accounts?p=al_alert\n",
    "status": "PERMISSION_DENIED",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        "reason": "VALIDATION_REQUIRED",
        "domain": "cloudcode-pa.googleapis.com",
        "metadata": {
          "validation_message_description": "To continue, verify your account at",
          "validation_url_link_text": "Verify your account",
          "validation_learn_more_link_text": "Learn more",
          "validation_learn_more_url": "https://support.google.com/accounts?p=al_alert",
          "validation_error_message": "To continue, verify your account at\n\nhttps://accounts.google.com/signin/continue?sarp=1&scc=1&continue=https://developers.google.com/gemini-code-assist/auth/auth_success_gemini&plt=AKgnsbs0U14WuRUh2wNbtNKtOTaqlN-cehZyfYoDOcbmH1TnefW57rcV4l_qk6G0cIaiwSoLf94sipChuO4VvZt0e10bNGXgBbqd6kli_iHZZoPAyadAJzSnYAr_tPWc9iMnKkNlXoua&flowName=GlifWebSignIn&authuser\n\nLearn more\n\nhttps://support.google.com/accounts?p=al_alert\n",
          "validation_url": "https://accounts.google.com/signin/continue?sarp=1&scc=1&continue=https://developers.google.com/gemini-code-assist/auth/auth_success_gemini&plt=AKgnsbs0U14WuRUh2wNbtNKtOTaqlN-cehZyfYoDOcbmH1TnefW57rcV4l_qk6G0cIaiwSoLf94sipChuO4VvZt0e10bNGXgBbqd6kli_iHZZoPAyadAJzSnYAr_tPWc9iMnKkNlXoua&flowName=GlifWebSignIn&authuser"
        }
      },
      {
        "@type": "type.googleapis.com/google.rpc.Help",
        "links": [
          {
            "description": "To continue, verify your account at",
            "url": "https://accounts.google.com/signin/continue?sarp=1&scc=1&continue=https://developers.google.com/gemini-code-assist/auth/auth_success_gemini&plt=AKgnsbs0U14WuRUh2wNbtNKtOTaqlN-cehZyfYoDOcbmH1TnefW57rcV4l_qk6G0cIaiwSoLf94sipChuO4VvZt0e10bNGXgBbqd6kli_iHZZoPAyadAJzSnYAr_tPWc9iMnKkNlXoua&flowName=GlifWebSignIn&authuser"
          },
          {
            "description": "Learn more",
            "url": "https://support.google.com/accounts?p=al_alert"
          }
        ]
      }
    ]
  }
}

```

需要单独在google做认证，复制`message`的地址结果
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260203093908184.png)

可以选择二维码扫码也可以短信，但是我这边试了三个安卓手机都没生效，所以走了虚拟手机号验证，虚拟手机号平台[SMS24](https://sms24.me/en/numbers)，挑一个近5分钟内有接收纪录的，认证即可。
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260203094118324.png)

## 申请Gemini Code Assist许可

异常信息
```json
All accounts exhausted. Last error: HTTP 403: {
  "error": {
    "code": 403,
    "message": "You are currently configured to use a Google Cloud Project but lack a Gemini Code Assist license. Please contact your administrator to request a license. (#3501)",
    "status": "PERMISSION_DENIED",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        "reason": "SUBSCRIPTION_REQUIRED",
        "domain": "cloudaicompanion.googleapis.com"
      },
      {
        "@type": "type.googleapis.com/google.rpc.Help",
        "links": [
          {
            "description": "Learn more",
            "url": "https://cloud.google.com/gemini/docs/codeassist/request-license"
          }
        ]
      }
    ]
  }
}

```

下载官方[antigravity](https://antigravity.google/)服务软件
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260212093731469.png)

开启验证，记住使用自己的机场`开启全局代理`，安装完之后按步骤`next`，进行到google验证，出现下面的界面即可
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260212093822420.png)
![](Google%20Antigravity%20通过%20Antigravity%20Manager反向代理/file-20260212094044538.png)
