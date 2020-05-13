
import AbstractMap from './map'
import './index.css'
const container = document.getElementById('container')
const baseUrl = 'http://127.0.0.1:8081/dist/'

const range:[number, number] = [0,1000]
const a = new AbstractMap(container, {
    xRange: range,
    yRange: range,
    imgSize: [200, 200],
})
a.init()


declare global {
    interface Window {
        test: AbstractMap
    }
}

window.test = a



