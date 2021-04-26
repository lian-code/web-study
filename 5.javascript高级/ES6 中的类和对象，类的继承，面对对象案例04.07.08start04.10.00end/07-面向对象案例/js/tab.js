// var id = document.querySelector("#tab");
// console.log(id);
var that;
class Tab {
    constructor(id) {
            that = this;
            // 获取元素
            // this.main就是#tab的js元素
            this.main = document.querySelector(id);
            // 获取加号元素
            this.add = this.main.querySelector('.tabadd');
            // 获取ul
            this.ul = this.main.querySelector('.fisrstnav ul');
            // 获取大内容
            this.tabscon = this.main.querySelector('.tabscon');
            // 调用函数
            this.init();
        }
        // 初始化模块、
    init() {
        // this.lis就是所有小例元素
        this.lis = this.main.querySelectorAll('li');
        // this.sections就是所有部分内容元素
        this.sections = this.main.querySelectorAll('section');
        // 获取叉号
        this.removes = this.main.querySelectorAll('.icon-guanbi');
        // 获取span
        this.spans = this.main.querySelectorAll('li span:first-child');
        // 用for循环给所有小例添加点击事件
        for (var i = 0; i < this.lis.length; i++) {
            // 给所有小例添加索引号绑定事件
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            // 给所有的叉号添加索引号绑定事件
            this.removes[i].onclick = this.removeTab;
            // 给所有span跟section绑定双击事件
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
        this.add.onclick = this.addTab;
    }
    clearClass() {
            // 把所有小例或内容清空或隐藏
            for (var i = 0; i < that.lis.length; i++) {
                that.lis[i].className = '';
                that.sections[i].className = '';
            };
        }
        // 1.切换功能
    toggleTab() {
            that.clearClass();
            // 再给当前的小例跟对应的内容添加类；
            this.className = 'liactive';
            // 对应内容索引号就是当前小例的index;
            that.sections[this.index].className = 'conactive';
        }
        // 2.添加功能
    addTab() {
            // 清空添加的小例之前所有小例section的类名
            that.clearClass();
            var random = Math.random();
            // 创建小例在ul中追加        用insertAdjacentHTML();
            var li = '<li class="liactive"><span>新测试</span><span class="iconfont icon-guanbi"></span></li>';
            var section = '<section class="conactive">新测试' + random + '</section>';
            that.ul.insertAdjacentHTML('beforeend', li);
            that.tabscon.insertAdjacentHTML('beforeend', section);
            that.init();
        }
        // 3.删除功能
    removeTab() {
            var index = this.parentNode.index;
            // 第一种
            // that.ul.removeChild(that.lis[index]);
            // that.tabscon.removeChild(that.sections[index]);
            // 第二种
            that.lis[index].remove();
            that.sections[index].remove();
            // 重新获取元素
            that.init();
        }
        // 4.修改功能
    editTab() {
        // 双击禁止选中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // 弹出文本框前先得到原先this指向元素里边的文本
        var original = this.innerText;
        // 弹出文本框
        this.innerHTML = '<input type = "text"></input>';
        // 获取当前this指向元素的子元素input
        var input = this.children[0];
        // 把原先的文字赋值给文本框
        input.value = original;
        // 自动获取焦点
        input.select();
        // 修改文字
        // 1.文本框失去焦点修改文字
        input.onblur = function() {
            // 获取当前指向文本框的值赋值给父元素
            // 文本框不为空则执行修改文字，为空则还原原来
            if (this.value == '') {
                this.parentNode.innerHTML = original;
            } else {
                this.parentNode.innerHTML = this.value;
            }

        };
        // 2.在文本框中按下回车修改文字
        input.onkeyup = function(e) {
            // 按下回车键才会执行
            if (e.keyCode == 13) {
                // 与上边失去焦点事件事件处理程序一模一样，直接调用当前this指向元素失去焦点事件即可
                this.blur();
            }
        };
    }
};
new Tab('#tab');