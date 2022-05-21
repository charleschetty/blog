---
date: 2022-03-31
title: 基本环境配置
---

简单记录一下自己的日常学习娱乐环境

包含archkde基本美化，以及相关配置推荐

![DwRl0.png](https://s1.328888.xyz/2022/05/19/DwRl0.png)

<!-- more -->

# 效果图

先上效果图：

![DwRl0.png](https://s1.328888.xyz/2022/05/19/DwRl0.png)

![DwkF3.png](https://s1.328888.xyz/2022/05/19/DwkF3.png)

![DwblB.png](https://s1.328888.xyz/2022/05/19/DwblB.png)

![DwVx2.png](https://s1.328888.xyz/2022/05/19/DwVx2.png)

使用了Arch Linux+KDE桌面，基本配置可参考：[archlinux简明指南](https://arch.icekylin.online/)，如果想使用图形化安装可以参考[archgui](https://archlinuxgui.in/)，如果使用其他发行版，此教程也有参考意义。

[效果视频](https://streamja.com/BOzOl)

我个人平时不太喜欢开动态桌面的，但耐不住他效果确实华丽，一般干活时候就换成了静态图片

## 桌面配置

全局使用[Nord](https://store.kde.org/p/1633675/)主题，我现在桌面顶栏和latte-dock都没有放，所有工作都是靠krun搜索，壁纸也是静态壁纸，但是这些东西还是都配置上了，~~为的是哪天装逼时候使用~~

#### kwin插件：

[forceblur](https://github.com/esjeon/kwin-forceblur)：顾名思义，强制开启模糊效果，例如你可以使用以下代码开启typora窗口的80%的半透明效果

```shell
bash 'for W in $(wmctrl -l |grep "Typora" |awk '"'"'{print $1}'"'"'); do xprop -id $W -format _NET_WM_WINDOW_OPACITY 32c -set _NET_WM_WINDOW_OPACITY $(printf 0x%x $((0xffffffff * 80 / 100))); done'
```

而如果使用foreceblur插件以后就会强制进行模糊处理。

[gridtiling](https://github.com/lingtjien/Grid-Tiling-Kwin)：平铺窗口插件，如果不习惯平铺请谨慎使用。


#### kde顶栏插件：

[Better inline clock](https://store.kde.org/p/1245902/)，Lock/Logout，[Weather Widget](https://store.kde.org/p/998917/)，[mcOS BC inline Bettery](https://store.kde.org/p/1402942/)，[Resource Monitor(fork)](https://store.kde.org/p/1527636/)，System Tray

#### latte-dock：

[mcOS Monterey](https://store.kde.org/p/1541181)

#### 动态壁纸：

首先安装依赖

```bash
sudo pacman -S gst-libav gst-plugins-bad gst-plugins-base gst-plugins-good gst-plugins-ugly
```

[SmartER Video Wallpaper](https://store.kde.org/p/1448924)

## 浏览器

我个人使用的是firefox和brave浏览器，原版chrome用不惯，firefox个人用的是第三方UI：[minimal-functional-fox](https://github.com/mut-ex/minimal-functional-fox)，代理工具使用[clash](https://github.com/Dreamacro/clash/wiki)和[tor](https://wiki.archlinux.org/title/Tor)。

Startpage：[Bento](https://github.com/migueravila/Bento)

插件：[Midnight Lizard](https://midnight-lizard.org/)，[SwitchyOmega](https://github.com/FelisCatus/SwitchyOmega)，[Tampermonkey](https://www.tampermonkey.net)，[Simple Translate](https://simple-translate.sienori.com/)

推荐油猴脚本：[搜索引擎优化](https://greasyfork.org/en/scripts/14178-ac-baidu-%E9%87%8D%E5%AE%9A%E5%90%91%E4%BC%98%E5%8C%96%E7%99%BE%E5%BA%A6%E6%90%9C%E7%8B%97%E8%B0%B7%E6%AD%8C%E5%BF%85%E5%BA%94%E6%90%9C%E7%B4%A2-favicon-%E5%8F%8C%E5%88%97)

![DwvT7.png](https://s1.328888.xyz/2022/05/19/DwvT7.png)


## 开发工具

我个人主要使用vscode进行开发，vim和kate偶尔会用，kate的话加lsp插件实验了一下还是不能作为ide使用，权当一个文本编辑器吧。Kate主题个人配置了nord。Qtcreator当时写qt用过，算是电脑上唯一的专用IDE。

### vscode

主题使用[Nord deep](https://marketplace.visualstudio.com/items?itemName=marlosirapuan.nord-deep)+[glassit-linux](https://marketplace.visualstudio.com/items?itemName=nowsci.glassit-linux)，外加vim插件

部分配置：

```json
{
    "workbench.colorTheme": "Nord Deep",
    "glassit-linux.opacity": 80,
    "editor.fontSize": 16,
    "workbench.iconTheme": "vscode-great-icons",
    "terminal.integrated.fontFamily": "MesloLGS NF",
    "editor.fontFamily": "JetBrains Mono",
    "editor.fontLigatures": true,
    "editor.codeLensFontFamily": "JetBrains Mono",
    "editor.minimap.enabled": false,
    "breadcrumbs.enabled": false,
    "workbench.statusBar.visible": false,
    "editor.renderWhitespace": "none",
    "C_Cpp.default.cppStandard": "c++17",
    "C_Cpp.default.cStandard": "c17",
    "security.workspace.trust.untrustedFiles": "open",
    "window.menuBarVisibility": "toggle",
    "rust-analyzer.experimental.procAttrMacros": false,
    "rust-analyzer.hoverActions.debug": false,
    "rust-analyzer.hoverActions.run": false,
    "rust-analyzer.inlayHints.enable": false,
    "rust-analyzer.inlayHints.renderColons": false,
    "rust-analyzer.hoverActions.implementations": false,
    "rust-analyzer.lens.implementations": false,
    "workbench.enableExperiments": false,
    "Lua.telemetry.enable": false,
    "editor.matchBrackets": "never",
    "http.proxy": "http://127.0.0.1:7890",
    "workbench.activityBar.visible": false,

}
```

### VIM

![Dw6NX.png](https://s1.328888.xyz/2022/05/19/Dw6NX.png)

![DwNfZ.png](https://s1.328888.xyz/2022/05/19/DwNfZ.png)

使用了[lvim](https://www.lunarvim.org/)，但是需要注意的是lvim上游插件有时候会出现问题，其中[Pocco81/DAPInstall.nvim](https://github.com/Pocco81/DAPInstall.nvim)干脆直接跑路了，导致没法使用<code>:DIInstall</code>不过好在有其他人fork了这个项目，自己调整之后也能使用。我遇到的第二个问题是cpp写代码适合老弹警告，google了一下发现是上游插件的问题。遇到这类问题基本先查一下issue和上游插件的issue都能解决。

另外默认lvim默认不带代码运行功能，我个人是使用了[sniprun](https://github.com/michaelb/sniprun)和[code runner](https://github.com/CRAG666/code_runner.nvim)。我以前是用的[spacevim](https://spacevim.org/)，同样是一个非常优秀的发行版，配置更加轻松，但lvim好处在于可定制性更强，而且效率更高。

config.lua

```lua

lvim.plugins = {
  { "andersevenrud/nordic.nvim" },
  { "shaunsingh/nord.nvim" },
  { "michaelb/sniprun", run = "bash ./install.sh" },
  { "CRAG666/code_runner.nvim", require = "nvim-lua/plenary.nvim",
    cmd = {
      'RunCode',
      'RunFile',
      'RunProject',
      'CRFiletype',
      'CRProjects'
    },
    config = function()
      require('code_runner').setup({

        term = {
          mode = "",
          tab = false,
          position = "belowright",
          size = 8
        },
        filetype = {
          java = "cd $dir && javac $fileName && java $fileNameWithoutExt",
          python = "cd $dir && python $fileName",
          rust = "cd $dir && rustc $fileName && $dir/$fileNameWithoutExt",
          javascript = "node",
          c = "cd $dir && gcc $fileName -o $fileNameWithoutExt && ./$fileNameWithoutExt",
          cpp = "cd $dir && g++ $fileName -o $fileNameWithoutExt && ./$fileNameWithoutExt",
        },
        project = {
          ["~/cpp/example"] = {
            name = "ExapleCpp",
            description = "Project with make file",
            command = "make buid & cd buid/ & ./compiled_file"
          }
        },
      })
    end
  },
}

lvim.lsp.automatic_servers_installation = true
local formatters = require "lvim.lsp.null-ls.formatters"
formatters.setup { { exe = "uncrustify", args = {} } }
vim.list_extend(lvim.lsp.automatic_configuration.skipped_servers, { "jsonls" })
local capabilities = vim.lsp.protocol.make_client_capabilities()
capabilities.offsetEncoding = { "utf-16" }
require("lspconfig").clangd.setup({ capabilities = capabilities })

```



### 终端

笔者使用zsh作为默认终端，zsh插件安装教程都可以在插件项目主页找到，所以不建议使用ohmyzsh，会降低效率

插件：[zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)，[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)

zshrc部分配置

```shell
alias n=neofetch

alias bty='for W in $(wmctrl -l |grep "Typora" |awk '"'"'{print $1}'"'"'); do xprop -id $W -format _NET_WM_WINDOW_OPACITY 32c -set _NET_WM_WINDOW_OPACITY $(printf 0x%x $((0xffffffff * 80 / 100))); done'
alias bqt='for W in $(wmctrl -l |grep "Qt Creator" |awk '"'"'{print $1}'"'"'); do xprop -id $W -format _NET_WM_WINDOW_OPACITY 32c -set _NET_WM_WINDOW_OPACITY $(printf 0x%x $((0xffffffff * 80 / 100))); done'
//半透明设置，需要安装wmctl

alias provpn='export all_proxy=http://127.0.0.1:7890 '
//代理

n
//开启终端显示neofetch
```

终端主题：[p10k](https://github.com/romkatv/powerlevel10k)，注意按照教程配置字体，否则无法正常显示

![DwS0C.png](https://s1.328888.xyz/2022/05/19/DwS0C.png)

我自己常用终端是konsole和[alacritty](https://alacritty.org/)，konsole自带主题nord，alacritty配置如下：

alacritty.yaml

```yaml
# Colors (Nord)
colors:
   primary:
     background: '#2E3440'
     foreground: '#D8DEE9'

   # Normal colors
   normal:
     black:   '#3B4252'
     red:     '#BF616A'
     green:   '#A3BE8C'
     yellow:  '#EBCB8B'
     blue:    '#81A1C1'
     magenta: '#B48EAD'
     cyan:    '#88C0D0'
     white:   '#E5E9F0'

   # Bright colors
   bright:
     black:   '#4C566A'
     red:     '#BF616A'
     green:   '#A3BE8C'
     yellow:  '#EBCB8B'
     blue:    '#81A1C1'
     magenta: '#B48EAD'
     cyan:    '#8FBCBB'
     white:   '#ECEFF4'

window:
  opacity: 0.8

```


## 阅读写作

#### 阅读：

笔者使用[zathura](https://pwmt.org/projects/zathura/)作为默认阅读器，[okular](https://apps.kde.org/okular/)作为备用阅读器，后者自己把color mode调整成nord配色。

zathurarc：

```shell
set selection-clipboard clipboard
set recolor true

set recolor-darkcolor "rgba(236, 239, 244, 0.8)"
set default-bg "rgba(35, 39, 49, 0.6)"
#set recolor-lightcolor "rgba(39, 43, 49, 0.7)"
set recolor-lightcolor "rgba(35, 39, 49, 0.5)"
set guioptions ""
```

推荐配合[wudao词典](https://github.com/ChestnutHeng/Wudao-dict)，<code>set selection-clipboard clipboard</code>设置了默认选中进行复制，而wudao是比较方便的命令行词典，可以直接复制进终端进行查询

![DwEG1.png](https://s1.328888.xyz/2022/05/19/DwEG1.png)

#### 写作：

markdown：使用[typora](https://typora.io/)+[picgo](https://picgo.github.io/PicGo-Doc/en/)，具体可以参考[typora](https://support.typora.io/Upload-Image/)官方文档，主题使用[nord](https://theme.typora.io/theme/Nord/)。

word，ppt：的使用[libreoffice](https://www.libreoffice.org/)全家桶

latex：依然使用vscode，偶尔用[texstudio](http://texstudio.sourceforge.net/)。

## 其他使用的软件和配置

#### 输入法：

个人使用[fcitx5](https://fcitx-im.org/wiki/Fcitx_5)作为输入法，主题使用[fcitx5-nord](https://github.com/ayamir/fcitx5-nord)。

![DwPtt.png](https://s1.328888.xyz/2022/05/19/DwPtt.png)

 #### bt下载：

使用[deluge](https://www.deluge-torrent.org/)和[qbittorrent](https://www.qbittorrent.org/)，使用tracker：[trackerslist](https://ngosang.github.io/trackerslist/)。

![D3QxO.png](https://s1.328888.xyz/2022/05/19/D3QxO.png)

#### 图像影音：

图像处理使用[GIMP](https://www.gimp.org/)，看图使用[Gwenview](https://userbase.kde.org/Gwenview)，影像处理使用[Kdenlive](https://kdenlive.org)，视频播放器使用[VLC](https://www.videolan.org/)，屏幕录制使用[OBS](https://obsproject.com/)。

#### 网盘：

使用[阿里云盘+webdav](https://github.com/messense/aliyundrive-webdav)，好处是免费，不限速，容量大，如果手头有带宽合适服务器更加方便，我服务器带宽不行，就本地运行了。

![D3uTP.png](https://s1.328888.xyz/2022/05/19/D3uTP.png)

#### RSS：

使用自建[RSShub](https://docs.rsshub.app/en/install/#docker-image)+[feed43](https://feed43.com/)进行同步，阅读器使用[easyrss](https://github.com/arguablykomodo/easy-rss)+[feeder](https://github.com/spacecowboy/Feeder)+[newsflash](https://gitlab.com/news-flash/news_flash_gtk)，feed43可以参考[官方教程](https://feed43.com/step-by-step.html)。如果手头没有服务器自建RSShub可以参考[这篇教程](https://www.runningcheese.com/rss-subscriptions)。

本站rss见底部链接，或者使用[github官方rss](https://github.com/charleschetty/blog/commits.atom)。(注：head标签里面rss不能用，目前没找到解决方案)

 #### 社交娱乐：

疼讯软件：qq使用[Icalingua++](https://github.com/Icalingua-plus-plus/Icalingua-plus-plus)，微信我个人电脑上没有安装，aur里面[wechat-uos](https://aur.archlinux.org/packages/wechat-uos)看起来比较火，[腾讯会议](https://aur.archlinux.org/packages/wemeet-bin)官方支持linux。

![D3yNm.png](https://s1.328888.xyz/2022/05/19/D3yNm.png)

音乐：个人使用网易第三方：[yesplaymusic](https://github.com/qier222/YesPlayMusic)。

游戏：[steam](https://archlinux.org/packages/multilib/x86_64/steam/)官方支持linux，支持的游戏可以在[protondb](https://www.protondb.com/)上找，proton我个人尝试郭GTA5，除了我个人设备没独立显卡无法流畅运行外没啥3毛病，像csgo，我的世界等原生支持linux的游戏自然没啥问题。

#### 其他：

虚拟机使用开源的[virtualbox](https://www.virtualbox.org/)，最近打算换成kvm+qemu+[Quickemu](https://github.com/quickemu-project/quickemu)

安卓链接使用[scrcpy](https://github.com/Genymobile/scrcpy)，虚拟机使用[genymotion](https://www.genymotion.com/)。

启动盘刻录使用[balenaetcher](https://www.balena.io/etcher/)，~~修复~~使用[gparted](https://gparted.org)。

## 安卓配置

#### 阅读：

阅读：[ReadEra](https://play.google.com/store/apps/details?id=org.readera)，词典：[欧陆词典](https://play.google.com/store/apps/details?id=com.qianyan.eudic)，推荐这两个原因是可以比较好的适配，而且没有广告。

![D3giA.jpg](https://s1.328888.xyz/2022/05/19/D3giA.jpg)

#### 终端：

使用[termux](https://termux.com/)，我用这个连ssh写代码。实验了下[proot-distro](https://github.com/termux/proot-distro)，配上vnc理论上可以开启图形界面，但我实验以下效果并不理想。使用纯tty界面用gcc编译helloworld用了1.5秒，而且rust用起来会有问题，所以还是别搞这东西了，老老实实用ssh吧

#### 设备互联：

使用[kdeconnect](https://kdeconnect.kde.org/)，不得不说KDE家软件相当不错，Kate，dolphin等都是极品。

