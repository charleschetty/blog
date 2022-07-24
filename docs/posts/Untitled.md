---
date: 2022-07-23
title: Arch基本使用
---

Arch Linux + i3wm 基本环境配置

<!-- more -->

# Arch Linux 基本使用

目前arch linux 出了一个[archinstall](https://wiki.archlinux.org/title/Archinstall_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))，可以很大程度上方便用户安装，如果你还觉得不太适合，可以使用[archgui](https://github.com/arch-linux-gui)，但我个人建议还是使用原版arch。如果喜欢纯命令行安装，可以参考[这个](https://arch.icekylin.online/)。我这个教程按照archinstall从头安装。

网上教程很多，那位什么我还要写这样一个教程，对于我自己来说，一方面做一个记录，一方面我写文章时候刚学了双拼输入法，这篇文章就是练手，本文全部是在双拼输入法下完成。如果对于读者有什么帮助，我自然是不胜欢喜。

如果你从没接触过linux，我不建议你从arch 入手，推荐manjaro,opensuse之类的发行版，但像ubuntu，他唯一的好处在于网上资料多，作为桌面发行版，个人不推荐。我这里假设你接触过其他linux发行版，不是零基础，否则你应该先去看一下[这个材料](https://101.lug.ustc.edu.cn/)。

这篇教程不会有任何图片附加，延续archwiki的风格。安装在kvm/qemu下完成，所以可能不会完全于实体机一样。**在敲命令之前确保你了解你在做什么**，必要时候请参阅[archwiki](https://wiki.archlinux.org/)和相关软件仓库。

启动盘烧录可以使用[balena](https://www.balena.io/etcher/)，完整操作参考[这个](https://arch.icekylin.online/rookie/pre-install.html)，这个教程非常不错，推荐收藏。

## 基本桌面安装

进去系统，首先禁用`reflector`服务，不然他每次都会自己更新镜像源。

```shell
systemctl stop reflector.service
```

而后测试网络环境，如果你是有线链接，那么应该就会有网，如果是无线网络，需要手动开启网络

```shell
iwctl # 进入交互式命令行
device list # 列出无线网卡设备名，比如无线网卡看到叫 wlan0
station wlan0 scan # 扫描网络
station wlan0 get-networks # 列出所有 wifi 网络
station wlan0 connect wifi-name # 进行连接，注意这里无法输入中文。回车后输入密码即可
exit # 连接成功后退出
```

如果发现找不到设备，可能是你网卡没有驱动，需要使用有线网络安装。

测试一下网络连通性，如果没问题可以继续下面步骤。

```shell
ping www.baidu.com
```

首先更换镜像源

```shell
vim /etc/pacman.d/mirrorlist
```

可以全部删掉，替换成[科大镜像源](https://mirrors.ustc.edu.cn/help/archlinux.html)或[清华源](https://mirrors.tuna.tsinghua.edu.cn/help/archlinux/)，然后更新软件包索引，保证你一会下载速度够快

```shell
pacman -Syy
```

而后开始安装。

```
archinstall
```

这里依次选择就可，和图形化安装没啥区别，但注意一点，文件系统推荐传统ext4格式，原因是[archwiki](https://wiki.archlinux.org/title/Btrfs)上显示btrfs某些功能不稳定，这里不建议选择。个人没有单独home分区，这个看你自己选择。自己用户默认给su权限，可以避免后续麻烦。可以最小安装，或者也可选桌面和xorg安装，我这选xorg安装。驱动的话amd/intel选开源驱动，英伟达选专有驱动。音频的话都可，我更推荐pipewire。网络选择networkmanager。时区选择上海。

重启之后就应该看到界面了，这时候得重新设置一下`mirrorlist`，可以看一下系统基本信息

```shell
sudo pacman -Syyu neofetch
neofetch
```

如果是无线网，输入`nmtui`，而后链接就可。

首先安装微码

```shell
sudo pacman -S intel-ucode # Intel
sudo pacman -S amd-ucode # AMD
```

而后设置locale

```
vim /etc/locale.gen
```

去掉`zh_CN.UTF-8 UTF-8` 前的注释符号，至于en_us，前面已经设置了语言，这就自动添加了，如果没vim先安装vim，而后生成locale

```shell
sudo locale-gen
```

而后安装基本环境

```shell
sudo pacman -S alacritty ＃终端
sudo pacman -S i3-gaps　＃i3-gaps
sudo pacman -S rofi		＃起动器
sudo pacman -S polybar　　#顶栏
sudo pacman -S sddm     #dm,你也可以用lightdm
```

然后开启sddm

```shell
sudo systemctl enable sddm
sudo systemctl start sddm
```

这时候你应该就看到登录界面了，登录以后先选默认设置，而后按下win+enter，就能看见终端了。

现在来看一下配置

```shell
cd ~/.config/i3
vim config
```

对照注释都能看懂，先把他上面的依赖全装好，不建议你照搬下面代码，而是你自己对着每行查[arch](https://archlinux.org/packages/)把包装好，如果有可选安装项可以自己看情况安装，像`python-pip`啥的就顺便装上就行。

```shell
sudo pacman -S i3status　dex adobe-source-code-pro-fonts xss-lock network-manager-applet
```

在`pactl`处，这是PulseAudio工具，我前面用了pipewire，你可以参考[archwiki](https://wiki.archlinux.org/title/PipeWire#PulseAudio_clients)使用。弄完以后重启，不出意外你的所有组件都可以正常使用了。

接下来安装基本桌面环境

```shell
sudo pacman -S ntfs-3g # 使系统可以识别 NTFS 格式的硬盘
sudo pacman -S adobe-source-han-serif-cn-fonts wqy-zenhei # 安装几个开源中文字体。一般装上文泉驿就能解决大多 wine 应用中文方块的问题
sudo pacman -S dolphin thunar #文件管理工具
sudo pacman -S noto-fonts noto-fonts-cjk noto-fonts-emoji noto-fonts-extra # 安装谷歌开源字体及表情
sudo pacman -S firefox chromium # 安装常用的火狐、chromium 浏览器
sudo pacman -S ark # 压缩软件。在 dolphin 中可用右键解压压缩包
sudo pacman -S gwenview # 图片查看器
sudo pacman -S vlc #视频播放器
sudo pacman -S libreoffice-still #office组件，不推荐wps，原因是会读取并锁住你本地数据，非必要不用
sudo pacman -S zathura zathura-djvu zathura-pdf-mupdf okular #基本阅读器
```

而后重启，然后开启aur支持，这里推荐[paru](https://aur.archlinux.org/packages/paru/)和[yay](https://aur.archlinux.org/packages/yay/)，对照相应项目github主页教程安装。我这就以yay为例。由于yay用的是谷歌家的go，这大概率有网络问题，如果无法解决网络问题，可以先使用rust编写的paru

```shell
mkdir Sourcefile &&cd Sourcefile
pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

如果要装rust，推荐去rustup官网安装

``` SHELL
sudo pacman -S wget curl #下载工具
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

到这先停一步，去把起动器换成rofi

```shell
vim ~/.config/i3/config
bindsym $mod+d exec --no-startup-id rofi -show drun #win+d可以启动rofi
```

而后把rofi的drun打开，现在你就可以愉快的用rofi启动程序了。

```shell
cd ~/.config && mkdir rofi && cd rofi
vim config.rasi 
configuration {
  show-icons:         true;
  modi: "window,drun,ssh,run";
}
```

而后安装输入法，这里推荐rime，个人基于fcitx5安装

```shell
sudo pacman -S fcitx5 fcitx5-qt fcitx5-gtk fcitx5-configtool fcitx5-rime
```

而后写入用户环境变量

```shell
vim ~/.pam_environment
INPUT_METHOD DEFAULT=fcitx5
GTK_IM_MODULE DEFAULT=fcitx5
QT_IM_MODULE DEFAULT=fcitx5
XMODIFIERS DEFAULT=\@im=fcitx5
SDL_IM_MODULE DEFAULT=fcitx
```

现在在i3配置中添加一行启动fcitx5

```shell
 exec_always --no-startup-id fcitx5
```

而后打开fcitx5-configtool，把rime添加进去，作为默认输入法，重启。到目前为止，电脑虽说简陋，但已经能用了，不过我认为还得有网络和蓝牙管理。我使用两个项目，[Networkmanager-dmenu](https://github.com/firecat53/networkmanager-dmenu)和[rofi-bluetooth](https://github.com/nickclyde/rofi-bluetooth)。

```shell
paru -S rofi-bluetooth-git networkmanager-dmenu-git
```

而后在i3配置里添加快捷键

```shell
bindsym $mod+b exec --no-startup-id rofi-bluetooth 
bindsym $mod+n exec --no-startup-id networkmanager_dmenu
```

但networkmanager-dmenu默认是用dmenu，得配置成rofi，当然，你也可以使用dmenu，安装即可。

```shell
mkdir networkmanager-dmenu &&cd networkmanager-dmenu
vim config.ini

[dmenu]
dmenu_command = rofi -dmenu -l 10
```

## 进一步配置

### 桌面

上面仅仅配置了基本的桌面环境，应该也没人就这么使用，再进一步搞一下，这里用到我[个人配置](https://github.com/charleschetty/dotfile)，你可以进行更改。

上来先分来几个文件夹，方便以后用

```shell
mkdir Doucments Music Pictures Downloads
```

而后进一步配置i3wm，如果github访问速度有问题，可以使用[代理加速](https://ghproxy.com/)，但你最好有自己的代理手段。

```shell
paru -S betterlockscreen xautolock #锁屏工具
paru -S spectacle #截屏工具
paru -S light #调节屏幕亮度
paru -S feh #壁纸工具
paru -S picom #混成器
git clone https://github.com/charleschetty/dotfile ＃我的配置
```

而后按照betterlockscreen的github教程设置壁纸，然后把我的betterlockscreenrc 复制到config里，顺带把picom，zathura，neofetch，alacritty，polybar，rofi全放进去，最后把i3配置放进去。重启，调整一下壁纸设置就可以了。

对于picom，如果要开启blur特效，需要启用`--experimental-backends`，这可以在我i3配置里看到，我自己配置了两个picom配置，你可以选择性开启，具体配置可以参考picom官方文档。

polybar可能有组件无法显示，参看polybar的[githubwiki](https://github.com/polybar/polybar/wiki)进行更改，进到polybar里`sh launch.sh`，而后查看哪些模块没有启动，对应更改。

对于rofi字体问题，得安装[nerd-font](https://github.com/ryanoasis/nerd-fonts)，去aur下搜流行度排名前几的安装就行。对于polybar字体问题，我参考的是[polybartheme](https://github.com/adi1090x/polybar-themes)的配置，把他几个字体安装上就可，这得手动安装。

### 终端

```shell
paru -S zsh fish
```

我个人平时使用zsh，fish偶尔会用，首先安装zsh插件

```shell
paru -S zsh-fast-syntax-highlighting  zsh-autocomplete  zsh-completions autojump
```

而后对照我的zshrc配置添加进去，而后把zsh换成默认终端即可

```shell
vim ~/.zshrc
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
source /usr/share/autojump/autojump.zsh
HISTFILE=$HOME/.zsh_history
HISTSIZE=5000
SAVEHIST=5000
setopt appendhistory
setopt appendhistory
setopt INC_APPEND_HISTORY
setopt SHARE_HISTORY
```

我个人把一些常用命令全换成rust版本，至于gotop的话个人目前不用，换成bottom，但依然再zshrc里，这里面这些命令**你都应当去相应github主页看一眼**。

```shell
paru -S lsd exa #ls替代
paru -S zoxide #cd替代
paru -S dust procs #du ps 替代
paru -S bottom gotop　#top替代
paru -S fd fzf　#文件查找
paru -S bat ripgrep #cat grep替代
paru -S tealdeer　#tldr
```

而后安装[powerlevel10k](https://github.com/romkatv/powerlevel10k)，我自己仓库里有一个更改里配色的p10k.zsh，可以直接复制过去。

```shell
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/.powerlevel10k
echo 'source ~/.powerlevel10k/powerlevel10k.zsh-theme' >>~/.zshrc
```

我自己使用的另一个prompt是[starship](https://starship.rs/)，你可以对照官方教程进行安装。对于fish我作为一个备选，配置在我的仓库里有，与zsh基本一致，可能后面有些命令没alias，对照自己更改即可。

而后配置ranger，把我的配置放进config里，按f可以搜索文件。

```shell
paru -S ranger 
paru -S w3m #用来预览图片
```

对于字典，可以选用[无道词典](https://github.com/ChestnutHeng/Wudao-dict)，我自己大二时候用，现在基本不怎么用了。我自己把zathura设置成了选中复制，如果你需要剪贴板管理工具，可以使用copyq,而后在i3配置里添加。而后如果你看书，文献有什么不认识的词汇，直接选中，粘贴到终端即可。

```shell
paru -S copyq
exec --no-startup-id copyq
```

对于vim/neovim配置，我个人是把vim作为一个编辑器，neovim写代码，我的配置都放在仓库里，对于vim，你可以直接安装[vim-plugin](https://github.com/junegunn/vim-plug)，而后复制我的配置，安装即可。

```shell
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
cp $mydotfile/vim/vimrc ~/.vimrc
:PlugInstall
```

对于neovim，我自己是参考[这个项目](https://github.com/LunarVim/Neovim-from-scratch)进行配置，**我不推荐你直接用我的配置**，原因是没有文档，你装上也没法用，应该看考源文档您行配置，b站人搬运了[相关视频](https://www.bilibili.com/video/BV1QL4y147VD?spm_id_from=333.337.search-card.all.click)，可以进行参考。如果你确实不想自己配置，可以使用[lunarvim](https://github.com/LunarVim)或者[nvchad](https://nvchad.github.io/)。对于代码运行，我使用[code-runner](https://github.com/CRAG666/code_runner.nvim)，你可以对应安装，我的配置在nvim里可以找到。个人使用[neovide](https://github.com/neovide/neovide)做客户端。

### 输入法配置

我自己使用的是[四叶草](https://github.com/fkxxyz/rime-cloverpinyin)和[双拼](https://github.com/rime/rime-double-pinyin)，主题用法的是[nord](https://github.com/tonyfettes/fcitx5-nord)。

```shell
git clone https://github.com/tonyfettes/fcitx5-nord.git
mkdir -p ~/.local/share/fcitx5/themes/
cd fcitx5-nord
cp -r Nord-Dark/ Nord-Light/ ~/.local/share/fcitx5/themes/
vim ~/.config/fcitx5/conf/classicui.conf #选主题即可
```

而后安装四叶草输入法

```shell
paru -S rime-cloverpinyin
```

而后再`.local/share/fcitx5/rime`下创建default.custom.yaml 

```
patch:
  "menu/page_size": 8
  schema_list:
    - schema: clover
```

至于双拼输入法，首先安装[东风破](https://github.com/rime/plum.git)

```shell
git clone --depth 1 https://github.com/rime/plum.git
cd plum
rime_frontend=fcitx5-rime bash rime-install   
rime_frontend=fcitx5-rime bash rime-install double-pinyin 
```

而后再配置加一条

```shell
- schema: double_pinyin_flypy #小鹤双拼
```

词库配置可以参考官方文档，四叶草输入法也有相关教程，我的rime词库可以在仓库找到

### 防火墙，tlp，回滚

我个人使用[firewalld](https://wiki.archlinux.org/title/Firewalld_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))作为防火墙，你可以使用其他防火墙，比如ufw

```shell
paru -S firewalld
sudo systemctl enable firewalld
```

[tlp](https://wiki.archlinux.org/title/TLP_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))作为电池优化项目，可选。可参阅[官方文档说明](https://linrunner.de/tlp/installation/arch.html)

```shell
paru -S tlp
sudo systemctl enable tlp
sudo systemctl enable tlp.service
sudo systemctl enable NetworkManager-dispatcher.service
sudo systemctl mask systemd-rfkill.service # 屏蔽以下服务以避免冲突，确保 TLP 无线设备的开关选项可以正确运行
sudo systemctl mask systemd-rfkill.socket
```

[timeshift](https://github.com/linuxmint/timeshift)是肯定得做的，防止电脑哪天被玩坏，具体使用可以看官方文档，或者直接`tldr timeshift` ，可以`sudo timeshift-gtk`使用图形化界面

```shell
paru -S timeshift 
```

### 美化

首先是sddm，你可以去[kde-store](https://store.kde.org/browse?cat=101&ord=latest)找合适主题，然后放进`/usr/share/sddm/theme`里，具体可以参看[archwiki](https://wiki.archlinux.org/title/SDDM#Theme_settings)。二一个是qt程序和gtk程序的问题，qt程序可以安装[kvantum](https://github.com/tsujan/Kvantum/tree/master/Kvantum)，而后去kde-store找主题即可，然后改环境变量。

```shell
paru -S kvantum
cp -r $mydotfile/themeconfig/Kvantum ~/.config #可以用我的配置
vim /etc/environment
export QT_STYLE_OVERRIDE=kvantum
export XDG_CURRENT_DESKTOP=KDE
```

后一行是处理qt程序图标问题，如果不用dophin可以不加。我自己把nord-dark的sddm主题改了一下，去掉里blur特效，放在仓库里，但你直接用可能会报错，这就得安装kde依赖，我自己直接图省事，装[sddm-kcm](https://archlinux.org/packages/extra/x86_64/sddm-kcm/)，弄里一圈又回到里kde。当然你可以用[lightdm](https://wiki.archlinux.org/title/LightDM)，我是因为从kde转过来，所以就用sddm。gtk主题去[pling](https://www.pling.com/)下找。你可以直接用我的配置，把config里的一堆gtk放进你的config里

``` 
cp -r $mydotfile/themeconfig/theme ~/.theme
cp -r $mydotfile/themeconfig/icons ~/.local/share/icons
cp $mydotfile/themeconfig/gtkrc-2.0 ~/.gtkrc-2.0
```

你也可以安装全局主题，或者干脆把我的主题放全局。可以使用[gtk-chtheme](https://archlinux.org/packages/community/x86_64/gtk-chtheme/)改变主题。

```shell
paru -S  adapta-gtk-theme breeze-gtk breeze arc-gtk-theme adwaita-icon-theme breeze-icons
```

我本人全部使用[nord](https://github.com/EliverLara/Nordic/)主题，配色选择nord-darker。具体可以参照[archwiki-gtk](https://wiki.archlinux.org/title/GTK_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E9%85%8D%E7%BD%AE)，[协调QT和GTK程序的外观](https://wiki.archlinux.org/title/Uniform_look_for_Qt_and_GTK_applications_(简体中文))，[archwiki-qt](https://wiki.archlinux.org/title/Qt_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))，对于grub主题，我个人选择[这一系列](https://github.com/vinceliuice/grub2-themes)，你可以在pling上搜到合适的grub主题。

**如果你觉得手动太麻烦，我这有个方案，先安上plasma，而后进去设置好，然后卸掉plasma，亲测可行，应该是最不折腾的方法**，具体参考[这个](https://arch.icekylin.online/advanced/beauty-2.html)。

```shell
paru -S plasma-meta ＃😏
paru -Ｒ plasma-meta plasma ＃😄
```

对于鼠标主题，可能出现设置以后某些程序中正常但是桌面鼠标央视不变的问题，可以参考相关[archwiki](https://wiki.archlinux.org/title/Cursor_themes)，我自己是写进了`~/.Xresources`和`~/.xprofile`，然后又在`/usr/share/icons/default/index.theme`更改了默认设置。

## 环境配置

### 浏览器配置

```shell
paru -S brave-bin #安装brave浏览器
paru -S tor-browser #安装tor
```

对于firefox浏览器，我个人使用[minimal-functional-fox](minimal-functional-fox)做主题，具体参考官方文档。

```shell
curl -Lo install.sh https://raw.githubusercontent.com/mut-ex/minimal-functional-fox/master/install.sh
sh install.sh
```

而后去`about:config`里把`toolkit.legacyUserProfileCustomizations.stylesheets`打开，starpage个人用[bento](https://github.com/migueravila/Bento)，我自己的配置你可以在我的dotfile里找到。

浏览器插件：插件：[Midnight Lizard](https://midnight-lizard.org/)：调整配色使用，但对于某些网页可能会显得奇怪，个人使用[nord](https://midnight-lizard.org/schemes/index/full/641417e1-5773-4e95-b707-75358ed5286c)配色。[Tampermonkey](https://www.tampermonkey.net)：油猴脚本，这个安装啥就看个人了，我只推荐一个[脚本](https://greasyfork.org/en/scripts/14178-ac-baidu-%E9%87%8D%E5%AE%9A%E5%90%91%E4%BC%98%E5%8C%96%E7%99%BE%E5%BA%A6%E6%90%9C%E7%8B%97%E8%B0%B7%E6%AD%8C%E5%BF%85%E5%BA%94%E6%90%9C%E7%B4%A2-favicon-%E5%8F%8C%E5%88%97)。[easyrss](https://github.com/arguablykomodo/easy-rss)用来看rss，但我现在主要在移动端用rss阅读器。

### 开发工具

**前面在终端部分说了vim和neovim的配置**，这就不再赘述。kate话我个人有时候用，当一个文本编辑器使用。对于vim还有个不成熟的rust替代[helix](https://helix-editor.com/)，但我还在观望，目前依然用neovim。

```shell
paru -S visual-studio-code-bin kate qtcreator neovim　neovide　
```
安装conda，也可以手动安装anaconda,但我这选择minconda，更轻一些


```shell
paru -S miniconda3 
```

安装rust环境，不建议在arch安rustup包，会有些问题

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh 
```

安装cpp开发环境，opencv建议把可选依赖全装，不然可能代码运行不了。qt6早有了，但我看得书还是qt5，寻思也不太影响就没换。

```shell
paru -S boost clang opencv opencv-samples cmake qt5-base qt5-doc 
```

安java和nodejs环境，nodejs的话不管你写不写js，都会用到，比如picgo图床。~~（如果现在还有人用java8的话，java8依然在arch源里依然有🤭）~~

```shell
paru -S jdk-openjdk jre-openjdk jre-openjdk-headless openjdk-doc #java环境
paru -S nodejs npm yarn #nodejs环境
```

安装tex环境，我的建议是没必要全装，arch把texlive分成几个小包，具体参考[archwiki](https://wiki.archlinux.org/title/TeX_Live#Installation)，目前有个新兴工具[Tectonic](https://tectonic-typesetting.github.io/en-US/)，我还没有实验，如果哪位有兴趣可以一试。也可以安装[miktex](https://aur.archlinux.org/packages/miktex)，我自己没用过，但据说这玩意是**拿文本文件做数据库**，不知是啥癖好。

```shell
paru -S texlive-most
```

安装sql管理工具，我自己不习惯把sql放本地，于是本地就一管理工具，当然，vscode下有一个[付费插件](https://github.com/cweijan/vscode-database-client)，但其实就光学习使用的话免费就够用。

```shell
paru -S mysql-workbench 
```

安装r，[radian](https://github.com/randy3k/radian)的话比Ｒ自己的终端好多了。

```shell
paru -S r radian 
```

对于vscode的话，你以前怎么配置现在就怎么配置，如果使用neovim，**一定要去[lsp-config](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md)里面找到对应插件查看依赖**。

对于虚拟机，我以前用的是virtualbox，现在换成了kvm/qemu，这个性能更高些，你可以对照[archwiki](https://wiki.archlinux.org/title/KVM)进行查看，kvm你是可以做到**显卡直通**的，具体我还没实验，虚拟显卡的话我没用Virtio，但按理说这个性能更高，我用的qxl。

```shell
paru -S virtualbox qemu-full libvirt Virt-Manager
```

用的时候启动libvirt守护进程，开启网络，**如果你网络环境改变会断网**，这时候你需要把`default`destroy掉再开一遍。

```shell
sudo systemctl start libvirtd 
sudo virsh net-start default  
```

现在有人搞了个更方便的工具[quickemu](https://github.com/quickemu-project/quickgui)，我自己也在用。

```shell
paru -S quickgui-bin 
```

对于安卓虚拟机，有一个专有软件[genymotion](https://aur.archlinux.org/packages/genymotion)，我实验一下感觉没用必要。

### 基本软件安装

安装bt下载工具[deluge](https://www.deluge-torrent.org/)，个人使用[这个](https://ngosang.github.io/trackerslist/)trackerlist

```shell
paru -S deluge 
```

安装markdown编辑器，目前感觉[typora](https://typoraio.cn/)是用的最顺手的md编辑器，但收费，不过原来免费版没有删除，一样可以安装。也可以选择[marktext](https://aur.archlinux.org/packages/marktext-bin)和[joplin](https://aur.archlinux.org/packages/joplin-appimage)，但我个人用的最多的是typora和[nvim插件](https://github.com/iamcco/markdown-preview.nvim)。可以配置picgo图床，具体可以看[typora文档](https://support.typora.io/Upload-Image/)，当然也可以手动上传，具体可以看[官方文档](https://picgo.github.io/PicGo-Core-Doc/)。

```shell
paru -S typora # paru -S typora-free 
```

安装rss工具，这个客户端用的还比较舒服。

```shell
paru -S newsflash 
```

安装多媒体处理软件，obs算是常用的软件了，gimp处理图片也不错，视频剪辑你也可以使用[达芬奇](https://aur.archlinux.org/packages/davinci-resolve)，我自己用kdenlive。

```shell
paru -S obs-studio gimp kdenlive
```

安装通讯工具，微信我自己没用安装，aur流行度最高的是[deepin-wine-wechat](https://aur.archlinux.org/packages/deepin-wine-wechat)。对于QQ，你也可以[deepin-wine-tim](https://aur.archlinux.org/packages/deepin-wine-tim)，但疼逊自己那破linuxqq估计没人用吧😄💧。目前还有个[rustqq](https://github.com/lomirus/gtk-qq)，不过看样正处于开发阶段。

```shell
paru -S telegram-desktop
paru -S wemeet-bin #腾讯会议
paru -S icalingua++ #用electron实现的qq
```

安装垃圾清理工具[stacer](https://github.com/oguzhaninan/Stacer)，这个工具在我kde的时候还在使用，但目前已经不用了。

```shell
paru -S stacer-bin
```

安装音乐软件，这俩都是网易云的第三方客户端，我寻思这些人是不应该考虑考虑，为啥第三方比原版做的好。[ypm](https://github.com/qier222/YesPlayMusic)是用electron写的，占资源，我更倾向于rust 写的[netease-cloud-music-gtk4](https://github.com/gmg137/netease-cloud-music-gtk)。如果用其他音乐，可以使用[listen1](https://listen1.github.io/listen1/)

```shell
paru -S yesplaymusic netease-cloud-music-gtk4
```

安装网盘，个人使用[阿里云webdav](https://github.com/messense/aliyundrive-webdav)，好处是免费，不限速，按照github说明安装即可，可以在dolphin或Thunar中[开启webdav](https://wiki.archlinux.org/title/WebDAV#Dolphin)。我的zshrc里有相关一行。

安装安卓投屏工具，具体使用可以看[这个](https://arch.icekylin.online/apps/collaboration.html#%E6%9C%89%E7%BA%BF%E8%BF%9E%E6%8E%A5)，我自己就安上时候用来几次，在就没用过。

```shell
paru -S kdeconnect sshfs
paru -S scrcpy android-tools
```



