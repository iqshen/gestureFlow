/**
 * @file index.js
 * @author wangning
 */
/* globals window */

let dom = document.body;
let gestureContainerDom = null;
let rightButtonDownFlag = false;
let lastDot = null;

let calAngle = function (x, y) {
    const radian = getCos(x, y);
    let angle = Math.acos(radian) * 180 / Math.PI;

    if (x < 0) {
        angle = -angle;
    }
    return (angle + 360) % 360;

    // 计算余弦
    function getCos(x, y) {
        let a = [x, y];
        let b = [0, 1];
        return calCos(a, b);
    }
    function calCos(a, b) {
        // 点积
        let dotProduct = a[0] * b[0] + a[1] * b[1];
        let d = Math.sqrt(a[0] * a[0] + a[1] * a[1]) * Math.sqrt(b[0] * b[0] + b[1] * b[1]);
        return dotProduct / d;
    }
};

/**
 * 根据起点终点
 *
 * @param {Array} param0 起点
 * @param {Array} param1 终点
 */
let drawLine = function ([x1, y1], [x2, y2]) {
    let angle = calAngle(x2 - x1, y2 - y1);
    if (isNaN(angle)) {
        return;
    }
    let norm = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    let lineDom = document.createElement('div');
    lineDom.setAttribute('style', `width: ${norm}px;height:3px;position:fixed;top:${x1}px;left:${y1}px;background-color:blue;transform-origin: top left;transform: rotate(${angle}deg);`);
    gestureContainerDom.appendChild(lineDom);
};

dom.addEventListener('contextmenu', function (e) {
    console.log('contextmenu', e);
    e.preventDefault();
});
dom.addEventListener('mousedown', function (e) {
    if (e.button === 2) {
        rightButtonDownFlag = true;
        lastDot = null;
        gestureContainerDom = document.createElement('div');
        document.body.appendChild(gestureContainerDom);
    }
});
dom.addEventListener('mousemove', function (e) {
    if (rightButtonDownFlag) {
        // let dot = document.createElement('div');
        // dot.setAttribute('style', `width: 3px;height:3px;position:fixed;top:${e.clientY + dom.offsetTop}px;left:${e.clientX + dom.offsetLeft}px;background-color:blue;`);
        // document.body.appendChild(dot);

        // console.log(e);
        lastDot ? drawLine([e.clientY + dom.offsetTop, e.clientX + dom.offsetLeft], lastDot) : null;
        lastDot = [e.clientY + dom.offsetTop, e.clientX + dom.offsetLeft];
    }
});
dom.addEventListener('mouseup', function (e) {
    if (e.button === 2) {
        rightButtonDownFlag = false;
        lastDot = null;
        gestureContainerDom.remove();
        gestureContainerDom = null;
    }
});
