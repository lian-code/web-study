$(function() {
    // 1.电梯渐渐出模块start
    // 封装一个函数，页面加载的时候就调用、
    var flag = true;

    function lifts() {
        if ($(document).scrollTop() >= $(".recom-hd").offset().top) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    }
    lifts() //调用函数
    $(document).scroll(function() {
        lifts();
        // 四.移动到模块，则对应索引号的按钮变换底色
        // 思路：用页面滚动事件scroll，遍历每个模块，当页面被卷去大于当前模块，打印当前模块的索引号，添加对应索引号的的按钮底色类名，清除其余兄弟的类名
        if (flag) {
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("current").siblings(".fixedtool li").removeClass("current");
                }
            });
        }
    });
    // 1.电梯渐渐出模块end



    // 2.点击左侧小按钮返回对应索引号的小模块
    // 思路：点击$(".fixedtool li")返回对应的索引号，页面则滚动到$(".floor .w").eq(索引号)的offset().top。用动画滚动
    $(".fixedtool li").click(function() {
        flag = false;
        //点击的当前小例的index值
        console.log($(this).index());
        // 获取$(".floor .w")对应索引号的模块距离顶部的距离
        var distanceTop = $(".floor .w").eq($(this).index()).offset().top;
        // 让页面通过动画滚动到distanceTop这个位置
        console.log(distanceTop);
        $("html").stop().animate({
            scrollTop: distanceTop
        }, function() {
            flag = true;
        });
        // 三.点击左侧小按钮底色更换start
        $(this).addClass("current").siblings().removeClass();

    });
    // 2.点击左侧小按钮返回对应索引号的小模块end




})