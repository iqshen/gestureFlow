/**
 * @file index.js
 * @author wangning
 */
/* globals window document */

import {drawLine} from './utils';

let dom = document.body;
let gestureContainerDom = null;
let rightButtonDownFlag = false;
let lastDot = null;



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
        lastDot
        ? gestureContainerDom.appendChild(drawLine([e.clientY + dom.offsetTop, e.clientX + dom.offsetLeft], lastDot))
            : null;
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
