onBures('form-pwd');
// 失去焦点时判断
function onBures(ele) {
    var obj = document.getElementById(ele);
    var inputType = $(obj).find('input');
    for (var i = 0; i < inputType.length; i++) {
        inputType[i].onblur = function () {
            var span = $(this).next().next()[0];
            if ($(this).attr('type') == 'email') {
                if (this.value) {
                    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    if (!myreg.test(this.value)) {
                        span.innerHTML = '请填写正确的邮箱格式';
                        span.className = '';
                    } else {
                        span.innerHTML = '';
                        span.className = 'sr-only';
                    }
                } else {
                    var _this = this;
                    span.innerHTML = '*未填写';
                    span.className = '';
                }
            } else if ($(this).attr('type') == 'text') {
                if (this.value) {
                    span.innerHTML = '';
                    span.className = 'sr-only';
                } else {
                    span.innerHTML = '*未填写';
                    span.className = '';
                }
            }
        }
    }
}

$('#submit')[0].onclick = function () {
    var inputAll = $('#form-pwd input');
    var n = 0;
    for (var i = 0; i < inputAll.length; i++) {
        var inputSpan = $(inputAll[i]).next().next()[0];
        if (inputAll[i].value == '') {
            inputSpan.innerHTML = '*未填写';
            inputSpan.className = '';
            n++;
        } else {
            if (inputSpan.className != 'sr-only') {
                n++;
            };
        }
    }
    if (n == 0) {
        var data = loginForm($('#form-pwd'));
        ajaxSend(data, 'reset()');
    } else {
        alert('你还未填写完或填写有误');
    }
};
