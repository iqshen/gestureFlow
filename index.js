/**
 * @file index.js
 * @author wangning
 */
/* globals window */

let dom = document.body;
let rightButtonDownFlag = false;

dom.addEventListener('contextmenu', function (e) {
    console.log('contextmenu', e);
    e.preventDefault();
});
dom.addEventListener('mousedown', function (e) {
    if (e.button === 2) {
        rightButtonDownFlag = true;
    }
});
dom.addEventListener('mousemove', function (e) {
    if (rightButtonDownFlag) {
        let dot = document.createElement('div');
        dot.setAttribute('style', `width: 3px;height:3px;position:fixed;top:${e.pageY}px;left:${e.pageX}px;background-color:blue;`);
        document.body.appendChild(dot);
    }
});
dom.addEventListener('mouseup', function (e) {
    if (e.button === 2) {
        rightButtonDownFlag = false;
    }
});
