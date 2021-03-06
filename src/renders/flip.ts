/**
 * @file fade.ts 翻转翻页效果
 * 
 * @author: zhangbobell
 * @email: zhangbobell@163.com
 * 
 * @created: 2017.06.27
 */


import Render from '../render';
import { EMPTY_PAGE, OPPSITE } from '../constant';

type Sign = 0 | -1 | 1;

export default class Flip extends Render {
    
    doRender(swiper:any) {
        const axis = swiper.axis;
        const sideOffset = swiper.sideOffset;
        const sideLength = swiper.sideLength;   
        const rotateAxis = OPPSITE[axis];

        const rotateSign: Sign = axis === 'Y' ? -1 : 1;

        // compute
        const swiperCss = `-webkit-perspective:${sideLength * 4}px;-webkit-transform-style:flat;`;
        const currentTransform = `translateZ(${sideLength / 2}px) rotate${rotateAxis}(${rotateSign * 180 * sideOffset / sideLength}deg) scale(0.875)`;
        const activeTransform = `translateZ(${sideLength / 2}px) rotate${rotateAxis}(${rotateSign * 180 * (sideOffset / sideLength + 1) }deg) scale(0.875)`;

        // apply
        swiper.$swiper.style.cssText = swiperCss;

        swiper.currentPage.style.webkitBackfaceVisibility = 'hidden';
        swiper.currentPage.style.webkitTransform = currentTransform;
        if (swiper.activePage !== EMPTY_PAGE) {
            swiper.activePage.style.webkitBackfaceVisibility = 'hidden';
            swiper.activePage.style.webkitTransform = activeTransform;
            swiper.activePage.style.zIndex = 7;
        }
    }
}