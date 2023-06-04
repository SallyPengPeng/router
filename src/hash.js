import BaseRouter from './baseRouter'

class HashRouter extends BaseRouter {
    constructor(routes) {
        super(routes)

        window.addEventListener('load', this.refresh)
        window.addEventListener('hashchange', this.refresh)
    }

    refresh = () => {
        const path = window.location.hash
        const i = path.indexOf('#')
        if (i > -1) {
            this.render(path.slice(1))
        } else {
            // 兼容首次进入
            // 1. hash模式匹配首页路由 #/
            // 2. 设置首页tab选中样式
            window.location.hash = '/'
            document.querySelectorAll('li').forEach(li => {
                if (li.dataset.url === '/') {
                    li.classList.add('active')
                }
            })
            this.render('#/')
        }
        
    }

    push = (path) => {
        window.location.hash = path
    }

    replace = (path) => {
        const getUrl = (path) => {
            const href = window.location.href
            const i = href.indexOf('#')
            const base = i >=0 ? href.slice(0, i) : href
            return base + '#' + path
        }
        window.location.replace(getUrl(path))
    }
}

export default HashRouter