interface srcParam {
    x: number,
    y: number,
    // layer: number,
    // option: string
}



function getData(dom: HTMLElement, params: srcParam) {

}



function addDrag(container: HTMLElement, dom: HTMLElement, map: AbstractMap): void {

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
        console.log(e)
        e.preventDefault()
        x = e.clientX
        y = e.clientY
        l = dom.offsetLeft
        t = dom.offsetTop
        isDrag = true
        dom.style.cursor = 'move'
        dom.classList.add('mask-drag')
    }
    const mouseMove = (e: MouseEvent) => {
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
    const mouseUp = () => {
        isDrag = false
        dom.style.cursor = null
        dom.classList.remove('mask-drag')
    }
    container.onmousemove = mouseMove
    container.onmousedown = mouseDown
    container.onmouseup = mouseUp
    container.oncontextmenu = function (e: MouseEvent) {
        e.preventDefault()
        console.log(123)
    }
}


function addScroll(container: HTMLElement, dom: HTMLElement, map: AbstractMap): void {
    const wheel = (e: MouseWheelEvent) => {
        const x = e.clientX - container.offsetLeft
        const y = e.clientY - container.offsetTop
        e.preventDefault()
        map.mouseX = x
        map.mouseY = y
        if (e.deltaY > 0) {
            map.scale -= 0.1
        } else {
            map.scale += 0.1
        }
    }
    container.onwheel = wheel
}

type imgList = HTMLImageElement[]
class AbstractMap {
    //图片数量
    rowNum = 4
    colNum = 4
    //图片尺寸
    imgWidth = 200
    imgHeight = 200
    rowList: imgList[]
    colList: imgList[]

    //图片上(左)边缘的坐标和索引
    rowEdge: number
    colEdge: number
    rowEdgeIndex = 0
    colEdgeIndex = 0
    //鼠标当前位置,用于缩放
    mouseX: number
    mouseY: number

    //地图的偏移量以及缩放比例
    private _xCoordinate: number
    private _yCoordinate: number
    private _scale: number


    mask: HTMLElement
    baseUrl: string
    constructor(container: HTMLElement, baseUrl: string) {
        this._scale = 1
        this.baseUrl = baseUrl
        this.rowList = new Array(this.rowNum).fill(0).map(() => [])
        this.colList = new Array(this.colNum).fill(0).map(() => [])
        this.rowEdge = 0
        this.colEdge = 0
        this._xCoordinate = 0
        this._yCoordinate = 0
        const mask = document.createElement('div')
        this.mask = mask
        mask.id = 'mask'
        //init
        mask.style.left = '0px'
        mask.style.top = '0px'
        container.appendChild(mask)
        addDrag(container, mask, this)
        addScroll(container, mask, this)
        for (let i = 0; i < this.rowNum; ++i) {
            for (let j = 0; j < this.colNum; ++j) {
                const img = new Image()
                img.src = this.getUrl({ x: i, y: j })
                img.classList.add('map-img')
                img.style.top = i * 200 + 'px'
                img.style.left = j * 200 + 'px'
                mask.appendChild(img)
                this.rowList[i].push(img)
                this.colList[j].push(img)
            }
        }
        console.log(this.rowList, this.colList)
    }
    getUrl(params: srcParam) {
        return `${this.baseUrl}/${params.x}-${params.y}.png`
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
        //todo 判断当scale到达一定程度之后刷新图层
        const {mask, mouseX, mouseY, _scale: oldScale} = this
        const oldTop = parseInt(mask.style.top)
        const oldLeft = parseInt(mask.style.left)
        const top = oldTop + (mouseY - oldTop) * (oldScale - newScale) / newScale
        const left = oldLeft + (mouseX -oldLeft) *(oldScale - newScale) / newScale

        //todo: 调整缩放的原点
        mask.style.transform = `scale(${newScale})`
        mask.style.top = `${top}px`
        mask.style.left = `${left}px`
        this._scale = newScale
    }

    set x(newX: number) {
        this.mask.style.left = newX + 'px'

        const dif = 800
        const minX = 0
        const maxX = 1000
        this._xCoordinate = newX

        const upBound = (newX - minX) / this._scale - this.imgWidth
        const lowBonud = (newX - maxX) / this._scale + dif + this.imgWidth
        while (this.colEdge < upBound) {
            this.colEdgeIndex = this.colEdgeIndex ? this.colEdgeIndex : this.colNum
            this.colEdgeIndex--
            for (let img of this.colList[this.colEdgeIndex]) {
                const left = parseInt(img.style.left) - dif
                img.style.left = left + 'px'
            }
            this.colEdge += this.imgWidth
        }

        while (this.colEdge > lowBonud) {
            for (let img of this.colList[this.colEdgeIndex]) {
                const left = parseInt(img.style.left) + dif
                img.style.left = left + 'px'
            }
            this.colEdgeIndex++
            this.colEdgeIndex %= this.colNum
            this.colEdge -= this.imgWidth
        }
    }

    set y(newY: number) {
        this.mask.style.top = newY + 'px'

        const dif = 800
        const minY = 0
        const maxY = 1000
        this._yCoordinate = newY
        const upBound = (newY - minY) / this._scale - this.imgHeight
        const lowBonud = (newY - maxY) / this._scale + dif + this.imgHeight
        while (this.rowEdge < upBound) {
            this.rowEdgeIndex = this.rowEdgeIndex ? this.rowEdgeIndex : this.rowNum
            this.rowEdgeIndex--
            //todo 考虑图片加载(利用位置) rowEdge不能取余要累计计数
            for (let img of this.rowList[this.rowEdgeIndex]) {
                const top = parseInt(img.style.top) - dif
                img.style.top = top + 'px'
            }
            this.rowEdge += this.imgHeight
        }
        while (this.rowEdge > lowBonud) {
            for (let img of this.rowList[this.rowEdgeIndex]) {
                const top = parseInt(img.style.top) + dif
                img.style.top = top + 'px'
            }
            this.rowEdgeIndex++
            this.rowEdgeIndex %= this.rowNum
            this.rowEdge -= this.imgHeight
        }

    }

}


export { AbstractMap }