import { defineConfig } from 'vitepress'
import { getPosts } from './theme/serverUtils'
import markdownItKatex from 'markdown-it-katex'

//每页的文章数量
const pageSize = 7
const customElements = [
  'math',
  'maction',
  'maligngroup',
  'malignmark',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mi',
  'mlongdiv',
  'mmultiscripts',
  'mn',
  'mo',
  'mover',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'ms',
  'mscarries',
  'mscarry',
  'mscarries',
  'msgroup',
  'mstack',
  'mlongdiv',
  'msline',
  'mstack',
  'mspace',
  'msqrt',
  'msrow',
  'mstack',
  'mstack',
  'mstyle',
  'msub',
  'msup',
  'msubsup',
  'mtable',
  'mtd',
  'mtext',
  'mtr',
  'munder',
  'munderover',
  'semantics',
  'math',
  'mi',
  'mn',
  'mo',
  'ms',
  'mspace',
  'mtext',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'msqrt',
  'mstyle',
  'mmultiscripts',
  'mover',
  'mprescripts',
  'msub',
  'msubsup',
  'msup',
  'munder',
  'munderover',
  'none',
  'maligngroup',
  'malignmark',
  'mtable',
  'mtd',
  'mtr',
  'mlongdiv',
  'mscarries',
  'mscarry',
  'msgroup',
  'msline',
  'msrow',
  'mstack',
  'maction',
  'semantics',
  'annotation',
  'annotation-xml'
]
export default defineConfig({
    title: "Charles's Blog",
    base: '/blog/',
    cacheDir: './node_modules/vitepress_cache',
    description: "Charles's Blog",
    ignoreDeadLinks: true,
    appearance: 'dark',
    themeConfig: {
        posts: await getPosts(pageSize),
        website: 'https://github.com/charleschetty', //copyright link
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Archives', link: '/pages/archives' },
            { text: 'Tags', link: '/pages/tags' },
            { text: 'About', link: '/pages/about' }
        ],

        outlineTitle: '文章摘要'
    },
    srcExclude: ['README.md'], // exclude the README.md , needn't to compiler

    markdown: {
        theme: { light: 'nord', dark: 'nord' },
        config: (md) => {
            md.use(markdownItKatex)
            /* md.use(mathjax3) */
        }
    },

    cleanUrls: 'disabled',
    vite: {
        //build: { minify: false }
        template: {
            compilerOptions: {
                isCustomElement: (tag) => customElements.includes(tag)
            }
        },
        server: { port: 5000 }
    }
})
