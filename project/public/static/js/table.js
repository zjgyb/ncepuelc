// 导出全部的报名表

var getAll = document.getElementById('getAll');
getAll.onclick = function() {
    var _this = this;
    var aSrc = _this.getElementsByTagName('a')[0];
    $.get('', function(data) {
        var aSrc = _this.getElementsByTagName('a')[0];
        aSrc.href = data.href; 
    });
};

// 导出选中的报名表
function checkBox(name, ele) {
    var checkOrNot = ele.getElementsByTagName('input')[0];
    var trBtn = ele.getElementsByTagName('button')[0];
    checkOrNot.onchange = function() {
        var trId = $(this).parent().next()[0].innerHTML;           
        if(this.checked) {
            if(sessionStorage.getItem(name)) {
                var arrItem = sessionStorage.getItem(name);
                var newArr = stringToArr(arrItem, trId);
                newArr.push(trId);
                sessionStorage.setItem(name, newArr)
            } else {
                var arr = [trId];
                sessionStorage.setItem(name, arr);
            }                
        } else {    
            var data = sessionStorage.getItem(name);
            var newArr = stringToArr(data, trId);
            sessionStorage.setItem(name, newArr);
        };
    }
    trBtn.onclick = function() {     
        $.ajax({
            type: 'post',
            url: '',
            dataType: 'json',
            data: trId,
            success: function(data) {
                var aBtn = this.getElementsByTagName('a')[0];
                aBtn.href = data.href;
            },
            error: function(jqXHR) {
                alert("发生错误：" + jqXHR);
            }
        });
    }
}

// 转化成数组 
function stringToArr(arr, n) {
    var tempArr = arr.split(','); 
    var newArr = new Array();
    var i, len = tempArr.length;
    for(i = 0; i < len; i++) {
        if(tempArr[i] && Number(tempArr[i]) != n) {       
           newArr.push(tempArr[i] * 1);
        }     
    }
    return newArr;
}

var table = document.getElementById('table');

var tableTbody = table.getElementsByTagName('tbody')[0];

var tableTr = tableTbody.getElementsByTagName('tr');

for(var i = 0; i < tableTr.length; i++) {
    checkBox(table.id, tableTr[i]);
}

// 点击之后发ajax请求
var getPart = document.getElementById('getPart');
getPart.onclick = function() {
    var aSrc = this.getElementsByTagName('a')[0];
    var datas = sessionStorage.getItem(table.id);
    // var arr = stringToArr(data);
    // console.log(data);
    if(datas) {
        $.ajax({
            type: 'post',
            url: '',
            dataType: "json",
            data: datas,
            success: function (data) {
                aSrc.href = data.href;
            },
            error: function (jqXHR) {
                alert("发生错误：" + jqXHR.status);
            }
        });
    } else {
        alert('你还没有选择任何数据');
    }
   
}

// 删除table.id里的字符串
window.onload = function() {
    sessionStorage.removeItem(table.id);
}
