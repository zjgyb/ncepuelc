var caBtn = document.getElementById('ca-btn-next');
caBtn.onclick = function() {
    var mainHea = document.getElementById('pc-maincon').getElementsByTagName('h3');
    var mainPo = document.getElementById("main-project");
    var proBtn = document.getElementsByClassName('pro-next-button')[0];
    mainHea[5].style.display = 'block';
    mainPo.style.display = 'block';
    proBtn.style.display = 'flex';
}


mainBtn('ca-btn-next');
mainBtn('pro-btn-next');
mainBtn('art-btn-next');
mainBtn('pri-btn-next');
function mainBtn(btn) {
    var button = document.getElementById(btn);
    button.onclick = function() {
        function isOrWrite(obj) {
            var n = 0;
            for(var j = 0; j < obj.length; j++) {
                if($(obj[j]).prev()[0].value) {
                    obj[j].className = 'sr-only';
                    n++;
                } else {
                    
                    if($(obj[j]).prev()[0].type == 'file') {
                        if(imgData) {
                            n++;
                        } else {
                            obj[j].className = '';
                        }     
                    }  else {
                        obj[j].className = '';
                    }
                }
            }
            leng += obj.length;
            return n;
        }
        var sib = $(this).parent().prevAll();
        var num = 0;
        var leng = 0;
        for (var i = 0; i < sib.length; i++) {
            var pValue = sib[i].getElementsByTagName('p');
            num += parseInt(isOrWrite(pValue));
            
        }
        if(leng == num) {
            for(var i = 0; i < sib.length; i++) {
                sib[i].style.display = 'none';
            }
            $(this).parent().hide();
            $(this).parent().next()[0].style.display = 'block';
            $(this).parent().next().next()[0].style.display = 'block';
            $(this).parent().next().next().next()[0].style.display = 'flex';   
        } else {
            alert('你还未填写完或者填写不正确！');
        }
           
    }
}

// 上一步 需要给出上一步的id, 方便显示
prevBtn('pro-btn-prev', 'ca-next-button');
prevBtn('art-btn-prev', 'pro-next-button');
prevBtn('pri-btn-prev', 'art-next-button');
function prevBtn(btn, btnPar) {
    var button = document.getElementById(btn);
    button.onclick = function() {
        var btnpar = document.getElementsByClassName(btnPar)[0];
        if (btnPar == 'ca-next-button') {          
            var sib = $(btnpar).prevAll();
            for (var i = 0; i < sib.length; i++) {
                sib[i].style.display = 'block';
            }       
        } else {
            $(btnpar).prev()[0].style.display = 'block';
            $(btnpar).prev().prev()[0].style.display = 'block';
        }
        btnpar.style.display = 'flex';
        $(btnpar).next()[0].style.display = 'none';
        $(btnpar).next().next()[0].style.display = 'none';
        $(btnpar).next().next().next()[0].style.display = 'none';
    }
}
