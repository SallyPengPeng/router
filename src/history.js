import BaseRouter from './baseRouter'

class HistoryRouter extends BaseRouter {
    constructor(routes) {
        super(routes)

        this.stateAddEvent()

        window.addEventListener('load', this.refresh);
        window.addEventListener('historyChange', this.refresh)

    }

    stateAddEvent() {
        const listener = function(type) {
            let originalEvent = window.history[type]
            return function (...args) {
                const result = originalEvent.apply(this, args)
                const e = new CustomEvent('historyChange', { detail: args })
                window.dispatchEvent(e)
                return result
            }
        }

        window.history.pushState = listener('pushState')
        window.history.replaceState = listener('replaceState')
    }

    refresh = () => {
        const path = window.location.pathname
        this.render(path)
    }

    push = (path) => {
        window.history.pushState(null, null, path)
    }

    replace = (path) => {
        window.history.replaceState(null, null, path)
    }
}

export default HistoryRouter