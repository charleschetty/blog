yarn run build
export NODE_OPTIONS=--openssl-legacy-provider


cd /home/charles/Documents/github/makerss/blog
rm -rf _post
mkdir _post
cp -r /home/charles/Documents/github/blog/posts/* _post/
cd /home/charles/Documents/github/makerss
sh deploy.sh

cp /home/charles/Documents/github/makerss/blog/.vuepress/dist/rss.xml /home/charles/Documents/github/blog/.vitepress/dist/rss.xml
cd /home/charles/Documents/github/blog/.vitepress/dist
cat rss.xml | sed '/<atom/d' > 1 
cat 1 | sed '/enclosure/d' > rss.xml
rm 1

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:charleschetty/blog.git master:gh-pages
cd /home/charles/Documents/github/blog
git add -A
git commit -m 'deploy'
git push -f git@github.com:charleschetty/blog.git main
