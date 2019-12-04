export const dealTime = (value, format) => {

    let type = ''
    let haseRight = false
    let lf = ''
    let rg = ''
    let right = [] // 时分秒
    let left = [] // 年月日
    let y, m, d, h, ms, s
    if (!value) return
    let newlef

    const date = new Date(value)
    y = date.getFullYear()
    m = date.getMonth() + 1
    d = date.getDate()
    h = toTime(date.getHours())
    ms = toTime(date.getMinutes())
    s = toTime(date.getSeconds())

    if (format) {
        if (format.indexOf(' ') === -1) {
            haseRight = false
            lf = format
        } else {
            haseRight = true
            const a = format.indexOf(' ')
            lf = format.slice(0, a)
            rg = format.slice(a + 1)
        }
    } else {
        haseRight = false
    }
    if (lf === 'YYYY-MM-DD' || lf === 'YYYY/MM/DD') {
        left = [y, m, d]
    }
    if (lf === 'YYYY-MM' || lf === 'YYYY/MM') {
        left = [y, m]
    }
    if (lf === 'YYYY') {
        left = [y]
    }
    switch (lf) {
        case 'YYYY-MM-DD':
        case 'YYYY-MM':
        case 'MM-DD':
            type = '-'
            break;
        case 'YYYY/MM/DD':
        case 'YYYY/MM':
        case 'MM/DD':
            type = '/'
            break;
        case 'YYYY':
            type = 'y'
            break
        default: type = ''
    }

    switch (rg) {
        case 'HH:mm':
            right = [h, ms]
            break;
        default:
            right = [h, ms, s]
    }

    if (!type) {
        newlef = y + '年' + m + '月' + d + '日'
    } else if (type) {
        if (type === 'y') {
            newlef = left.join('')
        } else {
            newlef = left.join(type)
        }
    }
    return newlef + ' ' + (haseRight ? right.join(':') : '')
}
//#endregion
function toTime(value) {
    return value > 9 ? value + '' : '0' + value
}