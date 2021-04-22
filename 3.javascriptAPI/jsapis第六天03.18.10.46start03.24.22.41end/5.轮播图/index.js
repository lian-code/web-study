window.addEventListener('load', function() {

    // 1.获取元素
    var div = document.querySelector('div');
    var spans = document.querySelectorAll('span');
    var banner = document.querySelector('.banner');
    var littleround = document.querySelector('.littleround');
    console.log(spans);

    // 2.鼠标移入盒子显示按钮，停止自动滑动；移除隐藏按钮，开启自动滑动；
    div.addEventListener('mouseenter', function() {
        spans[0].style.display = 'block';
        spans[1].style.display = 'block';
        // 5.移除自动滑动；
        clearInterval(clickAuto);
    })
    div.addEventListener('mouseleave', function() {
        spans[0].style.display = 'none';
        spans[1].style.display = 'none';
        // 5.每隔3秒自动滑动图片(3秒点击一次按钮)
        clickAuto = setInterval(function() {
            spans[1].click();
        }, 1000);

    })

    // 3.banner栏动画需要克隆第一张图片，追加给banner子元素
    var lilast = banner.children[0].cloneNode(true); //克隆第一张图片
    banner.appendChild(lilast); //追加第一张图片
    console.log(lilast);

    // 4.点击按钮滑动图片
    var flag = 0;
    var littlenum = 0;
    var jieliu = true;
    spans[1].addEventListener('click', function() {
        if (jieliu) {
            jieliu = false;
            if (flag == banner.children.length - 1) {
                banner.style.left = 0;
                flag = 0;
            }
            flag++;
            animate(banner, -721 * flag, function() {
                jieliu = true;
            });
            littlenum++;
            if (littlenum == littleround.children.length) {
                littlenum = 0;
            }
            littleroundcolor();

        }
    })

    spans[0].addEventListener('click', function() {
        if (jieliu) {
            jieliu = false;
            if (flag == 0) {
                banner.style.left = -721 * (banner.children.length - 1) + 'px';
                flag = banner.children.length - 1;
            }
            flag--;
            animate(banner, -721 * flag, function() {
                jieliu = true;
            });
            littlenum--;
            if (littlenum == -1) {
                littlenum = littleround.children.length - 1;
            }
            console.log(littlenum);
            littleroundcolor();

        }
    })

    // 5.每隔3秒自动滑动图片(3秒点击一次按钮)
    var clickAuto = setInterval(function() {
        spans[1].click();
        console.log(flag);
    }, 1000);

    // 6.有多少图片创建多少个小圆圈,用for循环
    for (var i = 0; i < banner.children.length - 1; i < i++) {
        var lili = document.createElement('li');
        littleround.appendChild(lili);
    }

    // 7.第一个小圆圈默认有红色背景颜色
    littleround.children[0].className = 'littleroundcolor';
    // 8.点击去除所有按钮的背景颜色，留下flag相等的小圆圈；写成函数，需要即调用
    function littleroundcolor() {
        for (var i = 0; i < littleround.children.length; i++) {
            littleround.children[i].className = '';
        }
        littleround.children[littlenum].className = 'littleroundcolor';
    }
})