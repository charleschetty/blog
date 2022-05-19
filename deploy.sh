#!/usr/bin/env sh

# 确保脚本抛出遇到的错误

git add -A
git commit -m 'deploy'

# git push -f git@github.com:charleschetty/blog.git master:gh-pages

git push -f git@github.com:charleschetty/blog.git guonei
