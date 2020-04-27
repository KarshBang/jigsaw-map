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
        e.preventDefault()
        x = e.clientX
        y = e.clientY
        l = dom.offsetLeft
        t = dom.offsetTop
        isDrag = true
        dom.style.cursor = 'move'
    }
    const mouseMove = (e: MouseEvent) => {
        if (!isDrag) return
        const clientX = e.clientX
        const clientY = e.clientY
        left = clientX - (x - l)
        top = clientY - (y - t)
        map.x = left
        map.y = top
        dom.style.left = left + 'px'
        dom.style.top = top + 'px'
    }
    const mouseUp = () => {
        isDrag = false
        dom.style.cursor = null
    }
    container.onmousemove = mouseMove
    container.onmousedown = mouseDown
    container.onmouseup = mouseUp
}


type imgList = HTMLImageElement[]
class AbstractMap {
    rowNum = 4
    colNum = 4
    imgWidth = 200
    imgHeight = 200
    rowList: imgList[]
    colList: imgList[]
    rowEdge: number
    colEdge: number
    rowEdgeIndex = 0
    colEdgeIndex = 0
    baseUrl: string
    private _xCoordinate: number
    private _yCoordinate: number
    constructor(container: HTMLElement, baseUrl: string) {
        this.baseUrl = baseUrl
        this.rowList = new Array(this.rowNum).fill(0).map(() => [])
        this.colList = new Array(this.colNum).fill(0).map(() => [])
        this.rowEdge = 0
        this.colEdge = 0
        this._xCoordinate = 0
        this._yCoordinate = 0
        const mask = document.createElement('div')
        container.appendChild(mask)
        addDrag(container, mask, this)
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

    set x(newX: number) {
        const dif = 800
        const minX = 0
        const maxX = 1000
        this._xCoordinate = newX

        const upBound = newX - this.imgWidth - minX
        const lowBonud = newX + dif + this.imgWidth - maxX
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
        const dif = 800
        const minY = 0
        const maxY = 1000
        this._yCoordinate = newY
        const upBound = newY - this.imgHeight - minY
        const lowBonud = newY + dif + this.imgHeight - maxY
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