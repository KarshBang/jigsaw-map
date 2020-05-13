import BaseMap from './baseMap'
//todo 修改为 HTMLImageElement

class AbstractMap extends BaseMap {
    scaleUnit = 225
    get scale(): number {
        return this._scale
    }
    set scale(newScale: number) {
        //todo 图层达到最大最小后, 禁止缩放

        const { mask, mouseX, mouseY, _scale: oldScale } = this
        const oldTop = parseInt(mask.style.top)
        const oldLeft = parseInt(mask.style.left)
        const top = oldTop + (mouseY - oldTop) * (oldScale - newScale) / newScale
        const left = oldLeft + (mouseX - oldLeft) * (oldScale - newScale) / newScale

        //done: 调整缩放的原点
        mask.style.transform = `scale(${newScale})`
        mask.style.top = `${top}px`
        mask.style.left = `${left}px`
        this._scale = newScale
        this._xCoordinate = left
        this._yCoordinate = top
        //todo 判断当scale到达一定程度之后刷新图层
        if (newScale >= 1.5 || newScale <= 0.8) {
            const newLevel = newScale > 1 ? this.level + 1 : this.level - 1
            //BUG: 这个式子可能有问题 miny 应该也应该*newScale,亦或是miny不应参与计算
            // const newLeft = (left - minX) - this.colEdge * newScale
            const newLeft = left - this.colEdge * newScale
            const newTop = top - this.rowEdge * newScale



            const {scaleUnit, baseCol, baseRow} = this
            //todo: 加入baserow
            //todo: 坐标越界直接取余
            const mapX = (baseCol + this.colEdgeIndex) * scaleUnit
            const mapY = (baseRow + this.rowEdgeIndex) * scaleUnit
            console.log(mapX, mapY)

            const newScaleUnit = scaleUnit / 1.5
            //计算起始图片的序号
            const deltaX = Math.floor(mapX / newScaleUnit)
            const deltaY = Math.floor(mapY / newScaleUnit)

            console.log(deltaX, deltaY)
            //计算还需要偏移的坐标
            const partialX = (deltaX - mapX / newScaleUnit) * this.imgWidth
            const partialY = (deltaY - mapY / newScaleUnit) * this.imgHeight

            console.log(partialX, partialY)
            this.createMap(deltaX, deltaY, newLevel)
            this.mask.style.left = `${newLeft + partialX}px`
            this.mask.style.top = `${newTop + partialY}px`
            // return
            this.scaleUnit = newScaleUnit
            setTimeout(() => {

                this.x = newLeft + partialX
                this.y = newTop + partialY
            }, 1000)

            return
        }
    }

}


export default AbstractMap