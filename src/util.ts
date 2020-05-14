export const throttle = (func: Function, time: number) => {
    let timeout: any = null
    return function () {
        if (timeout !== null) return
        const context = this
        const args = arguments
        func.apply(context, args)
        timeout = setTimeout(() => {
            timeout = null
        }, time)
    }
}


export function getTop(e: HTMLElement | Element): number {
    if((<HTMLElement>e).offsetTop === undefined) {
        return 0
    }
    let offset = (<HTMLElement>e).offsetTop
    if ((<HTMLElement>e).offsetParent) offset += getTop((<HTMLElement>e).offsetParent)
    return offset
}  

export function getLeft(e: HTMLElement | Element): number {
    if((<HTMLElement>e).offsetLeft === undefined) {
        return 0
    }
    let offset = (<HTMLElement>e).offsetLeft
    if ((<HTMLElement>e).offsetParent) offset += getLeft((<HTMLElement>e).offsetParent)
    return offset
}  




