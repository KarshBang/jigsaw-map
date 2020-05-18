import { throttle, getLeft, getTop, posRemainer } from './util'
type imgList = HTMLElement[]
type numberPair = [number, number]
interface MiniMapConfig {
    xRange: numberPair
    yRange: numberPair
}
export interface MapConfig {
    imgSize: numberPair
    xRange: numberPair
    yRange: numberPair
    levelLimit?: number
    scaleRange?: numberPair
    miniMap?: MiniMapConfig
    scaleUnitBase?: number
}

export interface srcParam {
    x: number,
    y: number,
    level?: number,
    // option: string
}



function addDrag(container: HTMLElement, dom: HTMLElement, map: BaseMap): void {

    dom.style.position = 'absolute'

    let x = 0
    let y = 0
    let l = 0
    let t = 0
    let isDrag = false
    //todo 双向绑定
    let left = 0
    let top = 0
    const mouseDown = (e: MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        x = e.clientX
        y = e.clientY
        // l = dom.offsetLeft
        // t = dom.offsetTop
        l = map.x
        t = map.y
        isDrag = true
        dom.style.cursor = 'move'
        map.isDrag(true)
        // dom.classList.add('mask-drag')
    }
    const mouseMove = (e: MouseEvent) => {
        e.stopPropagation()

        if (!isDrag) return
        const clientX = e.clientX
        const clientY = e.clientY
        left = clientX - (x - l)
        top = clientY - (y - t)
        map.x = left
        map.y = top
        // dom.style.left = left + 'px'
        // dom.style.top = top + 'px'
    }
    const mouseUp = (e: MouseEvent) => {
        e.stopPropagation()
        isDrag = false
        dom.style.cursor = null
        map.isDrag(false)
        // dom.classList.remove('mask-drag')
    }
    container.onmousemove = mouseMove
    container.onmousedown = mouseDown
    container.onmouseup = mouseUp
    container.oncontextmenu = function (e: MouseEvent) {
        e.stopPropagation()
        e.preventDefault()
        console.log(123)
    }
}


function addScroll(container: HTMLElement, dom: HTMLElement, map: BaseMap, initStep: number = 0.1): (a: number) => number {
    let step = initStep
    const wheel = (e: MouseWheelEvent) => {
        e.stopPropagation()
        e.preventDefault()
        const offsetLeft = getLeft(container)
        const offsetTop = getTop(container)
        const x = e.clientX - offsetLeft
        const y = e.clientY - offsetTop
        map.mouseX = x
        map.mouseY = y
        if (e.deltaY > 0) {
            map.scale -= step
        } else {
            map.scale += step
        }
    }
    container.addEventListener('wheel', (e: Event) => {
        e.stopPropagation()
    })
    container.addEventListener('wheel', throttle(wheel, 200))
    // container.onwheel = throttle(wheel, 200)
    return function (newStep?: number): number {
        if (newStep === undefined) {
            return step
        }
        return step = newStep
    }
}


abstract class AbstractMap {
    //层数
    level: number

    //图片数量
    rowNum = 4
    colNum = 4
    //图片尺寸
    imgWidth: number
    imgHeight: number
    rowList: imgList[]
    colList: imgList[]

    //图片上(左)边缘的坐标和索引
    rowEdge: number
    colEdge: number
    rowEdgeIndex: number
    colEdgeIndex: number

    //鼠标当前位置,用于缩放
    mouseX: number
    mouseY: number

    //地图的起始横纵编号
    baseCol: number
    baseRow: number

    //地图的偏移量以及缩放比例
    protected _xCoordinate: number
    protected _yCoordinate: number
    protected _scale: number

    //图片更新的范围
    protected minX: number
    protected maxX: number
    protected minY: number
    protected maxY: number
    protected minScale: number
    protected maxScale: number
    //每一次改变图片位置,图片坐标偏移量: rowNum * imgHeight
    protected difX: number
    protected difY: number

    //dom
    mask: HTMLElement
    container: HTMLElement

    abstract init(patchInit?: () => HTMLElement): void
    abstract patchInit(): HTMLElement
    abstract mapSrc(func?: (dom: HTMLElement, params: srcParam) => void): void
    abstract createMap(deltaX: number, deltaY: number, level: number): void
    abstract getUrl(dom: HTMLElement, params: srcParam): void

    abstract x: number
    abstract y: number
    abstract scale: number
}


class BaseMap extends AbstractMap {

    constructor(container: HTMLElement, config: MapConfig) {
        super()
            ;[this.minX, this.maxX] = config.xRange
            ;[this.minY, this.maxY] = config.yRange
            ;[this.imgHeight, this.imgWidth] = config.imgSize
            ;[this.minScale, this.maxScale] = config.scaleRange || [2 / 3, 1.5]
        this.minX -= 2*this.imgWidth
        this.maxX += 2*this.imgWidth
        this.minY -= 2*this.imgHeight
        this.maxY += 2*this.imgHeight


        const xDomain = this.maxX - this.minX
        const yDomain = this.maxY - this.minY

        try {
            if (xDomain <= 0 || yDomain <= 0) {
                throw 'map range can not be negative'
            }
            if (this.imgHeight <= 0 || this.imgWidth <= 0) {
                throw 'img size can not be negative'
            }
        } catch (e) {
            console.warn(e)
            return
        }


        this.colNum = Math.floor(xDomain / this.imgWidth)
        this.rowNum = Math.floor(yDomain / this.imgHeight)
        this.difX = this.colNum * this.imgWidth
        this.difY = this.rowNum * this.imgHeight


        this.rowList = new Array(this.rowNum).fill(0).map(() => [])
        this.colList = new Array(this.colNum).fill(0).map(() => [])
        const mask = document.createElement('div')
        this.mask = mask
        this.container = container
        mask.id = 'mask'
        container.appendChild(mask)
    }

    init(patchInit?: () => HTMLElement) {
        const { mask, container } = this
        if (patchInit) {
            this.patchInit = patchInit
        }
        //init
        for (let i = 0; i < this.rowNum; ++i) {
            for (let j = 0; j < this.colNum; ++j) {
                const patch = this.patchInit()
                patch.classList.add('map-img')
                mask.appendChild(patch)
                this.rowList[i].push(patch)
                this.colList[j].push(patch)
            }
        }
        addDrag(container, mask, this)
        const changeScrollStep = addScroll(container, mask, this, 0.5)
        this.createMap(-2, -2)
        //todo 初始时地图居中
        const partialX = ((this.maxX - this.minX) - this.colNum * this.imgWidth) / 2 + this.minX
        const partialY = ((this.maxY - this.minY) - this.rowNum * this.imgHeight) / 2 + this.minY
        console.log(partialX, partialY)
        this.x = partialX
        this.y = partialY
        return changeScrollStep
    }

    patchInit(): HTMLElement {
        const patch = document.createElement('div')
        const image = new Image()
        patch.appendChild(image)
        return patch
    }

    mapSrc(func?: (dom: HTMLElement, params: srcParam) => void) {
        if (func) {
            this._getUrl = func
        } else {
            return this._getUrl
        }
    }

    createMap(deltaX: number = 0, deltaY: number = 0, level: number = 0) {

        this._scale = 1
        this.rowEdge = 0
        this.colEdge = 0
        this.rowEdgeIndex = 0
        this.colEdgeIndex = 0
        this._xCoordinate = 0
        this._yCoordinate = 0

        this.level = level
        this.baseCol = deltaX
        this.baseRow = deltaY

        const { rowNum, colNum, rowList, mask } = this
        mask.style.transform = `translate3d(${0}px, ${0}px, 0) scale(${1})`
        // mask.style.transform = `scale(${1})`
        // mask.style.top = `${0}px`
        // mask.style.left = `${0}px`
        for (let i = 0; i < rowNum; ++i) {
            const row: imgList = rowList[i]
            for (let j = 0; j < colNum; ++j) {
                const img = row[j]
                this.getUrl(img, { y: i + deltaY, x: j + deltaX })
                img.style.top = `${i * 200}px`
                img.style.left = `${j * 200}px`
            }
        }
    }

    isDrag(drag: boolean) {
        if(drag) {
            this.mask.classList.add('mask-drag')
        } else {
            this.mask.classList.remove('mask-drag')
        }
    }
    //todo 修改为操作元素changeElement
    // 添加事件可能通过继承一个新的类,扩展此方法
    getUrl(dom: HTMLElement, params: srcParam) {
        // const img: any = dom.firstElementChild
        // const half = 500 * Math.pow(this.maxScale, this.level)
        params.level = this.level
        this._getUrl(dom, params)

        // if (!img.src) {
            // img.src = `http://127.0.0.1:8081/${this.level+1}-${params.x}-${params.y}.png`
        // }
        // img.height = 2 * half
        // img.width = 2 * half
        // img.style.left = `${-params.x * 200}px`
        // img.style.top = `${-params.y * 200}px`
    }
    _getUrl(dom: HTMLElement, params: srcParam) {
        // (<HTMLImageElement>dom).src = `http://127.0.0.1:8081/${params.level+1}-${params.x}-${params.y}.png`
    }


    _setScale(newScale: number): [number, number] {
        this.mask.classList.remove('mask-drag')
        const { mask, mouseX, mouseY, _scale: oldScale } = this
        const oldTop = this.y
        const oldLeft = this.x
        const top = mouseY * (oldScale - newScale) / oldScale + oldTop * newScale / oldScale
        const left = mouseX * (oldScale - newScale) / oldScale + oldLeft * newScale / oldScale
        //done: 调整缩放的原点
        // mask.style.transform = `scale(${newScale})`
        // mask.style.top = `${top}px`
        // mask.style.left = `${left}px`
        mask.style.transform = `translate3d(${left}px, ${top}px, 0) scale(${newScale})`
        this._scale = newScale
        this._xCoordinate = left
        this._yCoordinate = top

        return [left, top]
    }

    _setX(newX: number){
        const { minX, maxX, difX: dif } = this

        let upBound = (newX - minX) / this._scale - this.imgWidth
        let lowBonud = (newX - maxX) / this._scale + dif + this.imgWidth
        let round: number
        if (this.colEdge < upBound) {
            round = Math.floor((upBound - this.colEdge) / (this.colNum * this.imgWidth * this._scale))
            if (round > 0) {
                newX -= this.colNum * this.imgWidth * round * this._scale
                this.baseCol -= round * this.colNum
                upBound -= this.imgWidth * round * this.colNum
                this.refresh()
            }
        }
        while (this.colEdge < upBound) {
            this.colEdgeIndex--
            const paramX = this.colEdgeIndex + this.baseCol
            const col = posRemainer(this.colEdgeIndex, this.colNum)
            const startRow = posRemainer(this.rowEdgeIndex, this.rowNum)
            // 改成let key in的形式会比较好
            this.colList[col].forEach((img: HTMLElement, index) => {
                const partialRow = posRemainer(index - startRow, this.rowNum)
                const left = parseInt(img.style.left) - dif
                img.style.left = left + 'px'
                this.getUrl(img, { x: paramX, y: this.rowEdgeIndex + partialRow + this.baseRow })
            })
            this.colEdge += this.imgWidth
        }

        if (this.colEdge > lowBonud) {
            round = Math.floor((this.colEdge - lowBonud) / (this.colNum * this.imgWidth * this._scale))
            if (round > 0) {
                newX += this.colNum * this.imgWidth * round * this._scale
                this.baseCol += round * this.colNum
                lowBonud += this.imgWidth * round * this.colNum
                this.refresh()
            }
        }

        while (this.colEdge > lowBonud) {
            const paramX = this.colEdgeIndex + this.colNum + this.baseCol
            const col = posRemainer(this.colEdgeIndex, this.colNum)
            const startRow = posRemainer(this.rowEdgeIndex, this.rowNum)
            this.colList[col].forEach((img: HTMLElement, index) => {
                const partialRow = posRemainer(index - startRow, this.rowNum)
                const left = parseInt(img.style.left) + dif
                img.style.left = left + 'px'
                this.getUrl(img, { x: paramX, y: this.rowEdgeIndex + partialRow + this.baseRow })
            })
            this.colEdgeIndex++
            this.colEdge -= this.imgWidth
        }

        this._xCoordinate = newX
        this.mask.style.transform = `translate3d(${newX}px, ${this.y}px, 0) scale(${this.scale})`
    }

    _setY(newY:number){
        const { minY, maxY, difY: dif } = this
        let upBound = (newY - minY) / this._scale - this.imgHeight
        let lowBonud = (newY - maxY) / this._scale + dif + this.imgHeight
        let round: number
        if (this.rowEdge < upBound) {
            round = Math.floor((upBound - this.rowEdge) / (this.rowNum * this.imgHeight))
            if (round > 0) {
                newY -= this.rowNum * this.imgHeight * round * this._scale
                this.baseCol -= round * this.rowNum
                upBound -= this.imgHeight * round * this.rowNum
                this.refresh()
            }
        }
        while (this.rowEdge < upBound) {
            this.rowEdgeIndex--
            const paramY = this.rowEdgeIndex + this.baseRow
            const row = posRemainer(this.rowEdgeIndex, this.rowNum)
            const startCol = posRemainer(this.colEdgeIndex, this.colNum)
            this.rowList[row].forEach((img: HTMLElement, index) => {
                const partialCol = posRemainer(index - startCol, this.colNum)
                const top = parseInt(img.style.top) - dif
                img.style.top = top + 'px'
                this.getUrl(img, { x: this.colEdgeIndex + partialCol + this.baseCol, y: paramY })
            })
            this.rowEdge += this.imgHeight
        }


        if (this.rowEdge > lowBonud) {
            round = Math.floor((this.rowEdge - lowBonud) / (this.rowNum * this.imgHeight))
            if (round > 0) {
                newY += this.rowNum * this.imgHeight * round * this._scale
                this.baseCol += round * this.rowNum
                lowBonud += this.imgHeight * round * this.rowNum
                this.refresh()
            }
        }
        while (this.rowEdge > lowBonud) {
            const paramY = this.rowEdgeIndex + this.rowNum + this.baseRow
            const row = posRemainer(this.rowEdgeIndex, this.rowNum)
            const startCol = posRemainer(this.colEdgeIndex, this.colNum)
            this.rowList[row].forEach((img: HTMLElement, index) => {
                const partialCol = posRemainer(index - startCol, this.colNum)
                const top = parseInt(img.style.top) + dif
                img.style.top = top + 'px'
                this.getUrl(img, { x: this.colEdgeIndex + partialCol + this.baseCol, y: paramY })
            })

            this.rowEdgeIndex++
            this.rowEdge -= this.imgHeight
        }
        this._yCoordinate = newY
        this.mask.style.transform = `translate3d(${this.x}px, ${newY}px, 0) scale(${this.scale})`
    }


    get scale(): number {
        return this._scale
    }

    set scale(newScale: number) {
        if(!this.level && newScale < 1) return
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
        this._setScale(newScale)
    }

    get x(): number {
        return this._xCoordinate
    }
    get y(): number {
        return this._yCoordinate
    }

    //todo 改造setx set y
    //到边界禁止移动
    set x(newX: number) {
        this._setX(newX)
    }

    set y(newY: number) {
        this._setY(newY)
    }

    refresh() {
        console.log('refresh')
        const startRow = posRemainer(this.rowEdgeIndex, this.rowNum)
        const startCol = posRemainer(this.colEdgeIndex, this.colNum)
        this.rowList.forEach((rowList, rowIndex) => {
            const partialRow = posRemainer(rowIndex - startRow, this.rowNum)
            rowList.forEach((img, colIndex) => {
                const partialCol = posRemainer(colIndex - startCol, this.colNum)
                this.getUrl(img, { x: this.colEdgeIndex + partialCol + this.baseCol, y: this.rowEdgeIndex + partialRow + this.baseRow })
            })
        })
    }

}

export default BaseMap