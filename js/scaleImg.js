//图片放大和缩小（兼容IE和火狐，谷歌）
var orign = 1;
function ImageChange(args) {
  var oImg = document.getElementById('pic');
  var oImgWrap = document.getElementById('imgWrap');
  if (args) {
    //oImg.width = oImg.width * 1.2;
    //oImg.height = oImg.height * 1.2;

    orign = orign + 0.2;
    if (orign >= 2) {
      orign = 2;
    }
    $('#imgWrap').css('transform', 'scale(' + orign + ')');
    // oImg.style.zoom = parseInt(oImg.style.zoom) + (args ? +20 : -20) + '%';
  }
  else {
    //oImg.width = oImg.width / 1.2;
    //oImg.height = oImg.height / 1.2;
    orign = orign - 0.2;
    if (orign <= 0.1) {
      orign = 0.1;
    }
    $('#imgWrap').css('transform', 'scale(' + orign + ')');
  }
}


//获取div的四个顶点坐标
function getDivPosition() {
  var odiv = document.getElementById('picDiv');
  var screnWidth = document.body.clientWidth;
  var xLeft, xRigh, yTop, yBottom;
  return {
    xLeft: odiv.getBoundingClientRect().left,
    xRigh: odiv.getBoundingClientRect().left + screnWidth - 145,
    yTop: odiv.getBoundingClientRect().top,
    yBottom: odiv.getBoundingClientRect().top + screnWidth - 145
  };
}

//获取鼠标坐标
function mousePos(e) {
  var x, y;
  var e = e || window.event;
  return {
    x: e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
    y: e.clientY + document.body.scrollTop + document.documentElement.scrollTop
  };
};

//在固定div层拖动图片
var ie = document.all;
var nn6 = document.getElementById && !document.all;
var isdrag = false;
var y, x;
var oDragObj;


//鼠标移动
function moveMouse(e) {
  //鼠标的坐标
  mousePos(e).x;
  mousePos(e).y;
  //div的四个顶点坐标
  getDivPosition().xLeft
  getDivPosition().xRigh
  getDivPosition().yTop
  getDivPosition().yBottom

  if (isdrag && mousePos(e).x > getDivPosition().xLeft && mousePos(e).x < getDivPosition().xRigh && mousePos(e).y > getDivPosition().yTop && mousePos(e).y < getDivPosition().yBottom) {
    oDragObj.style.top = (nn6 ? nTY + e.clientY - y : nTY + event.clientY - y) + 'px';
    oDragObj.style.left = (nn6 ? nTX + e.clientX - x : nTX + event.clientX - x) + 'px';
    return false;
  }
}

//鼠标按下才初始化
function initDrag(e) {
  var oDragHandle = nn6 ? e.target : event.srcElement;
  var topElement = 'HTML';
  while (oDragHandle.tagName != topElement && oDragHandle.className != 'dragAble') {
    oDragHandle = nn6 ? oDragHandle.parentNode : oDragHandle.parentElement;
  }
  if (oDragHandle.className == 'dragAble') {
    isdrag = true;
    oDragObj = oDragHandle;
    nTY = parseInt(oDragObj.style.top + 0);
    y = nn6 ? e.clientY : event.clientY;
    nTX = parseInt(oDragObj.style.left + 0);
    x = nn6 ? e.clientX : event.clientX;
    document.onmousemove = moveMouse;
    return false;
  }
}
document.onmousedown = initDrag;
document.onmouseup = new Function('isdrag=false');


/**===以下是为了兼容切换到手机模式的拖拽事件========================================================================**/
var oDiv = document.getElementById('imgWrap');
oDiv.addEventListener('touchstart', function(e) {
  var oDragHandle = nn6 ? e.target : event.srcElement;
  var topElement = 'HTML';
  while (oDragHandle.tagName != topElement && oDragHandle.className != 'dragAble') {
    oDragHandle = nn6 ? oDragHandle.parentNode : oDragHandle.parentElement;
  }
  if (oDragHandle.className == 'dragAble') {
    isdrag = true;
    oDragObj = oDragHandle;
    nTY = parseInt(oDragObj.style.top + 0);
    y = nn6 ? e.touches[0].clientY : event.touches[0].clientY;
    nTX = parseInt(oDragObj.style.left + 0);
    x = nn6 ? e.touches[0].clientX : event.touches[0].clientX;
    oDiv.addEventListener('touchmove', function(e) {
      touchmoveMouse(e);
    })
    return false;
  }
});

//touch鼠标移动
function touchmoveMouse(e) {
  //鼠标的坐标
  touchmousePos(e).x;
  touchmousePos(e).y;
  //div的四个顶点坐标
  getDivPosition().xLeft
  getDivPosition().xRigh
  getDivPosition().yTop
  getDivPosition().yBottom

  oDragObj.style.top = (nn6 ? nTY + e.touches[0].clientY - y : nTY + event.touches[0].clientY - y) + 'px';
  oDragObj.style.left = (nn6 ? nTX + e.touches[0].clientX - x : nTX + event.touches[0].clientX - x) + 'px';
  return false;
}
document.ontouchend = new Function('isdrag=false');
//获取鼠标坐标
function touchmousePos(e) {
  var x, y;
  var e = e || window.event;
  return {
    x: e.touches[0].clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
    y: e.touches[0].clientY + document.body.scrollTop + document.documentElement.scrollTop
  };
};