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
        map.eagle = true
    }
    container.oncontextmenu = context
}

class LayerMap extends BaseMap {
    scaleUnit = 225
    levelLimit: number
    scrollStep: (a: number) => number

    constructor(container: HTMLElement, config: MapConfig) {
        super(container, config)
        this.levelLimit = config.levelLimit >= 1 ? config.levelLimit : 1
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
        if (newScale >= 1.5 || newScale <= 2 / 3) {
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
            this.scaleUnit = newScaleUnit

            return
        }
    }

}


class MagnifierMap extends LayerMap {
    miniMap: LayerMap
    _eagle: boolean
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
                scaleRange: [2 / 3, 1.5],
            })
            this.miniContainer = miniContainer
            this.eagle = false

        }
    }

    init(patchInit?: () => HTMLElement) {
        this.scrollStep = super.init(patchInit)
        this.miniMap && this.miniMap.init()
        addContext(this.container, this)
        this.container.addEventListener('mousedown', () => {
            this.eagle = false
        })
        return this.scrollStep
    }

    get eagle() {
        return this._eagle
    }
    set eagle(newEagle: boolean) {
        this._eagle = newEagle
        if (!this.miniContainer) return
        this.miniContainer.style.display = newEagle ? 'block' : 'none'
        this.miniContainer.style.left = `${this.mouseX}px`
        this.miniContainer.style.top = `${this.mouseY}px`
        //todo 目前用transform会导致
        // this.miniContainer.style.transform = `translate3d(${this.mouseX}px,${this.mouseY}px,0)`
        if(newEagle)this.getMousePositon()
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
        //todo
    }

}

export default MagnifierMap