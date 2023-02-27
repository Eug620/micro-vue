// 创建blob对象
function downloadBlob(url: string) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.responseType = 'blob'

        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(xhr.response)
            } else {
                reject(new Error(xhr.statusText || 'Download failed.'))
            }
        }
        xhr.onerror = function () {
            reject(new Error('Download failed.'))
        }
        xhr.send()
    })
}
// clone https://github.com/eligrey/FileSaver.js/blob/master/src/FileSaver.js
function click(node: any, a: any) {
    try {
        node.dispatchEvent(new MouseEvent('click'))
    } catch (e) {
        var evt = document.createEvent('MouseEvents')
        evt.initMouseEvent(
            'click',
            true,
            true,
            window,
            0,
            0,
            0,
            80,
            20,
            false,
            false,
            false,
            false,
            0,
            null
        )
        node.dispatchEvent(evt)
    }
}
function downloadURL(url: string, name = '') {
    const link = document.createElement('a')
    link.download = name
    link.href = url
    if ('download' in document.createElement('a')) {
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    } else {
        // 对不支持download进行兼容
        click(link, (link.target = '_blank'))
    }
}
// 主要用于下载导出的代码
export function downloadFile(url: string, fileName: string = '') {
    return downloadBlob(url)
        .then((resp: any) => {
            if (resp?.blob) {
                return resp.blob()
            } else {
                return new Blob([resp])
            }
        })
        .then(blob => URL.createObjectURL(blob))
        .then(url => {
            downloadURL(url, fileName)
            URL.revokeObjectURL(url)
        })
        .catch(err => {
            throw new Error(err.message)
        })
}
