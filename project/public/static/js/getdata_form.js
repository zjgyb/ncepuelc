// 复制项目
function copyProject(obj1, obj2) {
    var project = [
        "一",
        "二",
        "三",
        "四",
        "五",
    ];
    var con = obj2.cloneNode(true);
    var row = obj1.getElementsByClassName('row');
    var num = row.length;
    if (num <= 5) {
        obj1.insertBefore(con, obj1.childNodes[num]);
        var header = row[num - 1].getElementsByTagName('h4')[0];
        header.innerHTML = '项目' + project[num - 1];

    }

    var val = row[num - 1].getElementsByTagName('input');
    var pClass = row[num - 1].getElementsByTagName('p');
    for (var i = 0; i < val.length; i++) {
        val[i].value = '';
    }
    // 复制时不把提示复制
    for (var i = 0; i < pClass.length; i++) {
        pClass[i].className = 'sr-only';
    }
    saveAdd(obj1.id, true);
    deleteAdd(obj1.id);
}

function clickAddBlur(element, main) {
    var obj = document.getElementById(element);
    var mainPos = document.getElementById(main);
    var addPos = mainPos.getElementsByClassName('row')[0];
    obj.onclick = function () {
        copyProject(mainPos, addPos);
    }
}

// 增加项目、增加离开焦点事件
clickAddBlur('project-btn', 'main-project');

// 代表性著作、 论文情况
clickAddBlur('article-btn', 'main-article');

// 重要获奖情况
clickAddBlur('prize-btn', 'main-prize');
var prizeDate = document.getElementsByClassName('date')[0];
selectOption(1960, 2020, prizeDate);

// 专利
clickAddBlur('patent-btn', 'main-patent');


// 接收后台传过来的数据

$.get('', function(data) {
    // 基本信息部分
    var datas = data.font;
    var img = data.img;
    var information = [
        "pc-main-infor",
        "pc-main-teach",
        "pc-main-study",
        "pc-main-intro",
        "main-project",
        "main-article",
        "main-prize",
        "main-patent"
    ];

    for (var i = 0; i < information.length; i++) {
        sessionStorage.setItem(information[i], datas[information[i]]);
    }

    var getImg = document.getElementById('person-img');
    getImg.src = img;

    // 基本信息保存 id:pc-main-infor

    // 基本信息
    save('pc-main-infor');

    // 学位学历
    save('pc-main-teach');

    // 个人学习状况
    save('pc-main-study');

    // 个人介绍
    save('pc-main-intro');


    saveAdd('main-project');

    // 著作
    saveAdd('main-article');

    // 获奖情况
    saveAdd('main-prize');

    // 重要发明
    saveAdd('main-patent');

    // 删除，垃圾箱按钮
    deleteAdd('main-project');
    deleteAdd('main-article');
    deleteAdd('main-prize');
    deleteAdd('main-patent');
    // 关于提交

    var submit = document.getElementById('submit');
    submit.onclick = function () {
        var input = document.getElementsByTagName('input');
        var n = 0;
        for (var i = 0; i < input.length; i++) {
            var srOnly = $(input[i]).next()[0].className;
            if (input[i].value && srOnly == 'sr-only') {
                n++;
                if (input[i].name == 'cell-phone') {
                    var myreg = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/g;
                    if (!myreg.test(input[i].value)) {
                        $(input[i]).next()[0].innerHTML = '*请填写正确的手机号码';
                        $(input[i]).next()[0].className = '';
                        n--;
                    }
                }
                if (input[i].name == 'email') {
                    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    if (!myreg.test(input[i].value)) {
                        $(input[i]).next()[0].innerHTML = '*请填写正确的邮箱格式';
                        $(input[i]).next()[0].className = '';
                        n--;
                    }
                }
            } else if (input[i].type == 'file') {
                if (imgData) {
                    n++;
                }
            }
        }
        if (n == input.length) {
            // 传数据 利用id提取出sessionStorage
            var information = [
                "pc-main-infor",
                "pc-main-teach",
                "pc-main-study",
                "pc-main-intro",
                "main-project",
                "main-article",
                "main-prize",
                "main-patent"
            ];
            var datas = {};
            for (var i = 0; i < information.length; i++) {
                datas[information[i]] = JSON.parse(sessionStorage.getItem(information[i]));
            }
            var formData = new FormData();
            formData.append('file', imgData);
            $.ajax({
                url: '',
                type: 'POST',
                async: false,
                cache: false,
                data: formData,
                processData: false,
                contentType: false
            }).done(function (res) {
            }).fail(function (res) { });
            $.ajax({
                type: 'post',
                url: '',
                dataType: "json",
                data: datas,
                success: function (data) {
                    if (data.status) {
                        alert('提交成功');
                    } else {
                        alert('发生错误' + data.content);
                    }
                },
                error: function (jqXHR) {
                    alert("发生错误：" + jqXHR.status);
                }
            });
        } else {
            alert('你还没有填完或者填写有误！');
        }
    }
});




function save(ele) {
    if (!sessionStorage.getItem(ele)) {
        sessionStorage.setItem(ele, '{}');
    }
    function getFormVal(formEle) {
        if ((formEle.getElementsByTagName('input')).length) {
            var obj = formEle.getElementsByTagName('input');
            var data = JSON.parse(sessionStorage.getItem(ele));
            var name = obj[0].name;
            if (data[name]) {
                obj[0].value = data[name];
            }
            // 失去焦点时
            obj[0].onblur = function () {
                verifyForm(this, ele);
            }
        } else if (formEle.getElementsByTagName('select').length) {
            var obj = formEle.getElementsByTagName('select');
            var value = '';
            if (obj.length > 1) {
                var name = formEle.id;
                for (n = 0; n < obj.length; n++) {
                    value += obj[n].value;
                    obj[n].onblur = function () {
                        selectBlur(this, ele);
                    }
                }
                var data = JSON.parse(sessionStorage.getItem(ele));
                if (data[name]) {
                    var values = data[name];
                    var a = 4;
                    for (var n = 0; n < obj.length; n++) {
                        if (n === 0) {
                            obj[n].value = values.substring(0, n + a);
                            a += n;
                        } else {
                            obj[n].value = values.substring(a, a + n + 1);
                            a += n + 1;
                        }
                    }
                } else {
                    data[name] = value;
                    var str = JSON.stringify(data);
                    sessionStorage.setItem(ele, str);
                }

            } else {
                var data = JSON.parse(sessionStorage.getItem(ele));
                var name = obj[0].name;
                if (data[name]) {
                    obj[0].value = data[name];
                } else {
                    value = obj[0].value;
                    data[name] = value;
                    var str = JSON.stringify(data);
                    sessionStorage.setItem(ele, str);
                }
                obj[0].onblur = function () {
                    verifyForm(this, ele);
                }
            }
        } else if (formEle.getElementsByTagName('textarea').length) {
            var obj = formEle.getElementsByTagName('textarea');
            for (var n = 0; n < obj.length; n++) {
                var name = obj[n].name;
                var data = JSON.parse(sessionStorage.getItem(ele));
                if (data[name]) {
                    obj[n].value = data[name];
                }
                obj[n].onblur = function () {
                    verifyForm(this, ele);
                }
            }

        }
    }
    function getValue(rowEle) {
        var form_group = rowEle.getElementsByClassName('form-group');
        for (var j = 0; j < form_group.length; j++) {
            getFormVal(form_group[j]);
        }
    }
    var obj = document.getElementById(ele);
    var row = obj.getElementsByClassName('row');
    for (var i = 0; i < row.length; i++) {
        getValue(row[i]);
    }
}

// 失去焦点

function verifyForm(_this, main) {
    console.log(_this.type);
    if (_this.type == 'text' || _this.type == 'textarea') {
        if (!_this.value) {
            $(_this).next()[0].innerHTML = '*未填写';
            $(_this).next()[0].className = '';
        } else {
            $(_this).next()[0].className = 'sr-only';
        }

        if (_this.name == 'cell-phone') {
            var myreg = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/g;
            if (!myreg.test(_this.value)) {
                $(_this).next()[0].innerHTML = '*请填写正确的手机号码';
                $(_this).next()[0].className = ''
            } else {
                $(_this).next()[0].className = 'sr-only';
            }
        }
        var name = _this.name;
        var value = _this.value;

        var datas = JSON.parse(sessionStorage.getItem(main));
        datas[name] = value;
        var str = JSON.stringify(datas);
        sessionStorage.setItem(main, str);
    }
    else if (_this.type == 'email') {
        if (!_this.value) {
            $(_this).next()[0].innerHTML = '*未填写';
            $(_this).next()[0].className = '';
        } else {
            var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (!myreg.test(_this.value)) {
                $(_this).next()[0].innerHTML = '*请填写正确的邮箱格式';
                $(_this).next()[0].className = '';
            } else {
                $(_this).next()[0].innerHTML = '';
                $(_this).next()[0].className = 'sr-only';
            }
            var name = _this.name;
            var value = _this.value;

            var datas = JSON.parse(sessionStorage.getItem(main));
            datas[name] = value;
            var str = JSON.stringify(datas);
            sessionStorage.setItem(main, str);
        }
    }
    else {
        var name = _this.name;
        var value = _this.value;
        var datas = JSON.parse(sessionStorage.getItem(main));
        datas[name] = value;
        var str = JSON.stringify(datas);
        sessionStorage.setItem(main, str);
    }

}


// 针对多项select的问题离开焦点 
function selectBlur(_this, main, num) {
    var select = $(_this).parent().find('select');
    var name = $(_this).parent()[0].id;
    var value = '';

    var datas = JSON.parse(sessionStorage.getItem(main));
    for (var i = 0; i < select.length; i++) {
        value += select[i].value;
    }

    if (num == undefined) {
        datas[name] = value;
    } else {
        datas[num][name] = value;
    }
    var str = JSON.stringify(datas);
    sessionStorage.setItem(main, str);

}

function saveAdd(ele, bool) {

    function getFormVal(formEle, num) {
        if ((formEle.getElementsByTagName('input')).length) {
            var obj = formEle.getElementsByTagName('input');
            for (var n = 0; n < obj.length; n++) {
                var name = obj[n].name;
                var dataIn = JSON.parse(sessionStorage.getItem(ele));
                if (dataIn[num][name]) {
                    obj[n].value = dataIn[num][name];
                } 
                obj[n].onblur = function () {
                    addVerifyForm(this, ele, num);
                }
            }
        } else if (formEle.getElementsByTagName('select').length) {
            var obj = formEle.getElementsByTagName('select');
            var value = '';
            if (obj.length > 1) {
                var name = formEle.id;
                var dataIn = JSON.parse(sessionStorage.getItem(ele));
                for (n = 0; n < obj.length; n++) {
                    value += obj[n].value;
                    obj[n].onblur = function () {
                        selectBlur(this, ele, num);
                    }
                }
                if (dataIn[num][name]) {
                    var values = dataIn[num][name];
                    var a = 4;
                    for (var n = 0; n < obj.length; n++) {
                        var values = dataIn[num][name];
                        switch (n) {
                            case 0:
                                obj[n].value = values.substring(0, 4);
                                break;
                            case 1:
                                obj[n].value = values.substring(4, 6);
                                break;
                            case 2:
                                obj[n].value = values.substring(6, 10);
                                break;
                            case 3:
                                obj[n].value = values.substring(10, 12);
                                break;
                        }
                    }
                } else {
                    dataIn[num][name] = value;
                    var strIn = JSON.stringify(dataIn);
                    sessionStorage.setItem(ele, strIn);
                }

            } else {
                var name = obj[0].name;

                var dataIn = JSON.parse(sessionStorage.getItem(ele));

                if (dataIn[num][name]) {
                    obj[0].value = dataIn[num][name];
                } else {
                    value = obj[0].value;
                    dataIn[num][name] = value;
                    var strIn = JSON.stringify(dataIn);
                    sessionStorage.setItem(ele, strIn);
                }
                obj[0].onblur = function () {
                    addVerifyForm(this, ele, num);
                }

            }
        }
    }
    function getValue(rowEle, num) {
        // console.log(num);
        var form_group = rowEle.getElementsByClassName('form-group');
        for (var j = 0; j < form_group.length; j++) {
            getFormVal(form_group[j], num);
        }
    }
    var obj = document.getElementById(ele);
    var row = obj.getElementsByClassName('row');
    if (!sessionStorage.getItem(ele)) {
        sessionStorage.setItem(ele, '{}');
        var data = JSON.parse(sessionStorage.getItem(ele));
        data[0] = {};
        var str = JSON.stringify(data);
        sessionStorage.setItem(ele, str);
    }
    if (!bool) {

        // var getItem = sessionStorage.getItem(ele);
        var data = JSON.parse(sessionStorage.getItem(ele));
        var n = 0;
        for (var n in data) {
            n++;
        }
        // console.log(n);
        if (n > 1 && n <= 5) {
            var project = [
                "一",
                "二",
                "三",
                "四",
                "五"
            ];
            var mainPors = document.getElementById(ele);
            for (var i = 1; i < n; i++) {
                var addPos = mainPors.getElementsByClassName('row')[0];
                var con = addPos.cloneNode(true);
                //    console.log(mainPors.childNodes[i]);
                mainPors.insertBefore(con, mainPors.childNodes[i]);
                //    console.log(i);
                //    console.log($(mainPors.childNodes[i+1]).find('h4')[0]);

                //    console.log(mainPors, addPos);
                //    copyProject(mainPors, addPos);
            }
            for (var i = 0; i < n; i++) {
                $(mainPors).find('h4')[i].innerHTML = '项目' + project[i];
                //    console.log($(mainPors).find('h4')[0]);
            }

            //    var mainPors = document.getElementById(ele);
            //    var addPos = mainPors.getElementsByClassName('row')[0];
            //    copyProject(mainPors, addPos);
        }
    }
    for (var i = 0; i < row.length - 1; i++) {
        // console.log(!JSON.parse(sessionStorage.getItem(ele))[i])
        if (!JSON.parse(sessionStorage.getItem(ele))[i]) {
            var data = JSON.parse(sessionStorage.getItem(ele));
            data[i] = {};
            var str = JSON.stringify(data);
            sessionStorage.setItem(ele, str);
        }
        // if(i){
        //     var getItem = sessionStorage.getItem(ele);
        //     var data = JSON.parse(sessionStorage.getItem(ele));
        //     var n = 0;
        //     for (var n in data) {
        //         n++;
        //     }
        //     console.log(n);
        //     var project = [
        //         "一",
        //         "二",
        //         "三",
        //         "四",
        //         "五"
        //     ];
        //     var mainPors = document.getElementById(ele);
        //     var addPos = mainPors.getElementsByClassName('row')[0];
        //     var con = addPos.cloneNode(true);
        //     mainPors.insertBefore(con, mainPors.childNodes[i]);
        //     console.log($(mainPors.childNodes[i + 1]))
        //     // $(mainPors.childNodes[i + 1]).find('h4')[0].innerHTML = '项目' + project[i];

        // }
        // var dataLog = {};
        getValue(row[i], i);
    }
}

function addVerifyForm(_this, main, num) {
    if (_this.type == 'text' || _this.type == 'textarea') {
        if (!_this.value) {
            $(_this).next()[0].className = '';
        } else {
            var name = _this.name;
            var value = _this.value;
            $(_this).next()[0].className = 'sr-only';
            var datas = JSON.parse(sessionStorage.getItem(main));
            if (datas[num]) {
                datas[num][name] = value;
                var str = JSON.stringify(datas);
                sessionStorage.setItem(main, str);
            }

        }
    } else {
        var name = _this.name;
        var value = _this.value;
        var datas = JSON.parse(sessionStorage.getItem(main));
        datas[num][name] = value;
        var str = JSON.stringify(datas);
        sessionStorage.setItem(main, str);
    }

}

function deleteAdd(ele) {
    var obj = document.getElementById(ele);
    var spanBtn = $(obj).children('.row');
    for (var i = 0; i < spanBtn.length - 1; i++) {
        var btn = $(spanBtn[i]).children('span')[0];
        btn.onclick = function () {
            var len = $(obj).children('.row').length;
            if (len > 2) {
                var index = $(this).parent().index();
                var data = JSON.parse(sessionStorage.getItem(ele));
                var project = [
                    "一",
                    "二",
                    "三",
                    "四",
                    "五"
                ];
                delete data[index];
                var n = 0;
                var datas = {};
                for (var num in data) {
                    datas[n] = data[num];
                    n++;
                }
                var str = JSON.stringify(datas);
                sessionStorage.setItem(ele, str);
                $(this).parent()[0].remove();
                var row = $(obj).find('.row');
                for (var j = 0; j < row.length - 1; j++) {
                    $(row[j]).children('h4')[0].innerHTML = '项目' + project[j];
                }
            }
        }
    }
}

