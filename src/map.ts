interface srcParam {
    x: number,
    y: number,
    // layer: number,
    // option: string
}
function getData(dom: HTMLElement, params: srcParam) {

}



function addDrag(dom: HTMLElement): void {
    dom.style.position = 'absolute'

    let x = 0
    let y = 0
    let l = 0
    let t = 0
    let isDrag = false
    //todo 双向绑定
    const coordinate = {x:0, y:0}
    let left = 0
    let top = 0
    const mouseDown = (e: MouseEvent) => {
        e.preventDefault()
        x = e.clientX
        y = e.clientY
        l = dom.offsetLeft
        t = dom.offsetTop
        isDrag = true
    }
    const mouseUp = () => {
        isDrag = false
    }
    const mouseMove = (e: MouseEvent) => {
        if(!isDrag) return
        const clientX = e.clientX
        const clientY = e.clientY
        left = clientX - (x - l)
        top = clientY -(y - t)
        dom.style.left = left + 'px'
        dom.style.top = top + 'px'
    }
    window.onmousemove = mouseMove
    window.onmousedown = mouseDown
    window.onmouseup = mouseUp
}


type imgList = HTMLImageElement[]
class AbstractMap {
    rowList: imgList[]
    colList: imgList[]
    rowEdge: number
    colEdge: number
    baseUrl: string
    constructor(container: HTMLElement, baseUrl: string) {
        this.baseUrl = baseUrl
        const mask = document.createElement('div')
        console.log(mask)
        container.appendChild(mask)
        addDrag(mask)
        for(let i = 0; i < 8; ++i) {
            for(let j = 0; j < 8; ++j) {
                const img = new Image()
                img.src = this.getUrl({x: i, y: j})
                img.classList.add('map-img')
                img.style.left = i * 200 + 'px'
                img.style.top = j * 200 + 'px'
                mask.appendChild(img)
            }
        }
    }
    getUrl(params: srcParam) {
        return `${this.baseUrl}/${params.x}-${params.y}.png`
    }

}


export {AbstractMap}