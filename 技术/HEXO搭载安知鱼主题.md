---
title: HEXO搭载安知鱼主题
date: 2025-03-10 09:27:38
updated: 2025-03-22 11:45:38
categories: 技术
tags:
  - HEXO
  - 安知鱼主题
  - JS
keywords:
  - 安知鱼
  - HEXO
  - JS
description: 原生HEXO页面自定义配置主题，并且定制化调整样式
top_img: 
cover: https://pic1.imgdb.cn/item/67dcc2a088c538a9b5c23af8.jpg
copyright_author: FreeFunk
copyright_author_href: https://blog.freefunk.pp.ua
main_color: "#e1efe1"
highlight_shrink: false
abbrlink: a146fcf9
mathjax: true
thumbnail: false
---
# 前言

{% note info no-icon %}
本篇文章主要讲述在搭建好HEXO框架项目，搭配安知鱼主题加上一些自定义调整的处理，<font color="#ff0000">不过这里是我自己改造了自己想要的部分，其他的没有做配置我就没去看相关配置，如果有需要的建议去安知鱼官方文档查看</font>，我对于博客的样式调整不是特别多，因为我还是比较喜欢简约点的，不想要太天花乱坠的感觉，就只是一个博客网站看文章的地方简单就挺好。
<font color="#ff0000">注意</font>：
- ***涉及到自定义的图片、文本改动、按钮排版颜色、按钮显示、按钮交互等就在配置文件做改动，就是你感觉初始化的东西有点别扭的情况就针对配置文件去改就可以。***
- ***涉及背景颜色、排版大小高度宽度浮动、特定的图标等就需要针对这个页面的样式去做调整需要定位到具体的前端文件大部分在`.pug`或`.styl`文件里做改动，这部分改动建议在浏览器开`F12`做调整。***
- ***涉及到的顶部的页面：文章、友链、我的、关于其实本质是一个个页面要生效这部分的页面都要在`source`文件夹下创建`index.md`文件才能加载到页面，要不然都是404页面。***
{% endnote %}

# 安知鱼主题相关链接

{% note no-icon %}
- **[GitHub](https://github.com/anzhiyu-c/hexo-theme-anzhiyu)**
- **[安知鱼官方文档](https://docs.anheyu.com/initall.html)**
- **[安知鱼官方页面](https://blog.anheyu.com/)**
- **[安知鱼B站](https://space.bilibili.com/372204786)**
{% endnote %}

# 首页

{% note info no-icon %}
如果涉及到换图片的部分，可以去注册一个图床，[聚合图床](https://www.superbed.cn/)或者[去不图床](https://7bu.top/)，我用的是前者，后者好像要收费就没用。当然你也可以把图片放到你的项目里，但是初始化加载会挺慢的。
{% endnote %}

## 顶部配置

这部分我只做了左侧和中间这部分的改动。
![](HEXO搭载安知鱼主题/file-20250316164946515.png)

这里的设置主要是定义你自己的链接，可以是你的项目链接或者是你的账号链接
![](HEXO搭载安知鱼主题/file-20250316165324696.png)
具体修改配置前往你的项目找到`_config.anzhiyu.yml`，搜索配置`nav`，menu可以设置多个title，item下的name是你定义的名称，link是地址链接，icon是你的图标地址。
![](HEXO搭载安知鱼主题/file-20250316165754156.png)

第一个是一个文章列表，第二个是分类页链接、第三个标签页链接
![](HEXO搭载安知鱼主题/file-20250316170218927.png)

在`_config.anzhiyu.yml`，搜索配置`menu`，||前面是你本地项目定义的文件夹名，||后面是图标，第一个隧道可以不用做修改，后面的分类和标签，具体生成可以在后面页面设置查看如何生成[页面设置](#page_conf)。
![](HEXO搭载安知鱼主题/file-20250316170624356.png)

这个我设置成我自己的追番页面了
![](HEXO搭载安知鱼主题/file-20250316171125850.png)

在上面提到的`menu`配置下面，但是这部分可以不用修改默认就是这个目录名，配置和前面一致，具体生成也在后面的[追番页设置](#amintion_conf)
![](HEXO搭载安知鱼主题/file-20250316171425948.png)

关于本人是一个新的页面，随便逛逛是随机跳到一个文章去。
![](HEXO搭载安知鱼主题/file-20250316171412816.png)

这部分还是在上面提到的`menu`配置下面，具体生成配置可前往标题[个人页面](#my_page_conf)，随便逛逛可以根据你自己的需求去做改动
![](HEXO搭载安知鱼主题/file-20250316171913126.png)

## 顶部图

{% note primary no-icon %}
这里总共分三个部分，左侧的大图可以做一些特效流的改动，安知鱼官方有提供类似[人潮汹涌](https://www.bilibili.com/video/BV1RP411E7rM)的效果可自行去修改，右边的大图是一个简单的图片点击是一个可设置的链接。下面的三个按钮是自己定义的文章分类入口，你的文章是哪个分类就会进入这一类的文章列表。
![](HEXO搭载安知鱼主题/file-20250316172351645.png)
{% endnote %}

左侧大图因为我没有选择人潮涌动的效果，只是选择了图标轮播，所以需要单独创建配置文件，定义轮播的信息，而且要把人潮涌动的效果关闭。在`yml`文件下搜索`peoplecanvas`，把`enable:true`改为`enable:false`。
![](HEXO搭载安知鱼主题/file-20250316173440460.png)

在项目中找到`source`文件夹下面创建`_data/creativity.yml`文件，如果没有source或者_data就手动创建。
![](HEXO搭载安知鱼主题/file-20250316173614015.png)

追加一下内容，其他技能可以自己追加，图标如果安知鱼没有提供也可以用自己的图床链接
```yaml
- class_name: 开启创造力
  creativity_list:
    - name: Java
      color: "#fff"
      icon: https://bu.dusays.com/2023/04/09/643293b1184e9.jpg    
    - name: Docker
      color: "#57b6e6"
      icon: https://bu.dusays.com/2023/04/09/643293b0f0abe.png
    - name: Photoshop
      color: "#4082c3"
      icon: https://bu.dusays.com/2022/12/15/639aa3a5c240e.png
    - name: Apifox
      color: "#e65164"
      icon: https://bu.dusays.com/2022/11/19/6378d6458c6b6.png
    - name: Node
      color: "#333"
      icon: https://npm.elemecdn.com/anzhiyu-blog@2.1.1/img/svg/node-logo.svg
    - name: Python
      color: "#fff"
      icon: https://bu.dusays.com/2023/04/09/643293b1230f7.png
    - name: JS
      color: "#f7cb4f"
      icon: https://bu.dusays.com/2023/04/09/643293b121f02.png
    - name: Git
      color: "#df5b40"
      icon: https://bu.dusays.com/2023/04/09/643293b10ccdd.webp
```

在图上追加文本信息，在`_config.anzhiyu.yml`配置中搜索`home_top`，把enable设置为true，`title`就是你的文本信息，子文本就是`subTitle`，留底文字`siteText`，其实本质就是三行文本但是文字大小不一致。
![](HEXO搭载安知鱼主题/file-20250316174031120.png)

{% note success no-icon %}
如果你的字数比较多或者你想修改字体，这里配置文件就不支持修改了，需要修改`source/css/_layout/banner.styl`和`layout/includes/top/top.pug`两个文件。
![](HEXO搭载安知鱼主题/file-20250316175647041.png)
![](HEXO搭载安知鱼主题/file-20250316175719208.png)

这里我建议你自己的css样式单独新增一个样式的方法体，不要在原来的方法体上做修改，因为如果改了原始的css可能别的地方也用了，到时候可能别的地方的样式就有问题了，`banner.styl`这里新增内容，具体模板差不多这样子，你可以自己定义自己的css名字和css样式。
```css
.banners-title-big-first
  font-size: 25px;
  line-height: 1;
  font-weight: bold;
  margin-bottom: 8px;
  font-family: cursive;

.banners-title-big-second
  font-size: 28px;
  line-height: 1;
  font-weight: bold;
  margin-bottom: 8px;
  font-family: cursive;
```
![](HEXO搭载安知鱼主题/file-20250316180020990.png)

将你自己定义的css样式名字复制到`top.pug`做修改。替换掉前面在配置文件的key名前面的部分，pug文件的定义就是css样式名字=配置文件的key名。
![](HEXO搭载安知鱼主题/file-20250316180214906.png)
{% endnote %}

这部分涉及不同类型文章的入口页面
![](HEXO搭载安知鱼主题/file-20250318210614692.png)

追加完md文件之后配置`_config.anzhiyu.yml`，搜索`home_top`，修改`categories`
![](HEXO搭载安知鱼主题/file-20250319153038375.png)

三个按钮对应三份页面信息需要单独创建index.md文件，而且建议按照你命名的文字来定义目录，目录层级如下：
![](HEXO搭载安知鱼主题/file-20250318210806908.png)

追加如下信息，也可以根据你的喜好去修改，具体修改可以跳到[Front-matter](#front-matter)，检查具体配置。
```yml
---
title: 技术 #按钮的名称
date: 2025-02-14 23:18:49 #时间
top_img: false #是否顶部背景使用图片，不一定生效
type: categories #分类类型 默认：categories
comments: false
aside: false
---
```

右侧的大图是一个图片查询点击跳转的功能
![](HEXO搭载安知鱼主题/file-20250319154703919.png)

文本、图片地址、跳转地址都在配置文件修改`_config.anzhiyu.yml`，搜索`home_top`，修改`banner`配置。`immage`是图片地址，`link`点击图片跳转的地址。
![](HEXO搭载安知鱼主题/file-20250319154948047.png)

{% note info no-icon %}
这里涉及到抠图的功能，如果也和我一样想抠一下人物图的，可以看我这篇文章[Photoshop对图片中的人物做快速抠图](https://blog.freefunk.pp.ua/8986f1cd.html)，做快速抠图。
{% endnote %}

## 文章卡片

{% note primary no-icon %}
文章的设置大部分在配置文件中调整，有一个涉及描述无法显示的bug，我在本地自己调整了需求修改`pug`文件。
![](HEXO搭载安知鱼主题/file-20250319155515263.png)
{% endnote %}

`_config.anzhiyu.yml`配置文件中搜索`default_cover`这个配置是文章卡片的默认封面。如果你的文章没有定义封面，默认从配置文件这里取。
![](HEXO搭载安知鱼主题/file-20250319155656381.png)

在同样配置文件下搜索`post_meta`，调整卡片的基本信息。
![](HEXO搭载安知鱼主题/file-20250319160129067.png)

另外我这里对文章卡片的排序做了处理，因为排序默认按创建时间排序，如果你想要一些文章有优先级排在前面需要在文章的`Front-matter`追加`top`参数数字越大就越在前，不过这个方式我没有用，这需要安装插件。
```shell
# 需要卸载原来的index插件
npm uninstall hexo-generator-index --save

# 安装top插件
npm install hexo-generator-index-pin-top --save
```

而我这边没有这方面的需求我只希望按更新时间排序，就只需要修改`node_modules`下的文件即可，文件路径`node_modules\hexo-generator-index\lib\generator.js`，注释掉第7行，新增一行`const posts = locals.posts.sort('-updated');`
```js
'use strict';

const pagination = require('hexo-pagination');

module.exports = function(locals) {
  const config = this.config;
  //const posts = locals.posts.sort(config.index_generator.order_by);
  const posts = locals.posts.sort('-updated'); //新增
  posts.data.sort((a, b) => (b.sticky || 0) - (a.sticky || 0));

  const paginationDir = config.index_generator.pagination_dir || config.pagination_dir || 'page';
  const path = config.index_generator.path || '';

  return pagination(path, posts, {
    perPage: config.index_generator.per_page,
    layout: config.index_generator.layout || ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
};
```

{% note danger no-icon %}
需求留一下，就是在初始化没做这块卡片样式修改，会发现你的文章定义的描述`description`，在卡片上不显示。默认配置是给定一个展示的类型和文本长度。`method`是选定一段文本，分两种一个是直接取你的文章描述，一个是从你的文字内容开始，`length`是截取的文本长度。
![](HEXO搭载安知鱼主题/file-20250319162207544.png)

之后设置完你会发现，你的文章卡片的描述出不来。这样的效果一行空白。
![](HEXO搭载安知鱼主题/file-20250319162503690.png)

我最后定位到是`themes\anzhiyu\layout\includes\mixins\post-ui.pug`，这个文件做了部分判断逻辑，因为配置文件默认的`method`是2，我也就在2的基础上做改动。
![](HEXO搭载安知鱼主题/file-20250319163120425.png)

搜索`theme.index_post_content.method`，定位到追加修改的内容，就在`when 2`下做修改，可以沿用我这个内容，因为卡片的文本长度最多32，所以超过32后面的部分拼接...省略号，获取的文本如果你的文章没有定义`description`会默认从文章内容开始截取32个字符展示。<font color="#ff0000">注意空格缩进位。</font>
```js
if article.description
  - const content = strip_html(article.description)
  - let expert = content.substring(0, theme.index_post_content.length)
  - content.length > theme.index_post_content.length ? expert += ' ...' : ''
  .recent-post-info-top!= expert
else
  - const content = strip_html(article.description)
  - let expert = content.substring(0, theme.index_post_content.length)
  - content.length > theme.index_post_content.length ? expert += ' ...' : ''
  .recent-post-info-top!= expert
```

之后重新启动hexo项目就可以看到效果了。
![](HEXO搭载安知鱼主题/file-20250319170037373.png)
{% endnote %}

## 个人卡片

{% note default no-icon %}
这部分内容大都在`_config.anzhiyu.yml`配置里修改，只有左下角的内容是需要在`_config.yml`做配置，分为两个部分下面的微信公众号得自己去申请。主色调的调整可以在`theme_color`配置里修改
![](HEXO搭载安知鱼主题/file-20250319171043520.png)
{% endnote %}

头像修改在`avatar`配置下，修改图片地址，`effect`设置为`true`的话你的头像会转起来。
![](HEXO搭载安知鱼主题/file-20250319171704843.png)

头像的右下角的小图标也是一个图片地址，在`author_status`做修改，你要先设置启用状态`enable:true`，修改`statusImg`就可以显示你的右下角图标。
![](HEXO搭载安知鱼主题/file-20250319171824865.png)

左下角的文本和名字是在另一个文件配置中设置，也是你的网站浏览器窗口tab的文本信息。
![](HEXO搭载安知鱼主题/file-20250319172130328.png)

具体在`_config.yml`文件，注意不是前面的`_config.anzhiyu.yml`是另一个文件这个文件是HEXO自己的配置文件。
![](HEXO搭载安知鱼主题/file-20250319172245911.png)

搜索`title`，找到几行配置进行修改即可。title是前面的部分可以定义任何信息，subtitle是后面的部分也是个人卡片的描述，`author`是你自己定义的名字。
![](HEXO搭载安知鱼主题/file-20250319172336904.png)

配置信息
```yml
title: FreeFunk
subtitle: 南柯一梦
description: ''
keywords:
author: FreeFunk
language: zh-CN
timezone: ''
```

右边的两个跳转链接就回到我们一开始的配置文件`_config.anzhiyu.yml`下操作。
![](HEXO搭载安知鱼主题/file-20250319172801879.png)

搜索`social`，修改地址和图标即可
![](HEXO搭载安知鱼主题/file-20250319172834733.png)

最后这个卡片有一个交互就是鼠标悬浮到卡片上会翻转卡片，这里可以定义你的文本，不过这部分是一个html的文本信息。
![](HEXO搭载安知鱼主题/file-20250319172954198.png)

搜索`card_author`，启用配置修改`description`配置即可。
![](HEXO搭载安知鱼主题/file-20250319173058725.png)

配置信息如下，注意`aside.enable`也要设置true，卡片才能开启。
~~~yml
aside:
  enable: true
  hide: false
  button: true
  mobile: true # display on mobile
  position: right # left or right
  display: # 控制对应详情页面是否显示侧边栏
    archive: true
    tag: true
    category: true
  card_author:
    enable: true
    description:  <div style="line-height:1.38;margin:0.6rem 0;text-align:center;color:rgba(255, 255, 255, 0.8);font-size:20px;font-family:initial;font-weight:bold;">要么一切，要么全无</div> # 默认为站点描述
    name_link: /
~~~

下方的公众号你可以自己申请，自己PS设计一下排版，生成两张图片一个是正面的一个是背面的。
![正面](HEXO搭载安知鱼主题/file-20250319173840525.png)
![背面](HEXO搭载安知鱼主题/file-20250319174011074.png)

配置修改在`card_weixin`配置中，打开启用，face就是正面图，backFace就是背面图。
![](HEXO搭载安知鱼主题/file-20250319174054631.png)

## 网站统计

{% note info no-icon %}
位于右下角的内容显示
![](HEXO搭载安知鱼主题/file-20250320100916500.png)
{% endnote %}

可以去安知鱼文档检查有很多配置包括什么最近更新时间、总字数什么的，这里我只放了这三份。在配置文件`_config.anzhiyu.yml`，搜索`runtimeshow`配置启用，定义`publish_date`配置这是定义你自己博客网站的建站开始时间，格式是:`m/DD/yyyy HH:mm:ss`。
![](HEXO搭载安知鱼主题/file-20250320101246658.png)
```yml
# Time difference between publish date and now (网页运行时间)
# Formal: Month/Day/Year Time or Year/Month/Day Time
runtimeshow:
  enable: true
  publish_date: 2/10/2025 00:00:00
```

文章总数要搜索配置`card_webinfo`，设置启用配置`post_count:true`，统计文章总数。`last_push_date`配置是最近更新时间。
![](HEXO搭载安知鱼主题/file-20250320103309826.png)

```yml
card_webinfo:
  enable: true
  post_count: true
  last_push_date: false
  sort_order: # Don't modify the setting unless you know how it works
```

字数统计配置搜索`wordcount`，这部分的改动也会同步修改到文章内部的统计，主题会把这个字数统计的配置用在全局中。
![](HEXO搭载安知鱼主题/file-20250320103514635.png)

`post_wordcount`是文章内部的总字数，`total_wordcount`是全站总字数。
```yml
# wordcount (字数统计)
# see https://blog.anheyu.com/posts/c27d.html#字数统计
wordcount:
  enable: true
  post_wordcount: true
  min2read: true
  total_wordcount: true
```
## 底部配置

{% note default no-icon %}
底部配置我设置的内容比较少，底部设置的内容很多，有需求的小伙伴可以查看文档追加，基本就是设置启用就可以看到了，然后在配置自己各个的平台地址，设置自己喜欢的图标就可以了。
![](HEXO搭载安知鱼主题/file-20250320104236086.png)
{% endnote %}

这部分的内容配置在`_config.anzhiyu.yml`，搜索`footer`涉及的配置很多，有`owner、runtime、bdageitem、socialBar、list、footerBar`需要什么就开启启用。
![](HEXO搭载安知鱼主题/file-20250320104557940.png)

我这部分涉及`socialBar`就一行简单的平台链接，`title`是显示文本，`link`是地址链接、`icon`是显示图标，区分左右。
![](HEXO搭载安知鱼主题/file-20250320104736821.png)

```yml
socialBar:
  enable: true
  centerImg:
  left:
    - title: email
      link: mailto:2917426372@qq.com
      icon: anzhiyu-icon-envelope
    - title: 微博
      link: https://weibo.com/u/6229901786
      icon: anzhiyu-icon-weibo
    - title: facebook
      link: https://www.facebook.com/profile.php?id=100092208016287&sk=about
      icon: anzhiyu-icon-facebook1
    # - title: RSS
    #   link: atom.xml
    #   icon: anzhiyu-icon-rss
  right:
    - title: Github
      link: https://github.com/FreeFunk
      icon: anzhiyu-icon-github
    - title: Bilibili
      link: https://space.bilibili.com/242466102
      icon: anzhiyu-icon-bilibili
    - title: 抖音
      link: https://v.douyin.com/iPvHXkYo/
      icon: anzhiyu-icon-tiktok
```

<h1 id="page_conf">页面设置</h1>

{% note info no-icon %}
这部分的内容其实就是在定义一些页面的基础信息，通过`md`文件的头部配置信息，定义一些全局变量，通过这些变量就可以生成一个页面的基础信息。这里的页面设置又分为`page`页面设置和`post`文章设置。
如何快速配置你的文章`Front-maater`可以看[Obsidian文章同步部署博客项目](https://blog.freefunk.pp.ua/3fa2a9c2.html)
{% endnote %}

<h2 id="front-matter">Front-matter</h2>

{% note info no-icon %}
用于头部定义的配置信息的语法，[Front-matter简介和视频](https://hexo.io/zh-cn/docs/front-matter)有说明这部分的信息，需要什么就定义什么。
[安知鱼文档Front-matter链接](https://docs.anheyu.com/page/front-matter.html)
{% endnote %}

### Page Front-matter

| 写法                    | 解释                                                             |
| --------------------- | -------------------------------------------------------------- |
| title                 | 【必需】页面标题                                                       |
| date                  | 【必需】页面创建日期                                                     |
| type                  | 【必需】标签、分类、关于、音乐馆、友情链接、相册、相册详情、朋友圈、即刻页面需要配置                     |
| updated               | 【可选】页面更新日期                                                     |
| description           | 【可选】页面描述                                                       |
| keywords              | 【可选】页面关键字                                                      |
| comments              | 【可选】显示页面评论模块(默认 true)                                          |
| top_img               | 【可选】页面顶部图片                                                     |
| mathjax               | 【可选】显示 mathjax(当设置 mathjax 的 per_page: false 时，才需要配置，默认 false) |
| katex                 | 【可选】显示 katex(当设置 katex 的 per_page: false 时，才需要配置，默认 false)     |
| aside                 | 【可选】显示侧边栏 (默认 true)                                            |
| aplayer               | 【可选】在需要的页面加载 aplayer 的 js 和 css,请参考文章下面的音乐 配置                  |
| highlight_shrink      | 【可选】配置代码框是否展开(true/false)(默认为设置中 highlight_shrink 的配置)         |
| top_single_background | 【可选】部分页面的顶部模块背景图片                                              |

### Post Front-matter

| 写法                    | 解释                                                             |
| --------------------- | -------------------------------------------------------------- |
| title                 | 【必需】文章标题                                                       |
| date                  | 【必需】文章创建日期                                                     |
| updated               | 【可选】文章更新日期                                                     |
| tags                  | 【可选】文章标签                                                       |
| categories            | 【可选】文章分类                                                       |
| keywords              | 【可选】文章关键字                                                      |
| description           | 【可选】文章描述                                                       |
| top_img               | 【可选】文章顶部图片                                                     |
| cover                 | 【可选】文章缩略图(如果没有设置 top_img,文章页顶部将显示缩略图，可设为 false/图片地址/留空)        |
| comments              | 【可选】显示文章评论模块(默认 true)                                          |
| toc                   | 【可选】显示文章 TOC(默认为设置中 toc 的 enable 配置)                           |
| toc_number            | 【可选】显示 toc_number(默认为设置中 toc 的 number 配置)                      |
| toc_style_simple      | 【可选】显示 toc 简洁模式                                                |
| copyright             | 【可选】显示文章版权模块(默认为设置中 post_copyright 的 enable 配置)                |
| copyright_author      | 【可选】文章版权模块的`文章作者`                                              |
| copyright_author_href | 【可选】文章版权模块的`文章作者`链接                                            |
| copyright_url         | 【可选】文章版权模块的`文章链接`链接                                            |
| copyright_info        | 【可选】文章版权模块的版权声明文字                                              |
| mathjax               | 【可选】显示 mathjax(当设置 mathjax 的 per_page: false 时，才需要配置，默认 false) |
| katex                 | 【可选】显示 katex(当设置 katex 的 per_page: false 时，才需要配置，默认 false)     |
| aplayer               | 【可选】在需要的页面加载 aplayer 的 js 和 css,请参考文章下面的`音乐` 配置                |
| highlight_shrink      | 【可选】配置代码框是否展开(true/false)(默认为设置中 highlight_shrink 的配置)         |
| aside                 | 【可选】显示侧边栏 (默认 true)                                            |
| swiper_index          | 【可选】首页轮播图配置 index 索引，数字越小越靠前                                   |
| top_group_index       | 【可选】首页右侧卡片组配置, 数字越小越靠前                                         |
| ai                    | 【可选】文章ai摘要                                                     |
| main_color            | 【可选】文章主色，必须是16进制颜色且有6位，不可缩减，例如#ffffff 不可写成#fff                 |

{% note success no-icon %}
我本人写文章一般喜欢用的配置如下，喜欢的可以使用。
```yml
---
title:  #文章标题
date: #文章创建日期
updated:  #文章更新日期
categories: #文章分类
tags: #文章标签
keywords: #文章关键字
description: #文章描述
top_img: #文章顶部图片
cover: #文章缩略图(如果没有设置 top_img,文章页顶部将显示缩略图，可设为 false/图片地址/留空)
copyright_author: 'FreeFunk' #文章版权模块的文章作者 
copyright_author_href: 'https://blog.freefunk.pp.ua' #文章版权模块的文章作者链接
main_color: '#e1efe1' #文章主色，必须是16进制颜色且有6位，不可缩减，例如#ffffff 不可写成#fff
highlight_shrink: false #配置代码框是否展开(true/false)(默认为设置中 highlight_shrink 的配置)
abbrlink: #随机字符串用作文章博客唯一键
mathjax: true #文章分类
thumbnail: false
---
```
{% endnote %}

## 标签页

{% note info no-icon %}
根据上面的`Front-matter`对`md`文件定义你就可以设置你的标签页的配置了，[安知鱼定义标签页](https://docs.anheyu.com/page/tags.html)可以通过`hexo`生成一个文件目录，当然你可以自己直接创建出来。
{% endnote %}

这是我本地自己定义的标签`md`文件，主要是要定义`type: "tags"`
```yml
---
title: 标签
date: 2025-02-13 16:47:18
type: "tags"
comments: false
aside: false
top_img: false
updated:
description:
keywords:
mathjax:
katex:
aplayer:
highlight_shrink:
top_single_background:
---
```

不做任何修饰的效果就是会收集你自己所有文章的`tags`标签信息展示。如果你想做一些调整可以在标签的`md`自行追加，就像写页面html的语法一样。
![](HEXO搭载安知鱼主题/file-20250320205637354.png)

## 分类页

{% note info no-icon %}
和上面的标签页一样的步骤，[安知鱼定义分类页](https://docs.anheyu.com/page/classify.html)。
{% endnote %}

定义一样的`md`文件，留意这个类型`type: categories`
```yml
---
title: 分类
date: 2025-03-01 12:09:49
top_img: false
type: categories
comments: false
aside: false
updated: 
description: 
keywords: 
mathjax: 
katex: 
aplayer: 
highlight_shrink: 
top_single_background:
---
```

没做任何修饰的页面也是和标签页一样，要做修改也是和标签页一样的逻辑。
![](HEXO搭载安知鱼主题/file-20250320210412222.png)

<h2 id="my_page_conf">个人页</h2>

{% note info no-icon %}
配置个人页面需要涉及两步，一个是定义`md`文件一个是配置一个`about.yml`配置项，[安知鱼关于页面配置](https://docs.anheyu.com/page/about.html)。
![](HEXO搭载安知鱼主题/file-20250320210650017.png)
{% endnote %}

同样可以通过`hexo`命令生成一个about目录出现一个`md`文件，也可以自己直接生成`source\about\index.md`目录。定义的`front-matter`配置。
```yml
---
title:
date: 2025-02-15 14:36:59
type: "about"
updated:
comments: false
description:
keywords:
mathjax:
katex:
aside: false
aplayer:
highlight_shrink:
top_single_background: "#68b88e"
background: "#68b88e"
---
```

之后在`_config.anzhiyu.yml`配置文件追加你的个人页面路径。搜索`menu`查找。
![](HEXO搭载安知鱼主题/file-20250320210951748.png)

之后在目录`source/_data/about.yml`找到这个`yml`文件，没有就新建一个。
![](HEXO搭载安知鱼主题/file-20250320211110099.png)

配置参数如下，留意数据类型
|参数|备选值/类型|解释|
|---|---|---|
|class_name|关于页|【必须】页面类|
|subtitle|string|【必须】副标题|
|avatarImg|url|【必须】头像链接|
|name|string|【必须 作者名称|
|description|string|【必须】描述|
|aboutsiteTips|object|【必须】站点关于提示相关配置|
|aboutsiteTips.tips|string|【必须】站点关于提示性文字|
|aboutsiteTips.title1|string|【必须】站点关于标题文字 1|
|aboutsiteTips.title2|string|【必须】站点关于标题文字 2|
|aboutsiteTips.word|list|【必须】站点关于标题滚动文字|
|helloAbout|string|【必须】hello 文字|
|skillsTips|object|【必须】技能相关配置|
|skillsTips.tips|string|【必须】技能提示文字|
|skillsTips.title|string|【必须】技能标题|
|careers|object|【必须】生涯相关配置|
|careers.tips|string|【必须】生涯提示性文字|
|careers.title|string|【必须】生涯标题|
|careers.list|list|【可选】生涯 item|
|careers.list.desc|string|【可选】生涯 item 描述|
|careers.list.color|string|【可选】生涯 item 圆圈颜色|
|careers.img|string|【必须】生涯底部图片|
|statistic|object|【必须】统计数据相关配置|
|statistic.link|url|【必须】统计数据按钮前往链接|
|statistic.text|string|【必须】统计数据按钮文字|
|map|object|【必须】地图相关配置|
|map.title|string|【必须】地图标题|
|map.StrengthenTitle|string|【必须】地图大标题|
|map.background|url|【必须】地图亮色模式背景|
|map.backgroundDark|url|【必须】地图暗色模式背景|
|selfInfo|object|【必须】作者相关信息配置|
|selfInfo.selfInfoTips1|string|【必须】作者相关提示文字 1|
|selfInfo.selfInfoContentYear|number|【必须】作者生日年份|
|selfInfo.selfInfoTips2|string|【必须】作者相关提示文字 2|
|selfInfo.selfInfoContent2|string|【必须】作者相关内容 2|
|selfInfo.selfInfoTips3|string|【必须】作者相关提示文字 3|
|selfInfo.selfInfoContent3|string|【必须】作者相关内容 3|
|personalities|object|【必须】作者性格相关配置|
|personalities.author_name|string|【必须】作者性格名称|
|personalities.personality_type|string|【必须】作者性格类型|
|personalities.photo_url|url|【必须】作者自拍图片|
|personalities.personality_img|url|【必须】作者性格表述图片|
|personalities.name_url|url|【必须】点击性格跳转到链接|
|maxim|object|【必须】座右铭相关配置|
|maxim.maxim_tips|string|【必须】座右铭相关提示文字|
|maxim.maxim_top|string|【必须】座右铭相关顶部文字|
|maxim.maxim_bottom|string|【必须】座右铭相关底部文字|
|buff|object|【必须】特长相关配置|
|buff.buff_tips|string|【必须】特长相关提示文字|
|buff.buff_top|string|【必须】特长相关顶部文字|
|buff.buff_bottom|string|【必须】特长相关底部文字|
|game|object|【必须】爱好游戏相关配置|
|game.game_tips|string|【必须】爱好游戏提示文字|
|game.game_title|string|【必须】爱好游戏标题|
|game.game_uid|string|【必须】爱好游戏 uid|
|game.game_bg|url|【必须】爱好游戏背景|
|comic|object|【必须】追番相关配置，需要 5 条数据|
|comic.comic_tips|string|【必须】追番相关提示文字|
|comic.comic_title|string|【必须】追番相关标题|
|comic.comic_list|list|【必须】追番相关列表|
|comic.comic_list.name|string|【必须】追番 item 名称|
|comic.comic_list.href|url|【必须】追番 item 链接|
|comic.comic_list.cover|url|【必须】追番 item 的 cover|
|like|object|【必须】关注偏好相关配置|
|like.like_tips|string|【必须】关注偏好配置提示文字|
|like.like_title|string|【必须】关注偏好配置标题|
|like.like_bg|url|【必须】关注偏好配置背景|
|like.like_bottom|string|【必须】关注偏好配置底部文字|
|music|object|【必须】音乐偏好相关配置|
|music.music_tips|string|【必须】音乐偏好提示性文字|
|music.music_title|string|【必须】音乐偏好标题|
|music.music_bg|url|【必须】音乐偏好背景|
|music.music_link|url|【必须】音乐偏好按钮链接|
|reward_list|object|【可选】打赏相关配置，如果不配置将没有打赏模块|
|reward_list.name|string|【必须】打赏 item 名称|
|reward_list.amount|number|【必须】打赏 item 金额|
|reward_list.datatime|Date|【必须】打赏 item 时间|
|reward_list.suffix|string/元|【可选】打赏 item 后缀（默认元）|

我的配置项设置的也不多，有需要的可以看看
```yml
- class_name: FreeFunk
  subtitle: 四季测量着一年的行程
  avatarImg: https://pic1.imgdb.cn/item/67b0204ed0e0a243d4ff8a0d.jpg
  avatarSkills:
    left:
      - 🤖️ 后端开发工程师
      - 🔍 分享与热心帮助
      # - 🏠 智能家居小能手
      - 🔨 设计开发一条龙
      - 💃 POPPING小菜鸡
    right:
      - 专修交互与设计 🤝
      - 脚踏实地行动派 🏃
      - 随笔记录爱好者 🧱
      - 我是小小二次元 💢
  name: 邱天柱
  description: 是一名 后端开发工程师、一名POPPER(BooGie BlooD Crew、FreeDance Crew)、小小二次元
  aboutsiteTips:
    tips: 追求
    title1: 源于
    title2: 热爱而去 感受
    word:
      - 舞蹈
      - 随笔
      - 程序
      - 体验
  helloAbout: FreeFunk
  # skillsTips:
  #   tips: 技能
  #   title: 开启创造力
  careers:
    tips: 舞蹈生涯
    title: Keep On Dancing
    list:
      - desc: Fresno
        color: "#93b5cf"
      - desc: Twist O Flex
        color: "#93b5cf"
      - desc: Neck O Flex
        color: "#93b5cf"
      - desc: Master Flex
        color: "#93b5cf"
      - desc: Walk Out
        color: "#93b5cf"
      - desc: Romeo Twist
        color: "#93b5cf"
      - desc: Egyptian Twist
        color: "#93b5cf"
      - desc: Old Man
        color: "#93b5cf"
      - desc: Tida Wave
        color: "#93b5cf"
      - desc: Popping
        color: "#93b5cf"
    img: https://pic1.imgdb.cn/item/67b69014d0e0a243d400ddab.gif
  statistic:
    link: /archives
    text: 文章隧道
    cover: https://bu.dusays.com/2023/05/01/644f4b037b930.jpg
  map:
    title: 我现在住在
    StrengthenTitle: 中国，海口市
    background: https://pic1.imgdb.cn/item/67b03b5ed0e0a243d4ff9068.jpg
    backgroundDark: https://pic1.imgdb.cn/item/67b03bf0d0e0a243d4ff909a.jpg
  selfInfo:
    selfInfoTips1: 生于
    selfInfoContentYear: 1998
    selfInfoTips2: 河北科技师范学院
    selfInfoContent2: 计算科学与技术
    selfInfoTips3: 现在职业
    selfInfoContent3: 后端开发工程师👨
  personalities:
    author_name: 物流师
    personality_type: ISTJ-A
    photo_url: https://pic1.imgdb.cn/item/67ab599fd0e0a243d4fe6b08.png
    personality_img: https://pic1.imgdb.cn/item/67b04f1dd0e0a243d4ff9689.png
    name_url: https://www.16personalities.com/ch/istj-%E4%BA%BA%E6%A0%BC
  maxim:
    maxim_tips: 座右铭
    maxim_top: 逆境
    maxim_bottom: 是到达真理的一条道路。
  buff:
    buff_tips: 特长
    buff_top: 臭跳街舞的、臭爱拍照的、臭爱画画的
    buff_bottom: 二次元指数 MIN -> MAX
  game:
    game_tips: 爱好游戏
    game_title: 如龙
    game_uid: "UID: 125766904"
    game_bg: https://pic1.imgdb.cn/item/67b04481d0e0a243d4ff934c.jpg
  comic:
    comic_tips: 爱好番剧
    comic_title: 追番
    comic_list:
      - name: 干物妹，小埋
        href: https://zh.moegirl.org.cn/干物妹！小埋
        cover: https://pic1.imgdb.cn/item/67b7cf79d0e0a243d401269c.jpg
      - name: 你好，世界
        href: https://zh.moegirl.org.cn/HELLO_WORLD
        cover: https://pic1.imgdb.cn/item/67b7cf78d0e0a243d4012699.jpg
      - name: 你的名字
        href: https://zh.moegirl.org.cn/你的名字。
        cover: https://pic1.imgdb.cn/item/67b7cfb7d0e0a243d40126b3.jpg
      - name: 天气之子
        href: https://zh.moegirl.org.cn/天气之子
        cover: https://pic1.imgdb.cn/item/67b7cfded0e0a243d40126bc.jpg
      - name: 铃芽之旅
        href: https://zh.moegirl.org.cn/铃芽之旅
        cover: https://pic1.imgdb.cn/item/67b7cfa7d0e0a243d40126ab.jpg
      - name: 秒速五厘米
        href: https://zh.moegirl.org.cn/秒速5厘米
        cover: https://pic1.imgdb.cn/item/67b7cfa8d0e0a243d40126af.jpg
      - name: 言叶之庭
        href: https://zh.moegirl.org.cn/言叶之庭
        cover: https://pic1.imgdb.cn/item/67b7cff2d0e0a243d40126c3.jpg
      - name: 未来少年柯南.巨大机毒娥号的复活
        href: https://zh.moegirl.org.cn/未来少年柯南
        cover: https://pic1.imgdb.cn/item/67b7cfe2d0e0a243d40126bd.jpg
      - name: 鲁邦三世：卡里奥斯特罗之城
        href: https://zh.moegirl.org.cn/鲁邦三世_卡里奥斯特罗之城
        cover: https://pic1.imgdb.cn/item/67b7cfa8d0e0a243d40126ad.jpg
      - name: 风之谷
        href: https://zh.moegirl.org.cn/风之谷
        cover: https://pic1.imgdb.cn/item/67b7cf79d0e0a243d401269b.jpg
      - name: 天空之城
        href: https://zh.moegirl.org.cn/天空之城
        cover: https://pic1.imgdb.cn/item/67b7cfdcd0e0a243d40126bb.jpg
      - name: 龙猫
        href: https://zh.moegirl.org.cn/龙猫
        cover: https://pic1.imgdb.cn/item/67b7cfa7d0e0a243d40126ac.jpg
      - name: 魔女宅急便
        href: https://zh.moegirl.org.cn/魔女宅急便
        cover: https://pic1.imgdb.cn/item/67b7cfa8d0e0a243d40126b0.jpg
      - name: 红猪
        href: https://zh.moegirl.org.cn/红猪
        cover: https://pic1.imgdb.cn/item/67b7cf95d0e0a243d40126a1.jpg
      - name: 幽灵公主
        href: https://zh.moegirl.org.cn/幽灵公主
        cover: https://pic1.imgdb.cn/item/67b7cfffd0e0a243d40126c5.jpg
      - name: 千与千寻
        href: https://zh.moegirl.org.cn/千与千寻
        cover: https://pic1.imgdb.cn/item/67b7cfd7d0e0a243d40126b9.jpg
      - name: 哈尔的移动城堡
        href: https://zh.moegirl.org.cn/哈尔的移动城堡
        cover: https://pic1.imgdb.cn/item/67b7cf79d0e0a243d401269d.jpg
      - name: 悬崖上的金鱼姬
        href: https://zh.moegirl.org.cn/崖上的波妞
        cover: https://pic1.imgdb.cn/item/67b7cff2d0e0a243d40126c2.jpg
      - name: 起风了
        href: https://zh.moegirl.org.cn/起风了(小说)#
        cover: https://pic1.imgdb.cn/item/67b7cfb8d0e0a243d40126b7.jpg
      - name: 你想活出怎样的人生
        href: https://zh.moegirl.org.cn/你想活出怎样的人生？
        cover: https://pic1.imgdb.cn/item/67b7cfb7d0e0a243d40126b4.jpg
      - name: 间谍过家家
        href: https://zh.moegirl.org.cn/间谍过家家
        cover: https://pic1.imgdb.cn/item/67b7cf96d0e0a243d40126a5.jpg
      - name: 辉夜大小姐
        href: https://zh.moegirl.org.cn/辉夜大小姐想让我告白～天才们的恋爱头脑战～
        cover: https://pic1.imgdb.cn/item/67b7cf96d0e0a243d40126a2.jpg
      - name: 玉子市场
        href: https://zh.moegirl.org.cn/玉子市场
        cover: https://pic1.imgdb.cn/item/67b7d000d0e0a243d40126c6.jpg
      - name: 冰菓
        href: https://zh.moegirl.org.cn/冰菓
        cover: https://pic1.imgdb.cn/item/67b7cf78d0e0a243d401269a.jpg
      - name: 五等分的新娘
        href: https://zh.moegirl.org.cn/五等分的新娘
        cover: https://pic1.imgdb.cn/item/67b7cff2d0e0a243d40126c1.jpg
      - name: 女神的咖啡厅
        href: https://zh.moegirl.org.cn/女神咖啡厅
        cover: https://pic1.imgdb.cn/item/67b7cfb8d0e0a243d40126b5.jpg
      - name: 妻子变成小学生
        href: https://zh.moegirl.org.cn/妻子变成小学生。
        cover: https://pic1.imgdb.cn/item/67b7cfb8d0e0a243d40126b6.jpg
      - name: 罪恶王冠
        href: https://zh.moegirl.org.cn/罪恶王冠
        cover: https://pic1.imgdb.cn/item/67b7d001d0e0a243d40126ca.jpg
      - name: 天官赐福
        href: https://zh.moegirl.org.cn/天官赐福
        cover: https://pic1.imgdb.cn/item/67b7cfd7d0e0a243d40126ba.jpg
      - name: 中二病也要谈恋爱！
        href: https://zh.moegirl.org.cn/中二病也要谈恋爱！
        cover: https://pic1.imgdb.cn/item/67b7d000d0e0a243d40126c7.jpg
      - name: 未闻花名
        href: https://zh.moegirl.org.cn/我们仍未知道那天所看见的花的名字。
        cover: https://pic1.imgdb.cn/item/67b7cff0d0e0a243d40126bf.jpg
      - name: 总之非常可爱
        href: https://zh.moegirl.org.cn/总之就是非常可爱
        cover: https://pic1.imgdb.cn/item/67b7d000d0e0a243d40126c9.jpg
      - name: 邻家的天使同学
        href: https://zh.moegirl.org.cn/关于我在无意间被隔壁的天使变成废柴这件事
        cover: https://pic1.imgdb.cn/item/67b7cf97d0e0a243d40126a6.jpg
      - name: 继母的拖油瓶是我的前女友
        href: https://zh.moegirl.org.cn/继母的拖油瓶是我的前女友
        cover: https://pic1.imgdb.cn/item/67b7cf96d0e0a243d40126a3.jpg
      - name: 我决定和班上最讨厌的女生结婚了
        href: https://zh.moegirl.org.cn/我决定和班上最讨厌的女生结婚了
        cover: https://pic1.imgdb.cn/item/67b7cff1d0e0a243d40126c0.jpg
  like:
    like_tips: 关注偏好
    like_title: 数码科技
    like_bg: https://bu.dusays.com/2022/12/06/638f5f05ce1f7.jpg
    like_bottom: 手机、电脑软硬件
  music:
    music_tips: 音乐偏好
    music_title: 嘻哈、抒情、民谣
    music_bg: https://pic1.imgdb.cn/item/67b046d9d0e0a243d4ff93e7.jpg
    music_link: /music
  reward_list:
    - name: 海阔蓝
      amount: 8.8
      datatime: 2023-03-28
```

{% note danger no-icon %}
注意：这里涉及的一些必须的配置是需要配置，要不然会报错，如果有些配置你不想需要，你需要去对应的`about.pug`文件进行注释删除，目录路径`themes\anzhiyu\layout\includes\page\about.pug`。
![](HEXO搭载安知鱼主题/file-20250320211433320.png)

方法就是找到对应的配置去到这个`about.pug`进行搜索，找到对应的一个方法体进行注释。
![](HEXO搭载安知鱼主题/file-20250320211534952.png)

这样就可以比较灵活的配成你想要的样子，包括可以移动这些内容的位置，包括内容方块的样式、字体大小，图片大小都可以设置，这个文件位于`themes\anzhiyu\source\css\_page\about.styl`。
![](HEXO搭载安知鱼主题/file-20250320211709295.png)
{% endnote %}

# 看娘设置

{% note default no-icon %}
看娘就是在你的页面上加一个2d动漫人物，一般都是别人定义好的模型，直接拽过来用就可以，如果你想要自己想要的动漫人物模型需要去查看涉及`live2d`技术栈内容。
[hexo适配的live2d](https://github.com/EYHN/hexo-helper-live2d)这个是一个GitHub项目，不过项目比较久远了，如果想用更新的模型可以用这个项目[支持操作项的live2D](https://github.com/stevenjoezhang/live2d-widget)项目比较新现在作者还在更新，支持点击交互发送消息等等，如果不喜欢的话可以去按照`live2D 看娘 Git项目`字条去搜索内容。
{% endnote %}

这是我自己的效果，包括模型大小，位置都可以在配置文件定义。模型名称是`live2d-widget-model-shizuku`
![](HEXO搭载安知鱼主题/file-20250320212102410.png)

安装模型，[模型列表](https://blog.csdn.net/wang_123_zy/article/details/87181892#live2dwidgetmodelchitose_12)
```shell
npm install --save '模型的名称'
```

安装完之后在你的`_config.yml`追加配置信息，[配置参数说明](https://l2dwidget.js.org/docs/class/src/index.js~L2Dwidget.html#instance-method-init)
![](HEXO搭载安知鱼主题/file-20250320213220960.png)

我本人的配置信息就比较少，主要调整一个位置和大小，并且在移动端不显示，因为这个`live2D`不会根据你的窗口自适应缩放，这样在移动端看娘会占大部分的窗口看不到东西。配置完之后重启就可以查看。
```yml
live2d:
  enable: true
  scriptFrom: local
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: false
  debug: false
  model:
    use: live2d-widget-model-shizuku
  display:
    position: left
    width: 200
    height: 350
  mobile:
    show: false
  react:
    opacity: 0.8
```

<h1 id="amintion_conf">追番页设置</h1>

{% note default no-icon %}
追番这个不必多说，我想每个二次元都想展示自己的阅番战绩，我用的`Git`项目是[hexo插件结合B站和Bangumi](https://github.com/HCLonely/hexo-bilibili-bangumi)，项目有一个好处是不限制拉取的网站内容，有些番在B站没有，但是在Bangumi是有的，所以我这里选择的是Bangumi的数据源。不过这个前提是你必要要有一个番站记录地址，手动在网站配你自己看过的动漫番这样这个插件才会拉到你的内容。
拉取流程是本地安装插件，配置你的番站账号唯一键在配置文件里，设置你要拉取的数据源网站，之后执行拉取命令，这样会在你的`HEXO`项目中的`_source\_data`出现一些页面内容和`json`文件都是你自己设置已经看过的番，之后部署就可以看到你的追番信息。
![](HEXO搭载安知鱼主题/file-20250320214207986.png)
{% endnote %}

登录[Bangumi](https://bgm.tv/anime)点击右上角的注册，注册一个账号。
![](HEXO搭载安知鱼主题/file-20250320214307065.png)

搜索你看过，或者你正在看或者你想看的番名。这个支持降噪查询非常nice。
![](HEXO搭载安知鱼主题/file-20250320214656454.png)

点击收藏，出现几个按钮想看、看过、在看，根据自己的需求选择。
![](HEXO搭载安知鱼主题/file-20250320214808382.png)

这个记录评价就根据自己来看，总之就是要记录一个数据方便后面获取。
![](HEXO搭载安知鱼主题/file-20250320214846892.png)

收录完你自己的动漫番数据，就回到你的项目安装插件。
```shell
npm install hexo-bilibili-bangumi --save
```

安装完之后去到你的`_config.yml`文件配置信息
![](HEXO搭载安知鱼主题/file-20250320215028102.png)

以下是我本人的内容主要是定义数据源、定义名称，初始化展示的tab列表，还有我的bangumi账号id。
- 记得`enable`启用状态要打开。
- 修改`source`为`bgm`。
- 配置`order`排序支持`latest`(默认，按添加时间排序), `score`(评分升序), `-score`(评分降序)。
- `show`配置是初始化打开的窗口，`0: 想看`, `1: 在看`, `2: 看过`，默认为`1`
- `title`和`quote`在上面的文字展示
- 至于`cinema`和`game`这两个是动漫电影和动漫游戏有需求的可以根据GitHub项目的描述设置。
<font color="#ff0000">注意：`lazyload`这个配置一定要设置为`false`，因为涉及懒加载的问题。</font>

```yml
# 追番插件
# https://github.com/HCLonely/hexo-bilibili-bangumi
bangumi: # 追番设置
  enable: true
  source: bgm
  # bgmInfoSource: 'bgmv0'
  path:
  vmid: 971164
  title: '追番列表'
  quote: '呜呜呜，二次元很美好...呜呜呜'
  show: 2
  lazyload: false
  srcValue: '__image__'
  lazyloadAttrName: 'data-src=__image__'
  loading:
  showMyComment: false
  pagination: false
  metaColor:
  color:
  webp:
  progress:
  progressBar:
  extraOrder:
  order: latest
  # proxy:
  #   host: '代理host'
  #   port: '代理端口'
  extra_options:
    key: value
  coverMirror:
cinema: # 追剧设置
  enable: false
  path:
  vmid: 242466102
  title: '追剧列表'
  quote: '生命不息，追剧不止！'
  show: 2
  lazyload: false
  srcValue: '__image__'
  lazyloadAttrName: 'data-src=__image__'
  loading:
  metaColor:
  color:
  webp:
  progress:
  progressBar:
  extraOrder:
  order:
  extra_options:
    key: value
  coverMirror:
game: # 游戏设置，仅支持source: bgmv0
  enable: false
  path:
  source: bgmv0
  vmid:
  title: '游戏列表'
  quote: '生命不息，游戏不止！'
  show: 1
  lazyload: false
  srcValue: '__image__'
  lazyloadAttrName: 'data-src=__image__'
  loading:
  metaColor:
  color:
  webp:
  progress:
  progressBar:
  extraOrder:
  order:
  extra_options:
    key: value
  coverMirror:
```

获取你自己的bangumi的账号id，在bangumi页面开启`F12`输入一个`js`命令
![](HEXO搭载安知鱼主题/file-20250320215439007.png)

我用第一个命令没生效，最后选择的最后一个获取id的方式，获取的id复制到配置文件中的`vmid`配置
```js
//用户名
document.getElementById('header').getElementsByTagName('a')[0].getAttribute('href').split('/').at(-1)
//id
CHOBITS_UID
```
![](HEXO搭载安知鱼主题/file-20250320215638467.png)

配置完信息，执行拉取命令
```shell
# 更新追番数据
hexo bangumi -u
# 更新追剧数据
hexo cinema -u
# 删除清空追番数据
hexo bangumi -d
# 删除清空追剧数据
hexo cinema -d
```

![](HEXO搭载安知鱼主题/file-20250320220631214.png)

最后生成完数据可以去到自己的项目目录`source\_data`
![](HEXO搭载安知鱼主题/file-20250320220734221.png)

最后在`_config.anzhiyu.yml`配置文件中把你的追番页打开，重启项目即可看到你的战绩。
![](HEXO搭载安知鱼主题/file-20250320220831894.png)
# 全站搜索器

{% note default no-icon %}
搜索器是针对文章标题、内容等等做全局搜索，安装一个插件[hexo-generator-search](https://github.com/wzpan/hexo-generator-search)即可，做一个配置项就可以使用。
![](HEXO搭载安知鱼主题/file-20250320221233482.png)
{% endnote %}

安装插件
```shell
npm install hexo-generator-search --save
```

安装成功之后前往`_config.anzhiyu.yml`配置文件，搜索`local_search`，设置`enable: true`，重启即可使用。
![](HEXO搭载安知鱼主题/file-20250320221350874.png)

# 总结

{% note info no-icon %}
这部分的内容近期就到这里，后续有新的插件或者改动的地方会继续更新，安知鱼提供的主题还有很多很好玩的部分，包括音乐浮窗，文章尾部设置，打赏，充电等等修饰的小组件，不过需要对文档多查看一下，改动很简单，遇到问题也不要着急，这个主题结合`HEXO`框架还是非常简约的，因为本人比较喜欢简单点，就没有那么复杂，大家可以去安知鱼官网下的友链有很多小伙伴的博客做得非常帅气，大家也可以参数别人的设计和排版，如果自己没有博客页面设计灵感可以先看看别人的博客网站。
{% endnote %}