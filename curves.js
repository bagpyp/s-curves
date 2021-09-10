$(document).ready(() => {
    fillCorners()
})

const curvature = parseInt(/[0-9]+/.exec(getComputedStyle(document.documentElement)
    .getPropertyValue('--curvature'))[0])

const fillCorners = () => {
    let curves = $(".curved")
    // fillCorner(curves[4])
    curves.toArray().forEach(c => {
        fillCorner(c)
    })
}

const fillCorner = (c) => {
    if (c.previousElementSibling==null) {
        fillBottom(c)
    }
    else if (c.nextElementSibling==null) {
        fillTop(c)
    }
    else {
        fillBottom(c)
        fillTop(c)
    }
}

const fillBottom = (curve) => {
    let box = curve.getBoundingClientRect()
    let next = curve.nextElementSibling
    html2canvas(next).then(c => {

        let img = document.createElement('img')
        let data = c.toDataURL()
        if (data != "data:,") {
            img.src = data
            img.style = `transform: scaleY(-1);
                        width: ${box.width}px;
                        height: ${box.height}px;
                        position: absolute;
                        top: ${box.y}px;
                        left: ${box.x}px;
                        z-index: -1000;
                        border-bottom-right-radius: ${curvature}px;`
            curve.append(img)
        }
    }
)}

const fillTop = (curve) => {
    let box = curve.getBoundingClientRect()
    let previous = curve.previousElementSibling
    html2canvas(previous).then(c => {
        let img = document.createElement('img')
        let data = c.toDataURL()
        if (data != undefined) {
            img.src = data
            img.style = `transform: scaleY(-1);
                        width: ${box.width}px;
                        height: ${box.height}px;
                        position: absolute;
                        top: ${box.y}px;
                        left: ${box.x}px;
                        z-index: -1000;
                        border-top-left-radius: ${curvature}px;`
            curve.background = 
            curve.append(img)
        }
    }
)}
