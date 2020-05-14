export const throttle = (func: Function, time: number) => {
    let timeout:any = null
    return function () {
        if (timeout !== null) return
        const context = this
        const args = arguments
        func.apply(context, args)
        timeout = setTimeout(() => {
            timeout = null
        },time)
    }
}

