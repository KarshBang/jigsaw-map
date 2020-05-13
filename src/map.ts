interface srcParam {
    x: number,
    y: number,
    // level: number,
    // option: string
}

const dif = 800
const minX = 0
const maxX = 1000
const minY = 0
const maxY = 1000

const LEVEL_SCALE = 2


function getUrl(dom: HTMLElement, params: srcParam) {
    dom.innerHTML = `${this.level}-${params.x + this.baseCol}-${params.y + this.baseRow}`
    // return `${this.baseUrl}/${params.x}-${params.y}.png`
}

function posRemainer(a: number, b: number): number {
    const res = a % b
    return res < 0 ? res + b : res
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
//todo 修改为 HTMLImageElement
type imgList = HTMLElement[]
class AbstractMap {
    level: number
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
    rowEdgeIndex: number
    colEdgeIndex: number
    //鼠标当前位置,用于缩放
    mouseX: number
    mouseY: number

    baseCol: number
    baseRow: number

    //地图的偏移量以及缩放比例
    private _xCoordinate: number
    private _yCoordinate: number
    private _scale: number


    mask: HTMLElement
    baseUrl: string
    constructor(container: HTMLElement, baseUrl: string) {
        this.baseUrl = baseUrl
        this.rowList = new Array(this.rowNum).fill(0).map(() => [])
        this.colList = new Array(this.colNum).fill(0).map(() => [])
        const mask = document.createElement('div')
        this.mask = mask
        mask.id = 'mask'
        //init
        container.appendChild(mask)
        addDrag(container, mask, this)
        addScroll(container, mask, this)
        for (let i = 0; i < this.rowNum; ++i) {
            for (let j = 0; j < this.colNum; ++j) {
                //todo 先用div测试
                // const img = new Image()
                const img = document.createElement('div')
                const image = new Image()
                img.appendChild(image)
                img.classList.add('map-img')
                mask.appendChild(img)
                this.rowList[i].push(img)
                this.colList[j].push(img)
            }
        }
        this.createMap()
        console.log(this.rowList, this.colList)
    }

    createMap(deltaX: number = 0, deltaY: number = 0, level: number = 0) {
        console.log(deltaX, deltaY)
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
        mask.style.transform = `scale(${1})`
        mask.style.top = `${0}px`
        mask.style.left = `${0}px`
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
        const half = this.level ? 1500 : 1000
        if (!img.src) {
            img.src = 'http://127.0.0.1:8081/_MG_0016%20Panorama.jpg'
        }
        img.height = 2 * half
        img.width = 2 * half
        img.style.left = `${-params.x * 200 - half}px`
        img.style.top = `${-params.y * 200 - half}px`
        // return `${this.baseUrl}/${params.x}-${params.y}.png`
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
            //BUG 这个式子可能有问题 miny 应该也应该*newScale
            // const newLeft = (left - minX) - this.colEdge * newScale
            const newLeft = left - (minX + this.colEdge) * newScale
            const newTop = top - (minY + this.rowEdge) * newScale

            // const numberX = Math.floor((mouseX - newLeft) / newScale / this.imgWidth)
            // const imgOffsetLeft = (mouseX - newLeft - numberX * newScale * this.imgWidth) / newScale

            // const numberY = Math.floor((mouseY - newTop) / newScale / this.imgHeight)
            // const imgOffsetTop = (mouseY - newTop - numberY * newScale * this.imgHeight) / newScale
            // console.log(numberX, numberY, imgOffsetLeft, imgOffsetTop)

            //计算总坐标

            // const col = posRemainer(this.colEdgeIndex, this.colNum)
            // const row = posRemainer(this.rowEdgeIndex, this.rowNum)
            // const imgPartialX = parseInt(this.colList[col][0].style.left) * newScale
            // const imgPartialY = parseInt(this.rowList[row][0].style.top) * newScale

            //缩放后地图左上角对应画布的位置



            const scaleUnit = 15 //目前尺寸一张图片所占地图大小
            const baseCol = 0
            const baseRow = 0
            //todo: 加入baserow
            //todo: 坐标越界直接取余
            const mapX = (baseCol + this.colEdgeIndex) * scaleUnit
            const mapY = (baseRow + this.rowEdgeIndex) * scaleUnit
            console.log(mapX, mapY)

            const newScaleUnit = 10
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
            setTimeout(() => {

                this.x = newLeft + partialX
                this.y = newTop + partialY
            }, 1000)

            return
        }




    }
    //todo 改造setx set y
    //到边界禁止移动
    set x(newX: number) {
        this.mask.style.left = newX + 'px'
        this._xCoordinate = newX

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
        this.mask.style.top = newY + 'px'
        this._yCoordinate = newY
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


export { AbstractMap }