// 取出表单里的每一项存在name
function loginForm($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });
    return indexed_array;
}

// ajax
function ajaxSend(datas, actions) {
    $.ajax({
        type: 'post',
        url: actions,
        dataType: "json",
        data: datas,
        success: function (data) {
            if (data.status) {
                alert('登录成功');
            } else {
                alert(data.error);
            }
        },
        error: function (jqXHR) {
            alert("发生错误：" + jqXHR.status);
        }
    });
}
