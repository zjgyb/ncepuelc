var loginIn = document.getElementById('login-in');
var sign = document.getElementById('sign');
var signIn = document.getElementById('sign-in');
var login = document.getElementById('login');
var findPwd = document.getElementById('find-pwd');
var forPwd = document.getElementById('for-pwd');

// 改变注册或者登陆或忘记密码的状态
function changeState(new1, old1, old2) {
    new1.style.display = 'block';
    old1.style.display = 'none';
    old2.style.display = 'none';
}

sign.onclick = function() {
    changeState(signIn, loginIn, findPwd);
}
login.onclick = function() {
    changeState(loginIn, signIn, findPwd);
}
forPwd.onclick = function() {
    changeState(findPwd, signIn, loginIn);
}
