window.addEventListener('load', function() {
            // 1. 获取元素
            var arrow_l = document.querySelector('.arrow-l');
            var arrow_r = document.querySelector('.arrow-r');
            var focus = document.querySelector('.focus');
            var focusWidth = focus.offsetWidth;
            // 2. 鼠标经过focus 就显示隐藏左右按钮
            focus.addEventListener('mouseenter', function() {
                arrow_l.style.display = 'block';
                arrow_r.style.display = 'block';
                clearInterval(timer);
                timer = null; // 清除定时器变量
            });
            focus.addEventListener('mouseleave', function() {
                arrow_l.style.display = 'none';
                arrow_r.style.display = 'none';
                timer = setInterval(function() {
                    //手动调用点击事件
                    arrow_r.click();
                }, 2000);
            });
            // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
            var ul = focus.querySelector('ul');
            var ol = focus.querySelector('.circle');
            // console.log(ul.children.length);
            for (var i = 0; i < ul.children.length; i++) {
                // 创建一个小li 
                var li = document.createElement('li');
                // 记录当前小圆圈的索引号 通过自定义属性来做 
                li.setAttribute('index', i);
                // 把小li插入到ol 里面
                ol.appendChild(li);
                // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
                li.addEventListener('click', function() {
                    // 干掉所有人 把所有的小li 清除 current 类名
                    for (var i = 0; i < ol.children.length; i++) {
                        ol.children[i].className = '';
                    }
                    // 留下我自己  当前的小li 设置current 类名
                    this.className = 'current';
                    // 5. 点击小圆圈，移动图片 当然移动的是 ul 
                    // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
                    // 当我们点击了某个小li 就拿到当前小li 的索引号
                    var index = this.getAttribute('index');
                    // 当我们点击了某个小li 就要把这个li 的索引号给 num  
                    num = index;
                    // 当我们点击了某个小li 就要把这个li 的索引号给 circle  
                    circle = index;
                    // num = circle = index;
                    console.log(focusWidth);
                    console.log(index);

                    animate(ul, -index * focusWidth);
                })
            }
            // 把ol里面的第一个小li设置类名为 current
            ol.children[0].className = 'current';