$(function () {
  $("#picDiv").css("height",$(window).height()-118+"px");
  $(window).resize(function() {
    $("#picDiv").css("height",$(window).height()-118+"px");
  });
  $.getJSON("./testdata/position.json", function (data) {
    if(data.list && data.list.length > 0){
      var pos_bg = $(".pos-bg-img");
      data.list.map(function (value) {
        var pin = '<img class="pos-pin-img" id="pin-img' + value.id + '" src="./img/pin.png">';
        pos_bg.before(pin);
        $("#pin-img" + value.id).css({"left": value.left + "px", "top": value.top + "px"});
      });

      $(".enlarge").click(function () {
        ImageChange(true);
      });

      $(".diminsh").click(function () {
        ImageChange(false);
      });

      $(".pos").bind('mousewheel', function (event, delta) {
        event.preventDefault();
        var direction = delta;
        if(direction > 0) $(".enlarge").trigger("click");
        if(direction < 0) $(".diminsh").trigger("click");
      })
    }
  });
});