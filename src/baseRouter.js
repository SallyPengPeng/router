const APP = document.querySelector('#app')

class BaseRouter {
    constructor(routes) {
        this.routes = routes
    }

    // 通过跳转的路由找到对应的组件配置，渲染到页面中
    render(path) {
        let curRoute = this.routes.find(route => route.path === path)
        if (!curRoute) {
            curRoute = this.routes.find(route => route.path === '*')
        }

        APP.innerHTML = curRoute.component
    }
}

export default BaseRouter