$(function() {
    // 一.全选按钮模块start
    // 点击全选按钮全选所有按钮
    // 思路：每次点击全选按钮获取this的checked的属性值，后赋值给3个小按钮加另外一个全选按钮
    $(".checkall").change(function() {
        console.log($(this).prop("checked")); //得到全选按钮的状态
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked")); //把状态赋值给三小按钮,运用并集选择器，把状态同步给另外一个全选按钮
    });

    // 3个小按钮全选则全选按钮勾选上，有一个小按钮没有选择这取消全选按钮
    // 用到change()方法，每次点击都检测按钮状态，   还有:checked选择器检查length长度
    $(".j-checkbox").change(function() {
        console.log($(".j-checkbox:checked").length);
        if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
            $(".checkall").prop("checked", true); //后边属性值是布尔值不用加引号
        } else {
            $(".checkall").prop("checked", false);

        }
    });
    // 一.全选按钮模块end


    // 二.加减数量商品小计模块start
    // 11.加减模块
    // 需求：点击加号，文本框数字加1；点击减号，文本框数字减一
    // 思路：
    // +号：设置一个数字变量（文本框原先的数字），每点击一次+号，数字变量++，后把数字变量值赋值给文本框；
    // -号：同+号理。数字到1停止点击

    // 22.商品小计
    // 需求：点击加减同步计算总价
    // 思路：
    // 点击+号，得到购买总数量num，num数量乘以单价.p-price的text(),.p-price的text()带有￥，要用substr()截取不带有￥的文本，得到的数量赋值给.p-sum
    // 点击-号，同理
    $(".increment").click(function() {
        var num = $(this).siblings(".itxt").val();
        num++;
        $(this).siblings(".itxt").val(num);
        //得到.p-price的文本，后用substr()截取字符得到price
        var price = $(this).parents(".p-num").siblings(".p-price").text().substr(1);
        // price乘num得到总价格prices
        var prices = price * num;
        // prices通过text()赋值给.p-sum，加上￥
        // 保留后2位小数toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + prices.toFixed(2));
        // 调用计算总数量总价格模块
        emem();
    })
    $(".decrement").click(function() {
            var num = $(this).siblings(".itxt").val();
            if (num == 1) {
                return false;
            }
            num--;
            $(this).siblings(".itxt").val(num);
            var price = $(this).parents(".p-num").siblings(".p-price").text().substr(1);
            // price乘num得到总价格prices
            var prices = price * num;
            // prices通过text()赋值给.p-sum，加上￥
            // 保留后2位小数toFixed(2);
            $(this).parents(".p-num").siblings(".p-sum").text("￥" + prices.toFixed(2));
            // 调用计算总数量总价格模块
            emem();
        })
        // 二.加减数量模块end

    // 三.用户修改文本框的值，总价格改变模块start
    // 思路：文本框文字发生改变，计算文本框值乘以单价值得出总价格，后赋值给总价格模块
    $(".itxt").change(function() {
        var num = $(this).val();
        var price = $(this).parents(".p-num").siblings(".p-price").text().substr(1);
        // price乘num得到总价格prices
        var prices = price * num;
        // prices通过text()赋值给.p-sum，加上￥
        // 保留后2位小数toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + prices.toFixed(2));
        // 调用计算总数量总价格模块
        emem();
    });
    // 三.用户修改文本框的值，总价格改变模块end

    // 四.点击+-或者修改文本框的值后计算总数量跟总价格，三个都需要，那就封装个函数，需要就调用。
    // 思路：
    // 1.总数量，一点击+-号文本框，获取每个.itxt的value值，加上所有值，用.text()赋值给.amount-sum中的em。
    function emem() {
        // 1.要获取好几个数值，这里用遍历，外边定义一个变量值为0，用于遍历内部数值相加；获取到的每个数字都是字符型，所以用parseInt()转为数字型；
        var em1 = 0;
        $(".itxt").each(function(index, domment) {
            em1 += parseInt($(".itxt").eq(index).val());
        });
        // 后把em1用text()设置给.amount-sum em
        $(".amount-sum em").text(em1);
        // 2. price - sum em同理， 需要用substr(1) 去除￥ 号跟添加￥ 号； 总数还需要用toFixed(2) 保留2位小数;
        var em2 = 0;
        $(".p-sum").each(function(index, domment) {
            em2 += parseFloat($(".p-sum").eq(index).text().substr(1));
        });
        $(".price-sum em").text("￥" + em2.toFixed(2));
    };

    // 打开也要计算一次总价格总数量
    emem();
    // 四.总数量价格模块end


    // 五.删除模块start
    // 过程1：点击每个删除模块.p-action a都会删除对应的商品信息、
    $(".p-action a").click(function() {
        // 当前点击的元素的父亲的父亲.cart-item删除,用parents(".cart-item")找出;
        $(this).parents(".cart-item").remove();
    });
    // 过程2：点击每个清空购物车.clear-all都会删除所有商品.cart-item信息
    $(".clear-all").click(function() {
        $(".cart-item").remove();
    });
    // 过程3：点击删除选中.remove-batch，删除选中商品.cart-item信息;
    // 思路：用循环跟属性值prop("checked")判断商品有无被选中，.j-checkbox选中的执行删除
    $(".remove-batch").click(function() {
        $(".j-checkbox").each(function(index, domment) {
            if ($(domment).prop("checked") == true) {
                $(this).parents(".cart-item").remove();
            }
        });
    });
    // 五.删除模块end




});