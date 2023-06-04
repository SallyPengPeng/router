import HashRouter from './hash'
import HistoryRouter from './history'
import routes from './routes'
import '../style.scss'

const ROUTER_MODE = 'hash'
class WebRouter {
    constructor({ mode = ROUTER_MODE, routes }) {
        this.router = mode === 'hash' ? new HashRouter(routes) : new HistoryRouter(routes)
    }

    push(path) {
        this.router.push(path)
    }

    replace(path) {
        this.router.replace(path)
    }
}

const router = new WebRouter({
    mode: ROUTER_MODE,
    routes,
})

document.querySelector('.nav')?.addEventListener('click', e => {
    const target = e.target

    console.log(e)
    if (target?.tagName === 'LI') {
        const url = target.dataset.url

        // 先去掉所有节点的选中状态
        document.querySelectorAll('li').forEach(li => {
            li.classList.remove('active')
        })
        // 给点击节点添加选中样式
        target.classList.add('active')

        if (target.id !== 'replace') {
            router.push(url)
        } else {
            router.replace(url)
        }
    }
    

})

