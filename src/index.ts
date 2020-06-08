
import AbstractMap, { EagleEye } from './map'
import { srcParam } from './baseMap'
import {posRemainer} from './util'
import './index.css'

const onhashchange = () => {
    location.reload()
}
window.onhashchange = onhashchange

window.onload = () => {
    if (location.hash.length === 0 || location.hash === '#institutional-migration') {
        return acemap('/institutional-migration')
    } else if (location.hash === '#seminal-papers') {
        return acemap('/seminal-papers')
    } else if(location.hash === '#skeleton') {
        return showSkeleton()
    }
    const querySet = getUrlQuery(location.hash)
    if(querySet.random) {
        return showOneImg(querySet.src)
    }
    if(querySet.src) {
        if(querySet.src==='null') {
            return showOneImg('https://api.ixiaowai.cn/gqapi/gqapi.php')
        }
        return showOneImg(querySet.src)
    }
    else {
        window.onhashchange = null
        const url = prompt('input a image url')
        location.hash = `#img?src=${url}`
        showOneImg(querySet.src)
        window.onhashchange = onhashchange
    }
}

function getUrlQuery(url: string) {
    const res: any = {}
    const split = url.split('?')
    if (split.length < 2) {
        return res
    }
    const list = split[1].split('&')
    for (let q of list) {
        const [key, value] = q.split('=')
        res[key] = value
    }
    return res
}



function acemap(filepath: string = '') {
    const container = document.getElementById('container')
    const baseUrl = `./img${filepath}`
    const range: [number, number] = [0, 800]
    const a = new AbstractMap(container, {
        xRange: range,
        yRange: range,
        imgSize: [200, 200],
        levelLimit: 4,
        scaleRange: [0.5, 2],
        miniMap: {
            xRange: range,
            yRange: range,
        }
    })
    const eagleContainer = document.getElementById('eagle')
    const b = new EagleEye(eagleContainer, { mapRange: [900, 900], mapCanvasSize: [800, 800], eagleSize: [200, 200] })
    b.linkToMap(a, (dom) => {
        const img = new Image()
        img.src = baseUrl + '/0.png'
        img.width = 200
        img.height = 200
        dom.appendChild(img)
    })
    a.mapSrc(function (dom: HTMLElement, params: srcParam) {
        const { x, y } = params
        const max = Math.pow(4, this.level + 1)
        if (0 > x || max <= x || 0 > y || max <= y) {
            (<HTMLImageElement>dom).src = baseUrl + `/-1.png`
            return
        }
        (<HTMLImageElement>dom).src = baseUrl + `/${this.level + 1}-${x}-${y}.png`
    })
    a.init(() => {
        const image = new Image()
        return image
    })
}
function showOneImg(imgUrl: string) {
    const container = document.getElementById('container')
    const range: [number, number] = [0, 800]
    const a = new AbstractMap(container, {
        xRange: range,
        yRange: range,
        imgSize: [200, 200],
        levelLimit: 4,
        scaleRange: [0.5, 2],
        miniMap: {
            xRange: range,
            yRange: range,
        }
    })
    const eagleContainer = document.getElementById('eagle')
    const b = new EagleEye(eagleContainer, { mapRange: [900, 900], mapCanvasSize: [800, 800], eagleSize: [200, 200] })
    b.linkToMap(a, (dom) => {
        const img = new Image()
        img.src = imgUrl
        img.width = 200
        img.height = 200
        dom.appendChild(img)
    })
    a.mapSrc(function (dom: HTMLElement, params: srcParam) {
        const img: any = dom.firstElementChild
        const round = Math.pow(this.maxScale, this.level)
        const size = round * 800

        if (!img.src) {
            img.src = imgUrl
        }
        img.height = size
        img.width = size
        img.style.left = `${-posRemainer(params.x, 4*round) * 200}px`
        img.style.top = `${-posRemainer(params.y, 4* round) * 200}px`

        // console.log(params.x, params.y, 'in')
        // return (dom2) => {
        //     console.log(params.x, params.y, 'out')
        // }
    })
    a.init(() => {
        const patch = document.createElement('div')
        const image = new Image()
        patch.style.border = '1px solid brown'
        patch.appendChild(image)
        return patch
    })
}
function showSkeleton() {
    const container = document.getElementById('container')
    const range: [number, number] = [0, 800]
    const a = new AbstractMap(container, {
        xRange: range,
        yRange: range,
        imgSize: [200, 200],
        levelLimit: 4,
        scaleRange: [0.5, 2],
        miniMap: {
            xRange: range,
            yRange: range,
        }
    })
    const eagleContainer = document.getElementById('eagle')
    const b = new EagleEye(eagleContainer, { mapRange: [900, 900], mapCanvasSize: [800, 800], eagleSize: [200, 200] })
    b.linkToMap(a, (dom) => {
        const img = new Image()
        // img.src = imgUrl
        img.style.width = '200px'
        img.style.height = '200px'
        dom.appendChild(img)
    })
    a.mapSrc(function (dom: HTMLElement, params: srcParam) {
        dom.innerText = `${this.level}+${params.x}+${params.y}`
    })
    a.init(() => {
        const patch = document.createElement('div')
        patch.style.border = '1px solid brown'
        return patch
    })
}

declare global {
    interface Window {
        test: AbstractMap
    }
}





