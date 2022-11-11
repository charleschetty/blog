---
date: 2022-10-30
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

换了vitepress，因为目前在测试阶段，生态很差，还没有RSS插件支持，~~我个人打算同时开一个vuepress版本，然后编译之后把rss文件复制过来~~。~~手机版可能会有些问题~~，~~配色的话链接配色可能在浅色模式下影响感官~~。

考虑了一下去掉了搜索栏，因为意义不大。目前没有开通评论的打算，因为本来就没有流量，如果觉得有这必要，可以在issue里提。

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

