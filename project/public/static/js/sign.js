// // 取出表单里的每一项存在name
// function loginForm($form) {
//     var unindexed_array = $form.serializeArray();
//     var indexed_array = {};

//     $.map(unindexed_array, function (n, i) {
//         indexed_array[n['name']] = n['value'];
//     });
//     console.log(indexed_array);
//     return indexed_array;
// }

// // ajax
// function ajaxSend(datas, actions) {
//     $.ajax({
//         type: 'post',
//         url: actions,
//         dataType: "json",
//         data: datas,
//         success: function (data) {
//             if (data.status) {
//                 alert('登录成功');
//             } else {
//                 alert(data.error);
//             }
//         },
//         error: function (jqXHR) {
//             alert("发生错误：" + jqXHR.status);
//         }
//     });
// }

onBures('form-sign');

function onBures(ele) {
    var obj = document.getElementById(ele);
    var inputType = $(obj).find('input');
    for (var i = 0; i < inputType.length; i++) {
        inputType[i].onblur = function () {
            // console.log(1);
            if ($(this).attr('type') == 'email') {
                // console.log(1);
                if (this.value) {
                    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    if (!myreg.test(this.value)) {
                        $(this).next().next()[0].innerHTML = '请填写正确的邮箱格式';
                        $(this).next().next()[0].className = '';
                        // $(this).focus();
                    } else {
                        $(this).next().next()[0].innerHTML = '';
                        $(this).next().next()[0].className = 'sr-only';
                    }
                } else {
                    // var _this = this;
                    // var n = 0;
                    // $('#for-pwd')[0].onclick = function () {
                    //     n++;
                    // }
                    // $('#sign-enter')[0].onclick = function () {
                    //     n++;
                    // }
                    // if (n == 0) {
                        $(this).next().next()[0].innerHTML = '*未填写';
                        $(this).next().next()[0].className = '';
                    // }

                    // $('#for-pwd')[0].onclick = function () {
                    //     $(_this).next().next()[0].innerHTML = '';
                    //     $(_this).next().next()[0].className = 'sr-only';
                    // }

                    // $(this).focus();
                }
            } else if ($(this).attr('type') == 'password') {
                if (this.value) {
                    var reg = /^\w{6,16}$/;
                    var regEn = /^[a-zA-Z]+$/; 
                    var regNum = /^[0-9]+$/;
                    // var re = new RegExp(regu); 
                    if (!reg.test(this.value) || regEn.test(this.value) || regNum.test(this.value)) {
                        $(this).next().next()[0].innerHTML = '请输入6-16位且是数字、字母、下划线';
                        $(this).next().next()[0].className = '';
                    } else {
                        console.log($(this).attr('name'));
                        if ($(this).attr('name') == 'register') {
                            var pwdPrev = $('form input[type=password]')[0].value;
                            console.log(1);
                            if(pwdPrev != this.value) {
                                $(this).next().next()[0].innerHTML = '两次密码不一致';
                                $(this).next().next()[0].className = '';
                            } else {
                                $(this).next().next()[0].innerHTML = '';
                                $(this).next().next()[0].className = 'sr-only';
                            }
                        } else {
                            $(this).next().next()[0].innerHTML = '';
                            $(this).next().next()[0].className = 'sr-only';
                        }
                        
                    }
                   
                } else {
                    $(this).next().next()[0].innerHTML = '*未填写';
                    $(this).next().next()[0].className = '';
                }
            } else if ($(this).attr('type') == 'text') {
                if(this.value) {
                    $(this).next().next()[0].innerHTML = '';
                    $(this).next().next()[0].className = 'sr-only';
                } else {
                    $(this).next().next()[0].innerHTML = '*未填写';
                    $(this).next().next()[0].className = '';
                }
            }
        }
    }
}

$('#sign')[0].onclick = function() {
    var inputAll = $('#form-sign input');
    var n = 0;
    for (var i = 0; i < inputAll.length; i++) {
        if (inputAll[i].value == '') {
            $(inputAll[i]).next().next()[0].innerHTML = '*未填写';
            $(inputAll[i]).next().next()[0].className = '';
            n++;
        } else {
            if ($(inputAll[i]).next().next()[0].className != 'sr-only') {
                n++;
            };
        }
    }
    if(n == 0) {
        var data = loginForm($('#form-sign'));
        ajaxSend(data, 'sign()');
    }
};
