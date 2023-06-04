## 浏览器 2 大 API

要讨论路由，首先需要了解浏览器的 API：location 和 history

### location

用于获取或设置窗体的URL，并且可以用于解析URL。表示其链接到的对象的位置（URL），所做的修改反映在与之相关的对象上。

#### URL介绍

统一资源定位符（Uniform Resource Locator）是互联网上标准资源的地址，互联网上的每个文件都有一个唯一的URL

```
// url一般语法格式
protocol: //host[:port]/path/[?query]#fragment
http: //www.itcast.cn/index.html?name=andy$age=18#link
```

| 组成     | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| protocol | 通信协议 常用的http ftp maito等                              |
| host     | 主机（域名）www.itheima.com                                  |
| port     | 端口号 可选，省略时使用方案的默认端口，如http的默认端口为80  |
| path     | 路径 由零活多个‘/’符号隔开的字符串，一般用来表示主机上的一个目录或者文件地址 |
| query    | 参数 以键值对的性质，通过&符号分隔开                         |
| fragment | 片段 #后面内容常见于连接锚点                                 |

#### 属性

| 属性              | 描述                                   |
| ----------------- | -------------------------------------- |
| location.href     | 获取或者设置 整个URL                   |
| location.host     | 返回主机（域名）                       |
| location.port     | 返回端口号                             |
| location.pathname | 返回路径                               |
| location.search   | 包含url参数的DOMString，开头有一个“?”  |
| location.hash     | 包含块标识符的DOMString，开头有一个“#” |

#### 方法

| 方法               | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| location.assign()  | 跟href一样，可以跳转页面（也称为重定向页面）                 |
| location.replace() | 替换当前页面，因为不记录历史，所以不能后退页面               |
| location.reload()  | 重新加载页面，相当于刷新按钮或者f5，如果参数为true，则强制刷新ctrl+f5 |

### history

history对象，与浏览器历史记录进行交互，该对象包含用户（在浏览器窗口中）访问过的URL。允许操作浏览器曾经在标签页或者框架里访问的会话历史记录。

#### 方法

都不会刷新页面，前 3 个方法只是路由历史记录的前进或者后退，无法跳转到指定的 URL。

| 方法                                         | 描述                                                         |
| -------------------------------------------- | ------------------------------------------------------------ |
| history.back()                               | 在浏览器历史记录里前往上一个状态, 用户可点击浏览器左上角的返回 |
| history.forward()                            | 在浏览器历史记录里前往下一页，用户可点击浏览器左上角的前进   |
| history.go([number])                         | 通过当前页面的相对位置从浏览器历史记录( 会话记录 )加载页面   |
| history.pushState(state, title[, url])       | 按指定的名称和URL将数据push进会话历史栈，不刷新页面          |
| history.replaceState(stateObj, title[, url]) | 按指定的数据，名称和URL，更新历史栈上最新的入口，不刷新页面  |

举例：

```javascript
const state = { 'page_id': 1, 'user_id': 5 }
const title = ''
const url = 'hello-world.html'

history.pushState(state, title, url);
history.replaceState(stateObj, "", "bar2.html");
```

#### 事件

| 事件     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| popstate | `back` `forward`  `go ` 调用时，会触发；<br />`pushState`和`replaceState`被调用时，不会触发触发 |

## 路由基础

### SPA

SPA，即单页面应用(Single Page Application)。所谓单页 `Web` 应用，就是只有一张 `Web` 页面的应用。SPA 加载单个 `HTML` 页面并在**用户与应用程序交互时**动态更新该页面的 `Web` 应用程序。浏览器一开始会加载必需的 `HTML` 、 `CSS` 和 `JavaScript` ，所有的操作都在这张页面上完成，都由 `JavaScript` 来控制。

好处：

- 由于在与用户的交互中不需要重新刷新页面，并且数据的获取也是异步执行的，页面更加流畅，用户的体验更好；
- 服务器压力小；
- 前后端分离开发。SPA和RESTful架构一起使用，后端不再负责模板渲染、输出页面工作，web前端和各种移动终端地位对等，后端API通用化。

坏处：由于SPA是通过JS动态改变HTML内容实现的，页面本身的URL没有改变，这就导致了两个问题：

- 初次加载耗时增加；
- SPA无法记住用户的操作记录，刷新、前进、后退存在问题，需要自行实现导航。
- 只有一个URL对于SEO不友好

### hash 特点

`location` 中的 # 称为位置的标识符，浏览器的hash指尾巴后的 # 号以及后面的字符，将资源路径伪装成锚点，通过 onhashchange 事件来改变状态，同时又不会刷新浏览器。当#值发生变化时，就会触发 hashchange 事件

- hash变化会触发网页跳转，即浏览器的前进和后退。
- `hash` 可以改变 `url` ，但是不会触发页面重新加载（hash的改变是记录在 `window.history` 中），即不会刷新页面。也就是说，所有页面的跳转都是在客户端进行操作。因此，这并不算是一次 `http` 请求，所以这种模式不利于 `SEO` 优化。`hash` 只能修改 `#` 后面的部分，所以只能跳转到与当前 `url` 同文档的 `url` 。
- `hash` 通过 `window.onhashchange` 的方式，来监听 `hash` 的改变，借此实现无刷新跳转的功能。
- `hash` 永远不会提交到 `server` 端。

### history 特点

对于 `history` 来说，主要有以下特点：

- 新的 `url` 可以是与当前 `url` 同源的任意 `url` ，也可以是与当前 `url` 一样的地址，但是这样会导致的一个问题是，会把**重复的这一次操作**记录到栈当中。
- 通过 `history.state` ，添加任意类型的数据到记录中。
- 可以额外设置 `title` 属性，以便后续使用。
- 通过 `pushState` 、 `replaceState` 来实现无刷新跳转的功能。

### history 和 hash 区别

- `hash` 永远不会提交到 `server` 端。所有页面的跳转都是在客户端进行操作。因此，这并不算是一次 `http` 请求

- hash 模式带 # ，history 模式不带
- pushState 设置的新 URL 可以是与当前 URL 同源的任意 URL；而 hash 只可修改 # 后面的部分，故只可设置与当前同文档的 URL
- pushState 设置的新 URL 可以与当前 URL 一模一样，这样也会把记录添加到栈中；而 hash 设置的新值必须与原来不一样才会触发记录添加到栈中
- pushState 通过 stateObject 可以添加任意类型的数据到记录中；而 hash 只可添加短字符串
- pushState 可额外设置 title 属性供后续使用
- hash 兼容IE8以上，history 兼容 IE10 以上
- history 模式需要后端配合将所有访问都指向 index.html，否则用户刷新页面，会导致 404 错误

## 路由实现

前端路由的产生就是为了解决SPA只有一个URL所带来的导航问题。实现原理简单来说，就是在不跳转或者刷新页面的前提下，为SPA应用中的每个视图匹配一个特殊的URL，之后的刷新、前进、后退等操作均通过这个特殊的URL实现。为实现上述要求，需要满足：

- 改变URL且不会向服务器发起请求；
- 可以监听到URL的变化，并渲染与之匹配的视图。

### 基类

首先完成一个基础类，实现渲染内容到`html` 的功能。

```javascript
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
```

### history方式

使用URL方式改变history形式的页面路径，有以下几个办法：

1. 调用 `history.pushState` 方法  和 `history.replaceState`

2. 改变 `location.href` 属性
3. 调用 `location.replace` 方法

区别：后2种方法 切换时要向服务器发送请求，而第1种方法仅修改 url，除非主动发起请求



前面 `window.history` 部分提到，`pushState`和`replaceState`被调用时，是不会触发触发 popstate 事件的。但是我们希望既不能向服务器发起请求，也需要触发 `popstate` 事件，从而监听事件实现路由切换。

可以使用`window.dispatchEvent`添加事件，从而实现`pushState`和`replaceState`被调用时，触发 `popstate` 事件 。

```typescript
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
```

然后监听 `historyChange事件`:

```javascript
window.addEventListener('historyChange', this.refresh)

refresh = () => {
  const path = window.location.pathname
  this.render(path)
}
```

完整代码如下：

```javascript
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
```

### hash 实现

当页面中的 hash 发生变化时，会触发`hashchange`事件，因此可以监听这个事件，来判断路由是否发生了变化

```javascript
window.addEventListener('hashchange', this.refresh)
```

完整代码如下：

```javascript
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
```

## github

以上源码已经上传GitHub，

## reference

1. https://danielxuuuuu.github.io/2020/02/23/%E5%89%8D%E7%AB%AF%E8%B7%AF%E7%94%B1%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86/
2. https://developer.aliyun.com/article/899074
3. https://juejin.cn/post/6935044153248071716
