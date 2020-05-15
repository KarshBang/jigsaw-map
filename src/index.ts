
import AbstractMap, {EagleEye} from './map'
import './index.css'
const container = document.getElementById('container')
const baseUrl = 'http://127.0.0.1:8081/dist/'

const range: [number, number] = [0, 1000]
const a = new AbstractMap(container, {
    xRange: range,
    yRange: range,
    imgSize: [200, 200],
    levelLimit: 10,
    scaleRange: [0.5, 2],
    miniMap: {
        xRange: range,
        yRange: range,
    }
})
// a.scrollStep(0.2)
const eagleContainer = document.getElementById('eagle')
const b = new EagleEye(eagleContainer, {mapRange: [1125,1125], mapCanvasSize: [1000,1000], eagleSize:[150,150]})
b.linkToMap(a, (dom) => {
    const img = new Image()
    img.src = 'http://127.0.0.1:8081/IMG_7047-Median.jpg'
    img.width = 150
    img.height = 150
    dom.appendChild(img)
})
a.init()
declare global {
    interface Window {
        test: AbstractMap
    }
}

window.test = a



