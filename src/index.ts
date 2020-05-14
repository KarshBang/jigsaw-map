
import AbstractMap from './map'
import './index.css'
const container = document.getElementById('container')
const baseUrl = 'http://127.0.0.1:8081/dist/'

const range: [number, number] = [0, 1000]
const a = new AbstractMap(container, {
    xRange: range,
    yRange: range,
    imgSize: [200, 200],
    levelLimit: 10,
    scaleRange: [2 / 3, 1.5],
    miniMap: {
        xRange: range,
        yRange: range,
    }
})
a.init()
// a.scrollStep(0.2)


declare global {
    interface Window {
        test: AbstractMap
    }
}

window.test = a



