yarn run docs:build
cd docs/.vuepress/dist
git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:charleschetty/blog.git master:gh-pages

cd ..
cd ..
cd ..

git add -A
git commit -m 'deploy'
git push -f git@github.com:charleschetty/blog.git master
