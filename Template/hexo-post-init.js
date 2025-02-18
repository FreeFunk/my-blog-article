---
title: '<% tp.file.title %>' #文章标题
date: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %> #文章创建日期
updated: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %> #文章更新日期
categories: #文章分类
tags: #文章标签
keywords: #文章关键字
description: #文章描述
top_img: #文章顶部图片
cover: #文章缩略图(如果没有设置 top_img,文章页顶部将显示缩略图，可设为 false/图片地址/留空)
copyright_author: 'FreeFunk' #文章版权模块的文章作者 
copyright_author_href: 'https://free-funk-github-io.vercel.app' #文章版权模块的文章作者链接
main_color: '#e1efe1' #文章主色，必须是16进制颜色且有6位，不可缩减，例如#ffffff 不可写成#fff
highlight_shrink: true #配置代码框是否展开(true/false)(默认为设置中 highlight_shrink 的配置)
abbrlink: <%* date = tp.date.now("YYYYMMDDhhmmss"); %><% tp.user.hash_8c_2(date) %> #随机字符串用作文章博客唯一键
mathjax: true #文章分类
thumbnail: false
---
