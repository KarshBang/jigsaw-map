import { throttle, getLeft, getTop } from './util'
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
}

interface srcParam {
    x: number,
    y: number,
    // level: number,
    // option: string
}

function posRemainer(a: number, b: number): number {
    const res = a % b
    return res < 0 ? res + b : res
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
        dom.classList.add('mask-drag')
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
        dom.classList.remove('mask-drag')
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
    } )
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
        this.minX -= this.imgWidth
        this.maxX += this.imgWidth
        this.minY -= this.imgHeight
        this.maxY += this.imgHeight


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

    init(patchInit?: () => HTMLElement, ) {
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
        const changeScrollStep = addScroll(container, mask, this)
        this.createMap(-1,-1)
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
            this.getUrl = func
        } else {
            return this.getUrl
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

    //todo 修改为操作元素changeElement
    // 添加事件可能通过继承一个新的类,扩展此方法
    getUrl(dom: HTMLElement, params: srcParam) {
        const img: any = dom.firstElementChild
        const half = 500 * Math.pow(1.5, this.level)

        if (!img.src) {
            img.src = 'http://192.168.0.106:8081/_MG_0247.jpg'
        }
        img.height = 2 * half
        img.width = 2 * half
        img.style.left = `${-params.x * 200}px`
        img.style.top = `${-params.y * 200}px`
    }

    get x(): number {
        return this._xCoordinate
    }
    get y(): number {
        return this._yCoordinate
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
        this._setScale(newScale)
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


    //todo 改造setx set y
    //到边界禁止移动
    set x(newX: number) {
        this.mask.style.transform = `translate3d(${newX}px, ${this.y}px, 0) scale(${this.scale})`
        // this.mask.style.left = newX + 'px'
        this._xCoordinate = newX

        const { minX, maxX, difX: dif } = this

        const upBound = (newX - minX) / this._scale - this.imgWidth
        const lowBonud = (newX - maxX) / this._scale + dif + this.imgWidth
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
    }

    set y(newY: number) {
        this.mask.style.transform = `translate3d(${this.x}px, ${newY}px, 0) scale(${this.scale})`
        // this.mask.style.top = newY + 'px'
        this._yCoordinate = newY

        const { minY, maxY, difY: dif } = this
        const upBound = (newY - minY) / this._scale - this.imgHeight
        const lowBonud = (newY - maxY) / this._scale + dif + this.imgHeight
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
            for (let img of this.rowList[row]) {

            }
            this.rowEdge += this.imgHeight
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

    }

}

export default BaseMap