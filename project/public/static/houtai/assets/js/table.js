// 导出全部的报名表

var getAll = document.getElementById('getAll');
getAll.onclick = function() {
    var _this = this;
    var aSrc = _this.getElementsByTagName('a')[0];
    // console.log(aSrc.href);
    $.get('', function(data) {
        var aSrc = _this.getElementsByTagName('a')[0];
        aSrc.href = data.href; 
    });
};

// 导出选中的报名表
function checkBox(name, ele) {
    var checkOrNot = ele.getElementsByTagName('input')[0];
    var trBtn = ele.getElementsByTagName('button')[0];
    var trId = ele.getElementsByTagName('td')[1].innerHTML; 
    // console.log(checkOrNot);
    checkOrNot.onchange = function() {           
        if(this.checked) {
            if(sessionStorage.getItem(name)) {
                var arrItem = sessionStorage.getItem(name);
                var newArr = stringToArr(arrItem);
                newArr[trId - 1] = trId; 
                // console.log(newArr);
                sessionStorage.setItem(name, newArr)
            } else {
                var arr = new Array();
                // console.log(typeof arr);
                arr[trId-1] = trId;
                sessionStorage.setItem(name, arr);
            }
                     
            
        } else {
            
            var data = sessionStorage.getItem(name);
            // data.remove(trId);
            // console.log(data);
            var newArr = stringToArr(data, trId);
            sessionStorage.setItem(name, newArr);
            // newArr[trId - 1];
            // console.log(data);
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
    // console.log(tempArr);
    var newArr = new Array();
    var i, len = tempArr.length;
    // var myArr = [];
    // var m = 0;
    for(i = 0; i < len; i++) {
        if(tempArr[i]) {
            if (n != undefined && Number(tempArr[i]) == n) {
                // newArr.push(tempArr[i] * 1);
            } else {
                newArr.push(tempArr[i] * 1);
            } 
        }     
    }
    // if (n != undefined) {
    //     for(i = 0; i < newArr.length; i++) {
    //         if()
    //     }
    // }
    // if(bool) {
    //     newArr
    // }
    // console.log(newArr);
    return newArr;
}

var table = document.getElementById('table');

var tableTbody = table.getElementsByTagName('tbody')[0];

var tableTr = tableTbody.getElementsByTagName('tr');

for(var i = 0; i < tableTr.length; i++) {
    // 查看第一个input是否选中
    checkBox(table.id, tableTr[i]);
    // console.log(tableTr[i]);
}

// 点击之后发ajax请求
var getPart = document.getElementById('getPart');
getPart.onclick = function() {
    var aSrc = this.getElementsByTagName('a')[0];
    var data = sessionStorage.getItem(table.id);
    var arr = stringToArr(data);
    if(arr.length) {
        $.ajax({
            type: 'post',
            url: '',
            dataType: "json",
            data: arr,
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

// 搜索功能
var search = document.getElementById('search');
search.onclick = function() {
    var content = document.getElementById('content');
    var value = content.value;
    if(value) {
        $.ajax({
            type: 'post',
            url: '',
            dataType: "json",
            data: value,
            success: function() {
                
            },
            error: function(jqXHR) {
                alert("发生错误：" + jqXHR.status);
            }
        })
    }
}

// 删除table.id里的字符串
window.onload = function() {
    sessionStorage.removeItem(table.id);
}