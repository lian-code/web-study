// 页面加载完执行
window.addEventListener('load', function() {
    var rgtel = /^1[3|4|5|6|7|8|9]\d{9}$/; // 手机号正则表达式
    var rgqq = /^[1-9]\d{4,9}$/; //qq号正则
    var rgnc = /^[\u4e00-\u9fa5]{2,8}$/; //汉字昵称正则
    var rgmsg = /^\d{4,6}$/; //短信验证码，限制4-6个数字
    var tel = document.querySelector('#tel');
    var qq = document.querySelector('#qq');
    var nc = document.querySelector('#nc');
    var msg = document.querySelector('#msg');
    test(tel, rgtel, '手机号格式正确', '手机号格式不正确');
    test(qq, rgqq, 'QQ号格式正确', 'QQ号格式不正确');
    test(nc, rgnc, '昵称格式正确', '昵称格式不正确');
    test(msg, rgmsg, '验证码格式正确', '验证码格式不正确');

    function test(inputs, regexps, truev, falsev) {
        inputs.addEventListener('blur', function() {
            if (regexps.test(this.value)) {
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<li class = "success_icon"></li> ' + truev + '';
            } else {
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<li class = "error_icon"></li>' + falsev + '';
            };
        });
    };
})