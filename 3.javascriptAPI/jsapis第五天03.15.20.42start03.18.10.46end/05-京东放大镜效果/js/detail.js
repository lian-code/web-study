window.addEventListener('load', function() {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    preview_img.addEventListener('mousemove', function(e) {
        console.log(e.pageX); //距离页面x轴的距离
        console.log(e.pageY); //距离页面y轴的距离
        console.log(this.offsetLeft); //preview_img距离页面x轴的距离
        console.log(this.offsetTop); //preview_img距离页面y轴的距离
        var maskX = e.pageX - this.offsetLeft; //鼠标在preview_img中的x坐标
        var maskY = e.pageY - this.offsetTop; //鼠标在preview_img中的y坐标
        var maskXX = maskX - mask.offsetWidth / 2; //使鼠标居中mask
        var maskYY = maskY - mask.offsetHeight / 2; //使鼠标居中mask
        var maskMaxX = preview_img.offsetWidth - mask.offsetWidth; //mask x轴最大移动距离
        var maskMaxY = preview_img.offsetHeight - mask.offsetHeight; //mask y轴最大移动距离
        if (maskXX < 0) {
            maskXX = 0;
        } else if (maskXX > maskMaxX) {
            maskXX = maskMaxX;
        } //限制mask在preview_img中活动
        if (maskYY < 0) {
            maskYY = 0;
        } else if (maskYY > maskMaxY) {
            maskYY = maskMaxY;
        } //限制mask在preview_img中活动
        mask.style.left = maskXX + 'px'; //把鼠标的x坐标给mask,mask跟随鼠标移动
        mask.style.top = maskYY + 'px'; //把鼠标的y坐标给mask,mask跟随鼠标移动
        // mask移动bigImg跟随移动，事件源preview_img > msak,bigImg > big;
        // maskXX maskMaxX 跟 bigXX bigMaxX
        var bigImg = document.querySelector('.bigImg');
        var bigMaxX = bigImg.offsetWidth - big.offsetWidth;
        var bigMaxY = bigImg.offsetHeight - big.offsetHeight;
        var bigXX = maskXX * bigMaxX / maskMaxX;
        var bigYY = maskYY * bigMaxY / maskMaxY;
        bigImg.style.left = -bigXX + 'px';
        bigImg.style.top = -bigYY + 'px';

    })
})