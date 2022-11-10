---
date: 2022-03-31
title: 基本环境配置
tags:
- linux
description: 简单记录一下自己的日常学习娱乐环境
---
# 基本环境配置

这篇文章可以配合[另一篇文章](https://charleschetty.github.io/blog/posts/Untitled.html)使用。目前对于安卓刷机比较麻烦，像我的平板打算刷lineageos，结果没人适配，只能作罢。路由器打算刷openwrt，不过这台华为路由肯定不行，等换小米吧。

## 桌面配置

### Kde

![1](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/Screenshot_20220331_224520.png)

![2](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/Screenshot_20220331_224335.png)

![3](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/Screenshot_20220331_224720.png)

![4](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/Screenshot_20220331_225443.png)

效果可以看一下我以前[某乎回答]([某乎回答](https://www.zhihu.com/question/325087410/answer/2232414895)，)后面一段,可以看一下[效果视频](https://streamja.com/BOzOl)，我个人平时不太喜欢开动态桌面的，现在kde也不用了，换成了i3wm。

全局使用[Nord](https://store.kde.org/p/1633675/)主题，我现在桌面顶栏和latte-dock都没有放，所有工作都是靠krun搜索，壁纸也是静态壁纸，但是这些东西还是都配置上了，~~为的是哪天装逼时候使用~~

kwin插件：[forceblur](https://github.com/esjeon/kwin-forceblur)，[gridtiling](https://github.com/lingtjien/Grid-Tiling-Kwin)


kde顶栏插件：[Better inline clock](https://store.kde.org/p/1245902/)，[Weather Widget](https://store.kde.org/p/998917/)，[mcOS BC inline Bettery](https://store.kde.org/p/1402942/)，[Resource Monitor(fork)](https://store.kde.org/p/1527636/)

latte-dock：[mcOS Monterey](https://store.kde.org/p/1541181)

动态壁纸：使用[SmartER Video Wallpaper](https://store.kde.org/p/1448924)，需要安装依赖

```bash
sudo pacman -S gst-libav gst-plugins-bad gst-plugins-base gst-plugins-good gst-plugins-ugly
```

### i3wm

我个人参考了三份配置：[ayamir/i3-dotfiles](https://github.com/ayamir/i3-dotfiles)，[dikiaap/dotfiles](https://github.com/dikiaap/dotfiles)，[denisse-dev/dotfiles](https://github.com/denisse-dev/dotfiles)，配置放在[仓库](https://github.com/charleschetty/dotfile)里。我个人不喜欢花哨的效果，如果不是因为看视频画面会撕裂，我自己连picom都不会开，基本外出就会把picom关掉，开视频啥的再打开。

![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/Screenshot_20220824_212349.png)

i3wm网上中文资料很少，要搜linux桌面那基本会出来大量的ubuntu+gnome，或者manjaro+kde这种，自然的，DE的确适合新手，我也不建议一上来就搞wm，等用到wm的时候，也基本用不到什么教程了，基本都是看着别人配置改，然后去依赖仓库看文档。

### gnome

我当时在某乎写了个[回答](https://www.zhihu.com/question/325087410/answer/2232414895)，不过现在帐号注销了，半年不用gnome，里面那些插件也不知道现在更不更新。

## 浏览器

我个人使用的是firefox和brave浏览器，原版chrome用不惯，firefox个人用的是第三方UI：[minimal-functional-fox](https://github.com/mut-ex/minimal-functional-fox)，代理工具使用[clash](https://github.com/Dreamacro/clash/wiki)和[tor](https://wiki.archlinux.org/title/Tor)。

![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/Screenshot_20220824_212658.png)

Startpage：[Bento](https://github.com/migueravila/Bento)

插件：[Midnight Lizard](https://midnight-lizard.org/)，[SwitchyOmega](https://github.com/FelisCatus/SwitchyOmega)，[Tampermonkey](https://www.tampermonkey.net)，[Simple Translate](https://simple-translate.sienori.com/)

推荐油猴脚本：[搜索引擎优化](https://greasyfork.org/en/scripts/14178-ac-baidu-%E9%87%8D%E5%AE%9A%E5%90%91%E4%BC%98%E5%8C%96%E7%99%BE%E5%BA%A6%E6%90%9C%E7%8B%97%E8%B0%B7%E6%AD%8C%E5%BF%85%E5%BA%94%E6%90%9C%E7%B4%A2-favicon-%E5%8F%8C%E5%88%97)


## 开发工具

我个人主要使用neovim进行开发，vscode以前是主力，自从配好nvim以后就没怎么用。vim和kate偶尔会用，kate的话加lsp插件实验了一下还是不能作为ide使用，权当一个文本编辑器吧。Kate主题个人配置了nord。Qtcreator当时写qt用过，算是电脑上唯一的专用IDE。

### vscode

个人使用主题：[glassit-linux](https://marketplace.visualstudio.com/items?itemName=nowsci.glassit-linux)，[nord](https://github.com/arcticicestudio/nord-visual-studio-code)，外加vim插件，配置可以在我的[仓库](https://github.com/charleschetty/dotfile)找到。

![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/Screenshot_20220824_213924.png)

### VIM

![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/Screenshot_20220824_213002.png)

目前使用neovim+[neovide](https://github.com/neovide/neovide)，配置都在仓库里，参考了lvim作者的[教程](https://github.com/LunarVim/Neovim-from-scratch)，他配套有个视频，b站有[搬运](https://www.bilibili.com/video/BV1QL4y147VD?spm_id_from=333.337.search-card.all.click)，不过后面部作者没出视频，自己对照插件文档基本也能改。vim我自己作为备选项，配置同样放在仓库里，但是没有代码补全功能，仅作为一个备用文本编辑器使用，配置参考[vimplus](https://github.com/chxuan/vimplus)。

至于说vim难用这个问题，我一开始也这么觉得，后来学习了之后把所有编辑器都装上fake vim，关于快捷键难记的问题，其实不然，可以参考一下这篇[文章](https://www.zhihu.com/question/437735833/answer/1733228460)，同问题下的高赞写的也不错，还有一篇相对系统的[文章](https://zhuanlan.zhihu.com/p/68111471)，基本你花点时间把这三篇看完就没啥问题，vim我个人感觉，一个无法替代的是宏录制功能，fakevim我自己没见过有支持的。

如果说你确实不想自己配置，我自己用过两个发行版，[spacevim](https://github.com/SpaceVim/SpaceVim)，和[lvim](https://www.lunarvim.org/)，还有同类项目[nvchd](https://nvchad.github.io/)，不过我个人没有用过。lvim默认不带代码运行功能，我个人是使用了[sniprun](https://github.com/michaelb/sniprun)和[code runner](https://github.com/CRAG666/code_runner.nvim)。我以前是用的[spacevim](https://spacevim.org/)，同样是一个非常优秀的发行版，配置更加轻松，但lvim好处在于可定制性更强，而且效率更高。

### 终端

笔者使用zsh作为默认终端，zsh插件安装教程都可以在插件项目主页找到，所以不建议使用ohmyzsh，会降低效率，插件：[zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)，[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)，zshrc可在在[仓库](https://github.com/charleschetty/dotfile)找到。

![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/Screenshot_20220824_214239.png)

终端主题：[p10k](https://github.com/romkatv/powerlevel10k)，注意按照教程配置字体，否则无法正常显示

我自己常用终端是[alacritty](https://alacritty.org/)，konsole自带主题nord，alacritty配置可以在[仓库](https://github.com/charleschetty/dotfile)找到。

我目前把很多终端程序都换成了rust替代品，可以看一下我的zshrc，本人rust粉，但你要我自己写那就不型了，目前还在学习，打算把cpp，rust，python当作三门主力语言。neofetch主题用的[neofetch-theme](https://github.com/Chick2D/neofetch-themes)

fish的话作为一个备选，prompt用的[starship](https://starship.rs/)。


## 阅读写作

#### 阅读：

笔者使用[zathura](https://pwmt.org/projects/zathura/)作为默认阅读器，[okular](https://apps.kde.org/okular/)作为备用阅读器，后者自己把color mode调整成nord配色。zathurarc可以在[仓库](https://github.com/charleschetty/dotfile)找到。

推荐配合[wudao词典](https://github.com/ChestnutHeng/Wudao-dict)，<code>set selection-clipboard clipboard</code>设置了默认选中进行复制，而wudao是比较方便的命令行词典，可以直接复制进终端进行查询

![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/Screenshot_20220824_214606.png)

#### 写作：

markdown：使用[typora](https://typora.io/)+[picgo](https://picgo.github.io/PicGo-Doc/en/)，具体可以参考[typora](https://support.typora.io/Upload-Image/)官方文档，主题使用[nord](https://theme.typora.io/theme/Nord/)。

![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/Screenshot_20220824_214651.png)

word，ppt：的使用[libreoffice](https://www.libreoffice.org/)全家桶

latex：neovim+lsp。

## 其他使用的软件和配置

#### 输入法：

个人使用[fcitx5](https://fcitx-im.org/wiki/Fcitx_5)+[四叶草](https://github.com/fkxxyz/rime-cloverpinyin)和[双拼](https://github.com/rime/rime-double-pinyin)作为输入法，主题使用[fcitx5-nord](https://github.com/ayamir/fcitx5-nord)。

![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/127147288-372b2a8b-59ff-47be-9f60-274b12361c8c.png)

 #### bt下载：

![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/Screenshot_20220519_003855.png)

使用[deluge](https://www.deluge-torrent.org/)和[qbittorrent](https://www.qbittorrent.org/)，使用tracker：[trackerslist](https://ngosang.github.io/trackerslist/)。

#### 图像影音：

图像处理使用[GIMP](https://www.gimp.org/)，看图使用[ristretto](https://docs.xfce.org/apps/ristretto/start) ，影像处理使用[shotcut](https://www.shotcut.org/)，视频播放器使用[VLC](https://www.videolan.org/)，屏幕录制使用[OBS](https://obsproject.com/)。

![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/Screenshot_20220824_215134.png)

#### 网盘：

使用[阿里云盘+webdav](https://github.com/messense/aliyundrive-webdav)，好处是免费，不限速，容量大，如果手头有带宽合适服务器更加方便，我服务器带宽不行，就本地运行了。

![shu](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/Screenshot_20220402_230620.png)

#### RSS：

使用自建[RSShub](https://docs.rsshub.app/en/install/#docker-image)+[feed43](https://feed43.com/)进行同步，阅读器使用[easyrss](https://github.com/arguablykomodo/easy-rss)+[feeder](https://github.com/spacecowboy/Feeder)+[newsflash](https://gitlab.com/news-flash/news_flash_gtk)，feed43可以参考[官方教程](https://feed43.com/step-by-step.html)。如果手头没有服务器自建RSShub可以参考[这篇教程](https://www.runningcheese.com/rss-subscriptions)。

本站rss见底部链接，或者使用[github官方rss](https://github.com/charleschetty/blog/commits.atom)。(注：head标签里面rss不能用，因为目前还没有配置)

 #### 社交娱乐：

疼讯软件：qq使用[Icalingua++](https://github.com/Icalingua-plus-plus/Icalingua-plus-plus)，微信我个人电脑上没有安装，aur里面[wechat-uos](https://aur.archlinux.org/packages/wechat-uos)看起来比较火，[腾讯会议](https://aur.archlinux.org/packages/wemeet-bin)官方支持linux。我平时不用qq,weixin，这个基本也就是传文件时候用，平时tg/lark/matrix。

![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/Screenshot_20220824_215218.png)

音乐：个人使用网易第三方：[yesplaymusic](https://github.com/qier222/YesPlayMusic)。和[NeteaseCloudMusicGtk4](https://github.com/gmg137/netease-cloud-music-gtk)。

![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/Screenshot_20220824_215833.png)

游戏：[steam](https://archlinux.org/packages/multilib/x86_64/steam/)官方支持linux，支持的游戏可以在[protondb](https://www.protondb.com/)上找，proton我个人尝试郭GTA5，除了我个人设备没独立显卡无法流畅运行外没啥3毛病，像csgo，我的世界等原生支持linux的游戏自然没啥问题。

#### 其他：

虚拟机使用kvm+qemu+[Quickemu](https://github.com/quickemu-project/quickemu)/[virt-manager](https://virt-manager.org/)，和[virtualbox](https://www.virtualbox.org/)，

![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/Screenshot_20220824_220336.png)

安卓链接使用[scrcpy](https://github.com/Genymobile/scrcpy)，虚拟机使用[genymotion](https://www.genymotion.com/)。

启动盘刻录使用[balenaetcher](https://www.balena.io/etcher/)，~~修复~~使用[gparted](https://gparted.org)。

远程控制使用[rustdesk](https://rustdesk.com/)

## 安卓配置

#### 阅读：

阅读：[ReadEra](https://play.google.com/store/apps/details?id=org.readera)，词典：[欧陆词典](https://play.google.com/store/apps/details?id=com.qianyan.eudic)，推荐这两个原因是可以比较好的适配，而且没有广告。

![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/Screenshot_2022-04-01-00-33-59-0104999310.jpg)

#### 终端：

使用[termux](https://termux.com/)，我用这个连ssh写代码。实验了下[proot-distro](https://github.com/termux/proot-distro)，配上vnc理论上可以开启图形界面，但我实验以下效果并不理想。使用纯tty界面用gcc编译helloworld用了1.5秒，而且rust用起来会有问题，所以还是别搞这东西了，老老实实用ssh吧

#### 设备互联：

使用[kdeconnect](https://kdeconnect.kde.org/)，不得不说KDE家软件相当不错，Kate，dolphin等都是极品。

#### root工具：

使用通用的[magisk](https://github.com/topjohnwu/Magisk)，不得不说安卓这块比电脑端麻烦的多。

