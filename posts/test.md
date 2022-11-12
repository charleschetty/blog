---
date: 2022-11-10
title: 测试
tags:
- vitepress
- markdown
- cpp
- test
description: 测试
lastUpdated: true
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css
---

# test

换了vitepress，因为目前在测试阶段，生态很差，还没有RSS插件支持，~~我个人打算同时开一个vuepress版本，然后编译之后把rss文件复制过来~~。~~手机版可能会有些问题~~，~~配色的话链接配色可能在浅色模式下影响感官~~。考虑了一下去掉了搜索栏，因为意义不大。目前没有开通评论的打算，因为本来就没有流量，如果觉得有这必要，可以在issue里提。

博客今年3月搭的，后来因为众所周知的原因，改为了阉割版。最近换了框架，以后说不准更新什么。从我个人的经验看，博客内容要么是知识输出，要么就是分享个人看法，当然，流量大的可能有广告。分类比较粗糙，凑付着看吧。

对于知识输出，目前我看到的要么是个人学习笔记，要么是教程。很多人把原始材料阉割一部分发出来，美其名曰是笔记。我不否认抄一遍材料会加深印象，但这对于读者而言，阉割材料只会提高理解难度，至于说信息密度问题，后面再说。只有说你看了材料，有你自己的理解，或者说梳理出一个框架大体思路，那这种笔记才适合发出来，否则不如推原文。如果说写教程，我不认为我重造轮子的能力有多高。目前有大量优秀的材料，如果我写的教程做到比这些材料都强，或者至少进入一流梯队，先不说是否能做到，即使做到也会耗费我大量的时间精力，而且我写博客也没什么收益，划不来。至于知识付费，那需要你自己先有一定名头才行，我要是这么搞，徒增笑耳。再说信息密度问题，如果说阉割材料不仅不会影响阅读，反而提高信息密度，那大概率原始材料本身就不咋地，或者说，是属于畅销书类型。如果觉得这书有必要看，有必要写笔记，那这种情况下阉割材料倒是没什么问题。

有很多人喜欢写个人看法，我也喜欢写，比如上面那段文字。如果我觉得可以发出来，可能有人看了会一块探讨，那我是会发出来的。但这种东西比较难得，很长时间也搞不出一篇，如果说对于某些问题，比如当前社会环境的看法，本身又回到了所谓知识领域。绝大部分问题是开放的，可以有不同答案，前提是得有一定的理论或者数据支撑，这个博客阉割的内容统统属于此类。个人看法如果没有什么“知识”支撑，又没有什么所谓“经历”或者“经验”，那怕是很难形成，譬如我上面那段文字，我写下来的前提是我看过很多人的博客。但恰好相反，纯粹知识的内容可以不带入个人看法，最简单的例子就是数学这种形式科学。

目前阉割之后博客有三篇文章，一篇书籍记录，这个说是哪一类都不妥当，算是一个个人记录，每个人的学习经历不同，我只是发了我自己的。两篇arch相关，linux最大的特点就是你可以完全掌握这个系统，想怎么配就怎么配，每个人都不一样，同样，我发了我自己的配置。以后大体会延续这种风格，我到现在还没发现什么材料好的我能单独写的文章来推荐，如果我看了某些材料觉得确实很好，甚至做了笔记，那可能会发出来。当然，一些好材料可能放在一个合集里。

## test

### test

test :

```cpp
template<typename T>
polynomial<T> lagrange_inter_step(std::vector<T> &&vec,int &&k){
    polynomial<T> res={{1}};
    int num=0;
    T k_val=vec[k];
    for(auto i=vec.begin();i!=vec.end();i++){
        if(num!=k){
            T k_val_step=k_val-(*i);
            res=res*polynomial<T>{(*i)*(-1)/k_val_step,1/k_val_step};
        }
        else{res=res;}
        num++;
    }
    return res;
}

template<typename T>
polynomial<T> lagrange_inter(std::vector<T> &&vec,std::vector<T> &&val){
    polynomial<T> res={{0}};
    for(int i=0;i<vec.size();i++){
        polynomial<T> temp=lagrange_inter_step(std::move(vec),std::move(i));
        res=res+temp*val[i];
    }
    return res;
}

double fun_test(double &&val){
    return 1/val;
}
```

$$
\mathbf{V}_1 \times \mathbf{V}_2 =  \begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
\frac{\partial X}{\partial u} &  \frac{\partial Y}{\partial u} & 0 \\
\frac{\partial X}{\partial v} &  \frac{\partial Y}{\partial v} & 0 \\
\end{vmatrix}
$$

