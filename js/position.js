$(function () {
  var markers = [];
  $.getJSON("./testdata/position.json", function (data) {
    if(data.list && data.list.length > 0){
      var pos_bg = $(".pos-bg-img");
      data.list.map(function (value) {
        var pin = '<img class="pos-pin-img" id="pin-img' + value.id + '" src="./img/pin.png">';
        pos_bg.before(pin);
        $("#pin-img" + value.id).css({"left": value.left + "px", "top": value.top + "px"});
      });

      markers = data.list;

      var pos_pin = $(".pos-pin-img");
      var bgWidth = Number(pos_bg.css("width").slice(0, pos_bg.css("width").length - 2));
      var pinWidth = Number(pos_pin.css("width").slice(0, pos_pin.css("width").length - 2));
      var bgWidthMin = bgWidth * 0.2;
      var bgWidthMax = bgWidth * 1.8;
      var base = 0.2;

      $(".enlarge").click(function () {
        var bgCurrent = $(".pos-bg-img");
        var pinCurrent = $(".pos-pin-img");
        var bgWidthCurrent = Number(bgCurrent.css("width").slice(0, bgCurrent.css("width").length - 2));
        var pinWidthCurrent = Number(pinCurrent.css("width").slice(0, pinCurrent.css("width").length - 2));
        if(bgWidthCurrent < bgWidthMax){
          var bg_width = bgWidthCurrent + bgWidth * base + "px";
          var pin_width = pinWidthCurrent + pinWidth * base + "px";
          bgCurrent.css({"width": bg_width});
          pinCurrent.css({"width": pin_width});

          var pinsArr = $(".pos-pin-img");
          if(pinsArr && pinsArr.length > 0){
            for(var i=0; i<pinsArr.length; i++){
              var markerLeft = markers[i].left;
              var markerTop = markers[i].top;
              var markerCurrent = $("#pin-img" + i);
              var markLeftCurrent = Number(markerCurrent.css("left").slice(0, markerCurrent.css("left").length - 2));
              var markTopCurrent = Number(markerCurrent.css("top").slice(0, markerCurrent.css("top").length - 2));
              markerCurrent.css({
                "left": markLeftCurrent + markerLeft * base + "px",
                "top": markTopCurrent + markerTop * base + "px"
              });
            }
          }
        }
      });

      $(".diminsh").click(function () {
        var bgCurrent = $(".pos-bg-img");
        var pinCurrent = $(".pos-pin-img");
        var bgWidthCurrent = Number(bgCurrent.css("width").slice(0, bgCurrent.css("width").length - 2));
        var pinWidthCurrent = Number(pinCurrent.css("width").slice(0, pinCurrent.css("width").length - 2));
        if(bgWidthCurrent > bgWidthMin){
          var bg_width = bgWidthCurrent - bgWidth * base + "px";
          var pin_width = pinWidthCurrent - pinWidth * base + "px";
          bgCurrent.css({"width": bg_width});
          pinCurrent.css({"width": pin_width});

          var pinsArr = $(".pos-pin-img");
          if(pinsArr && pinsArr.length > 0){
            for(var i=0; i<pinsArr.length; i++){
              var markerLeft = markers[i].left;
              var markerTop = markers[i].top;
              var markerCurrent = $("#pin-img" + i);
              var markLeftCurrent = markerCurrent.css("left").slice(0, markerCurrent.css("left").length - 2);
              var markTopCurrent = markerCurrent.css("top").slice(0, markerCurrent.css("top").length - 2);
              markerCurrent.css({
                "left": markLeftCurrent - markerLeft * base + "px",
                "top": markTopCurrent - markerTop * base + "px"
              });
            }
          }
        }
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