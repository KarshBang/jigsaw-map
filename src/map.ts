import BaseMap, { MapConfig } from './baseMap'
import { getLeft, getTop } from './util'
//todo 修改为 HTMLImageElement

function addContext(container: HTMLElement, map: MagnifierMap) {

    const context = (e: MouseEvent) => {
        console.log('asd')
        e.stopPropagation()
        e.preventDefault()
        const offsetLeft = getLeft(container)
        const offsetTop = getTop(container)
        const x = e.clientX - offsetLeft
        const y = e.clientY - offsetTop
        map.mouseX = x
        map.mouseY = y
        console.log(x, y)
        map.magnifier = true
    }
    container.oncontextmenu = context
}

class LayerMap extends BaseMap {
    scaleUnit = 225
    levelLimit: number
    scrollStep: (a: number) => number
    moveListeners: ((orgin: [number, number], pixelSize: [number, number]) => void)[]

    constructor(container: HTMLElement, config: MapConfig) {
        super(container, config)
        this.moveListeners = []
        this.levelLimit = config.levelLimit >= 1 ? config.levelLimit : 1
    }
    createMap(deltaX: number = 0, deltaY: number = 0, level: number = 0) {
        super.createMap(deltaX, deltaY, level)
        this.scaleUnit = 225 / Math.pow(this.maxScale, level)
        this.emitMove()
    }

    init(patchInit?: () => HTMLElement) {
        this.scrollStep = super.init(patchInit)
        return this.scrollStep
    }

    get scale(): number {
        return this._scale
    }

    set scale(newScale: number) {
        if (newScale < this.minScale) {
            if (this._scale > this.minScale) {
                newScale = this.minScale
            } else {
                return
            }
        }

        if (newScale > this.maxScale) {
            if (this._scale < this.maxScale) {
                newScale = this.maxScale
            } else {
                return
            }
        }
        const [left, top] = this._setScale(newScale)
        //todo 判断当scale到达一定程度之后刷新图层
        if (newScale >= this.maxScale || newScale <= this.minScale) {
            const newLevel = newScale > 1 ? this.level + 1 : this.level - 1
            if (newLevel < 0 || newLevel > this.levelLimit) {
                return
            }

            //BUG: 这个式子可能有问题 miny 应该也应该*newScale,亦或是miny不应参与计算
            // const newLeft = (left - minX) - this.colEdge * newScale
            const newLeft = left - this.colEdge * newScale
            const newTop = top - this.rowEdge * newScale
            const { scaleUnit, baseCol, baseRow } = this
            //todo: 加入baserow
            //todo: 坐标越界直接取余
            const mapX = (baseCol + this.colEdgeIndex) * scaleUnit
            const mapY = (baseRow + this.rowEdgeIndex) * scaleUnit
            console.log(mapX, mapY)

            const newScaleUnit = newScale > 1 ? scaleUnit / this.maxScale : scaleUnit * this.maxScale
            //计算起始图片的序号
            const deltaX = Math.floor(mapX / newScaleUnit)
            const deltaY = Math.floor(mapY / newScaleUnit)

            //计算还需要偏移的坐标
            const partialX = (deltaX - mapX / newScaleUnit) * this.imgWidth
            const partialY = (deltaY - mapY / newScaleUnit) * this.imgHeight

            console.log(partialX, partialY)
            setTimeout(() => {
                this.mask.classList.add('mask-drag')
                this.createMap(deltaX, deltaY, newLevel)
                this.x = newLeft + partialX
                this.y = newTop + partialY
            }, 200)

            // return
            // this.scaleUnit = newScaleUnit
        }
        this.emitMove()
    }

    get x(): number {
        return this._xCoordinate
    }

    get y(): number {
        return this._yCoordinate
    }

    set x(newX: number) {
        this._setX(newX)
        this.emitMove()
    }

    set y(newY: number) {
        this._setY(newY)
        this.emitMove()
    }

    addMoveListener(func: (orgin: [number, number], pixelSize: [number, number]) => void) {
        this.moveListeners.push(func)
    }

    removeMoveListener(func: (orgin: [number, number], pixelSize: [number, number]) => void) {
        this.moveListeners = this.moveListeners.filter(i => i !== func)
    }

    emitMove() {
        if (!this.moveListeners.length) return
        const orgin = this._getMouseMap()
        const PixelSize = this.getPixelSize()

        this.moveListeners.forEach((func) => {
            func(orgin, PixelSize)
        })
        // console.log('emitMove', orgin, PixelSize)
    }

    //获取地图
    setOriginPostion(mapX: number, mapY: number, partialX: number = 0, partialY: number = 0) {
        const { scaleUnit, baseCol, baseRow, x, y, imgHeight, imgWidth, _scale } = this

        //获得当前原点的经纬坐标
        const a = (baseCol - x / _scale / imgWidth) * scaleUnit
        const b = (baseRow - y / _scale / imgHeight) * scaleUnit

        const deltaX = (mapX - a) * _scale * imgWidth / scaleUnit
        const deltaY = (mapY - b) * _scale * imgHeight / scaleUnit

        this.x -= deltaX - partialX
        this.y -= deltaY - partialX
    }

    _getMouseMap(): [number, number] {
        const { scaleUnit, baseCol, baseRow, x, y, imgHeight, imgWidth, _scale } = this
        const mapX = (baseCol + (0 - x) / _scale / imgWidth) * scaleUnit
        const mapY = (baseRow + (0 - y) / _scale / imgHeight) * scaleUnit
        return [mapX, mapY]
    }

    getPixelSize(): [number, number] {
        //每个像素代表的地图单位
        const unit = this.scaleUnit / this.scale
        return [unit / this.imgWidth, unit / this.imgHeight]
    }
}


class MagnifierMap extends LayerMap {
    miniMap: LayerMap
    _magnifier: boolean
    miniContainer: HTMLElement
    constructor(container: HTMLElement, config: MapConfig) {
        super(container, config)

        if (config.miniMap) {
            const miniContainer = document.createElement('div')
            miniContainer.id = 'mini-map'
            this.container.appendChild(miniContainer)
            this.miniMap = new LayerMap(miniContainer, {
                xRange: [0, 200],
                yRange: [0, 200],
                imgSize: [200, 200],
                levelLimit: 10,
                scaleRange: config.scaleRange,
            })
            this.miniContainer = miniContainer
            this.magnifier = false

        }
    }

    init(patchInit?: () => HTMLElement) {
        this.scrollStep = super.init(patchInit)
        this.miniMap && this.miniMap.init()
        addContext(this.container, this)
        this.container.addEventListener('mousedown', () => {
            this.magnifier = false
        })
        return this.scrollStep
    }

    get magnifier() {
        return this._magnifier
    }
    set magnifier(newMagnifier: boolean) {
        this._magnifier = newMagnifier
        if (!this.miniContainer) return
        this.miniContainer.style.display = newMagnifier ? 'block' : 'none'
        this.miniContainer.style.left = `${this.mouseX - 100}px`
        this.miniContainer.style.top = `${this.mouseY - 100}px`
        //todo 目前用transform会导致
        // this.miniContainer.style.transform = `translate3d(${this.mouseX}px,${this.mouseY}px,0)`
        if (newMagnifier) this.getMousePositon()
    }

    getMousePositon() {
        const { scaleUnit, baseCol, baseRow, x, y, imgHeight, imgWidth, _scale, maxScale } = this
        const mapX = (baseCol + (this.mouseX - x) / _scale / imgWidth) * scaleUnit
        const mapY = (baseRow + (this.mouseY - y) / _scale / imgHeight) * scaleUnit

        const newScaleUnit = scaleUnit / maxScale
        this.miniMap.scaleUnit = newScaleUnit
        const deltaX = Math.floor(mapX / newScaleUnit)
        const deltaY = Math.floor(mapY / newScaleUnit)
        this.miniMap.createMap(deltaX, deltaY, this.level + 1)
        console.log(mapX, mapY)
        //todo 100换成参数
        this.miniMap.setOriginPostion(mapX, mapY, 100, 100)
        //todo调整放大镜生成后的位置
    }
}

interface EagleEyeConfig {
    //地图xy经纬最大坐标
    mapRange: [number, number]
    //地图画布的大小
    mapCanvasSize: [number, number]
    //缩略图的大小
    eagleSize: [number, number]
}
class EagleEye implements EagleEyeConfig {
    container: HTMLElement
    eye: HTMLSpanElement
    map: LayerMap
    mapRange: [number, number]
    mapCanvasSize: [number, number]
    eagleSize: [number, number]
    private _ismove: boolean
    constructor(container: HTMLElement, config: EagleEyeConfig) {
        const eye = document.createElement('span')
        container.appendChild(eye)
        this.container = container
        this.eye = eye
        this.mapRange = config.mapRange
        this.mapCanvasSize = config.mapCanvasSize
        this.eagleSize = config.eagleSize
        this._ismove = false
        this.beMoved = this.beMoved.bind(this)
        this.addEvent()
    }
    addEvent() {
        const { container, eye } = this
        let isDrag = false

        const mouseMove = (e: MouseEvent) => {
            if (!isDrag) return
            const { eagleSize } = this
            const maxW = eagleSize[0] - eye.offsetWidth
            const maxH = eagleSize[0] - eye.offsetHeight
            let nLeft = e.clientX - container.offsetLeft - eye.offsetWidth / 2
            let nTop = e.clientY - container.offsetTop - eye.offsetHeight / 2

            // 设置遮罩层永远显示在小显示区域内部 也就是判断nLeft、nTop值
            nLeft = Math.min(maxW, Math.max(0, nLeft))
            nTop = Math.min(maxH, Math.max(0, nTop))

            // 遮罩层位置
            eye.style.transform = `translate3d(${nLeft}px,${nTop}px,0)`
            this.move(nLeft, nTop)

        }
        container.addEventListener('mousedown', (e: MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            isDrag = true
            this.isMove = true
            mouseMove(e)
        })
        container.addEventListener('mouseup', (e: MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            isDrag = false
            this.isMove = false
        })
        container.addEventListener('mouseleave', () => {
            isDrag = false
            this.isMove = false
        })
        container.addEventListener('mousemove', mouseMove)
    }
    set isMove(move: boolean) {
        this._ismove = move
        if (!this.map) return
        this.map.isDrag(move)
    }
    get isMove() {
        return this._ismove

    }

    linkToMap(map: LayerMap, initFunc?: (dom: HTMLElement) => void) {
        this.map = map
        initFunc && initFunc(this.container)
        map.addMoveListener(this.beMoved)

        // 225 * 
    }

    move(x: number, y: number) {
        if (!this.map) return
        const { mapRange, eagleSize } = this
        this.map.setOriginPostion(x * mapRange[0] / eagleSize[0], y * mapRange[1] / eagleSize[1])
    }

    beMoved(orgin: [number, number], pixelSize: [number, number]) {
        //如果移动是由eagle发起的
        if (this.isMove) return
        const { eye, mapRange, eagleSize, mapCanvasSize } = this
        const nLeft = orgin[0] /mapRange[0] * eagleSize[0]
        const nTop = orgin[1] /mapRange[1] * eagleSize[1]
        eye.style.transform = `translate3d(${nLeft}px,${nTop}px,0)`

        console.log()
        eye.style.width = `${pixelSize[0] * mapCanvasSize[0] * eagleSize[0] / mapRange[0]}px`
        eye.style.height = `${pixelSize[1] * mapCanvasSize[1] * eagleSize[1] / mapRange[1]}px`

    }
}



export default MagnifierMap
export { EagleEye }