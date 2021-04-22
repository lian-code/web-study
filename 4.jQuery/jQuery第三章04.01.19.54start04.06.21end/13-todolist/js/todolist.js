$(function() {
    // 1.按下回车键，获取本地存储。判断本地存储有无数据，有数据解析为原对象返回给变量，无数据返回一个空数组给变量。获取文本框值，赋值給生成的对象，对象追加给变量。之后保存转为字符串的变量到本地存储。
    load(); //打开就要渲染一次页面
    $("#title").on("keyup", function(e) {
        if (e.keyCode == 13) {
            if ($(this).val() !== "") {
                var list = getlist();
                // // 追加对象给是数组
                list.push({ title: $(this).val(), state: false });
                // // 保存数组到本地存储
                savelist(list);
                // 把数组中对象中的title渲染到页面
                load();
                // 回车键事件程序结尾把文本框值清空
                $(this).val("");
            } else {
                alert("请输入待办事项")
            }
        }
    });
    // 2.点击ol ul中的a删除对应的li
    $("ol,ul").on("click", "a", function() {
        var list = getlist();
        var index = $(this).siblings("input").attr("id");
        // 用splice(),s删除数组对应对象
        list.splice(index, 1);
        // 保存数据
        savelist(list);
        // 渲染页面
        load();
    });
    // 3.复选框状态true则放到已完成列表，flase则放到待办事项
    $("ol,ul").on("click", ">input", function() {
        // 在循环添加元素时就给input自定义一个属性索引号
        // 获取数据
        var list = getlist();
        // 索引号
        var index = $(this).attr("id");
        // 改变对应input的索引号数据状态state为复选框的状态
        list[index].state = $(this).prop("checked");
        // 保存到本地存储、
        savelist(list);
        // 渲染页面
        load(); //渲染的时候判断state为true还是false
    });
    // 4.修改p标签文字
    // 获取所有p元素
    // 给所有一个ondblclick事件

    // 事件内容：获取文本框值
    // 获取本地存储
    // 把值设置给本地存储
    // 重新渲染页面
    $("ol,ul").on("dblclick", "p", function() {
        //双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        var pOriginal = $(this).text(); // 获取p元素原先文字
        // p里边元素换成text文本框 // 给text文本框值改原先文字 //用select()方法全选文本框文字 //失去焦点blur事件 // 键盘回车事件
        $(this).html("<input type = 'text' />").children("input").val(pOriginal).select().on("blur", function() {
            if ($(this).val() !== '') {
                var currentVal = $(this).val(); //获取文本框值
                var list = getlist(); //获取本地存储
                var index = $(this).parent().siblings("input").attr("id"); //获取小例的索引号
                list[index].title = currentVal; // 修改对应本地存储数组对象title属性值
                savelist(list); //保存数组元素
                load(); //重新渲染页面
            } else {
                // 如果文本框为空，就还原为原来
                load(); //重新渲染页面
            }
        }).on("keyup", function(e) {
            // 按的是回车键才执行
            if (e.keyCode == 13) {
                $(this).blur(); //事件过程与失去焦点事件过程一样，直接调用其事件使用即可
            }
        });
    });
    // 获取本地存储
    function getlist() {
        var list = localStorage.getItem("lists");
        if (list == null) {
            return [];
        } else {
            // 本地存储是字符串的，要返回解析的原对象JOSN.parse
            return JSON.parse(list);
        }
    };
    // 保存本地存储、
    function savelist(l) {
        // 要转化为字符串保存到本地存储JOSN.stringify
        localStorage.setItem("lists", JSON.stringify(l));
    };
    // 渲染页面、
    function load() {
        // 声明两个数值为0的变量，统计ul跟ol中有多少待办跟以完成
        var num1 = 0;
        var num2 = 0;
        // 先获取数组
        var list = getlist();
        // 因为得到全部数组元素又全部遍历又全部添加到ol元素中，但是先前打开页面就渲染页面了，所以在遍历添加前要清空ol里边的所有元素，html(""),empty()都可以
        $("ol,ul").empty();
        // 获取到一个数组要遍历数组，多少个对象在ol中添加多少个li>input p a
        $(list).each(function(index, element) {
            // 用prepend()在ol内部前置添加
            if (element.state) {
                // 这是ul已经完成区域，添加的复选框要默认选中
                $("ul").prepend($("<li><input type = 'checkbox' id =" + index + " checked = 'checked'><p>" + element.title + "</p><a href = 'javascript:;'></a></li>"));
                // 添加一个元素进ul都计算一下次数，后赋值给#todocount
                num1++;
            } else {
                $("ol").prepend($("<li><input type = 'checkbox' id =" + index + "><p>" + element.title + "</p><a href = 'javascript:;'></a></li>"));
                // 添加一个元素进ol都计算一下次数，后赋值给#todocount
                num2++;
            };
        });
        // 循环结束统计数量并赋值
        $("#todocount").text(num2);
        $("#donecount").text(num1);
    };
})