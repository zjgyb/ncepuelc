onBures('form-login');
// 失去焦点时判断
function onBures(ele) {
    var obj = document.getElementById(ele);
    var inputType = $(obj).find('input');
    for(var i = 0; i < inputType.length; i++) {
        inputType[i].onblur = function() {
            var span = $(this).next().next()[0];
            if ($(this).attr('type') == 'email') {
                if(this.value) {
                    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    if (!myreg.test(this.value)) {
                        span.innerHTML = '请填写正确的邮箱格式';
                        span.className = '';
                    } else {
                        span.innerHTML = '';
                        span.className = 'sr-only';
                    }
                } else {         
                    span.innerHTML = '*未填写';
                    span.className = '';
                    // } 
                    
                    $('#for-pwd')[0].onclick = function () {
                        span.innerHTML = '';
                        span.className = 'sr-only';
                    }
                    $('#sign-enter')[0].onclick = function () {
                        span.innerHTML = '';
                        span.className = 'sr-only';
                    }
                }           
            } else if ($(this).attr('type') == 'password') {
                if(this.value) {
                    span.innerHTML = '';
                    span.className = 'sr-only';
                } else {
                    span.innerHTML = '*未填写';
                    span.className = '';
                }
            }
            if (this.type == 'checkbox') {
                localStorage.setItem(this.name, 'checked');
            } else {
                localStorage.setItem(this.name, this.value);
            }    
        }   
    }
}


// 登录
$('#login')[0].onclick = function() {
    var inputAll = $('#form-login input');
    var n = 0;
    for(var i = 0; i < inputAll.length; i++) {
        var span = $(inputAll[i]).next().next()[0]
        if(inputAll[i].value == '') {
            span.innerHTML = '*未填写';
            span.className = '';
            n++;
        } else {
            if(span.className != 'sr-only') {
                n++;
            };
        }
    }
    if(n == 0 ) {
        var data = loginForm($('form.login'));
        ajaxSend(data, 'login()');
    }  
}

// 记住密码功能
var checkBox = $('#form-login').find('input[type=checkbox]');
checkBox[0].onchange = function() {
    if(this.checked) {
        var input = $('#form-login').find('input');
        for(var i = 0; i < input.length; i++) {
            if (typeof (Storage) !== "undefined") {
                if(input[i].type == 'checkbox') {
                    localStorage.setItem(input[i].name, 'checked');
                } else {
                    localStorage.setItem(input[i].name, input[i].value);
                }    
            }
            
        }
    } else {
        var input = $('#form-login').find('input');
        for (var i = 0; i < input.length; i++) {
            if (typeof (Storage) !== "undefined") {
                localStorage.removeItem(input[i].name);
            }   
        }
    };
}

// 获取记住密码功能
window.onload = function() {
    if (typeof (Storage) !== "undefined") {
      var input = $('#form-login').find('input');
      for(var i = 0; i < input.length; i++) {
          if(input[i].type == 'checkbox') {
              if (localStorage.getItem(input[i].name) == 'checked') {
                  input[i].checked = true;
              }
          } else {
              input[i].value = localStorage.getItem(input[i].name);
          }
          
      }
    } else {
        alert("您的浏览器不支持记住密码功能");
    }
}
