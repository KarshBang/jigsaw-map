import BaseMap, { MapConfig } from './baseMap'
//todo 修改为 HTMLImageElement

function levelFunc() {

}

class AbstractMap extends BaseMap {

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
        this.mask.classList.remove('mask-drag')
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

            console.log(deltaX, deltaY)
            //计算还需要偏移的坐标
            const partialX = (deltaX - mapX / newScaleUnit) * this.imgWidth
            const partialY = (deltaY - mapY / newScaleUnit) * this.imgHeight

            console.log(partialX, partialY)
            setTimeout(() => {
                this.mask.classList.add('mask-drag')
                this.createMap(deltaX, deltaY, newLevel)
                this.x = newLeft + partialX
                this.y = newTop + partialY
            },200)

            // return
            this.scaleUnit = newScaleUnit

            return
        }
    }

}


class EagleMap extends AbstractMap {
    miniMap: AbstractMap
}

export default AbstractMap