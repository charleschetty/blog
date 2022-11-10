const { getPosts, generatePaginationPages } = require('./theme/serverUtils')
const customElements = ['mjx-container']

async function config() {
    const pageSize = 3
    await generatePaginationPages(pageSize)
    return {
        title: "Charles's Blog",
        base: '/',
        description: 'vitepress,blog,blog-theme',
        ignoreDeadLinks: true,
        appearance: 'dark',
        themeConfig: {
            posts: await getPosts(),
            pageSize: pageSize,
            website: 'https://github.com/charleschetty', //copyright link
            // 评论的仓库地址
            // comment: {
            //     repo: 'airene/vitepress-blog-pure',
            //     themes: 'github-light',
            //     issueTerm: 'pathname'
            // },
            nav: [
                { text: 'Home', link: '/' },
                { text: 'Archives', link: '/pages/archives' },
                { text: 'Tags', link: '/pages/tags' },
                { text: 'About', link: '/pages/about' }
                // { text: 'Airene', link: 'http://airene.net' }  -- External link test
            ],
            //outline:[2,3],
            outlineTitle: '文章摘要'
            // socialLinks:[{ icon: 'github', link: 'https://github.com/c' }],
        },
        srcExclude: ['README.md'], // exclude the README.md , needn't to compiler
        // markdown: {
        //     theme: 'nord',
        //     lineNumbers: true,
        //     config: (md) => {
        //         md.use(require('markdown-it-katex'));
        //     }
        // },
        markdown: {
            theme :'nord',
            config: (md) => {
                md.use(require('markdown-it-katex'));
            }
        },
        vite: {
            //build: { minify: false }
            server: { port: 8080 }
        }
        /*
      optimizeDeps: {
          keepNames: true
      }
      */
    }
}

module.exports = config()
