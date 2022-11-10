yarn run build
cd .vitepress/dist
git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:charleschetty/blog.git master:gh-pages

cd ..
cd ..

git add -A
git commit -m 'deploy'
git push -f git@github.com:charleschetty/blog.git main
