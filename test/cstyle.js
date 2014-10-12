;(function(){
  var $ = need.import('jQuery');

  var module = {
    getOffsetRect: function(elem) {
      var box = elem.getBoundingClientRect();
      var body = document.body;
      var docElem = document.documentElement;
      var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
      var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
      var clientTop = docElem.clientTop || body.clientTop || 0;
      var clientLeft = docElem.clientLeft || body.clientLeft || 0;
      var top  = box.top +  scrollTop - clientTop;
      var left = box.left + scrollLeft - clientLeft;
      return { top: Math.round(top), left: Math.round(left), width: Math.round(box.width), height:Math.round(box.width)};
    },

    pixelsToInt: function (val) {
      return parseInt(val, 10);
    },

    isHorisontallyCentered: function (frameSelector, elementSelector) {
      var frameEl=$(frameSelector);
      var elementEl=$(elementSelector);
      var frameRect=this.getOffsetRect(frameEl.get(0));
      var elementRect=this.getOffsetRect(elementEl.get(0));

      var frameLeftMargin = this.pixelsToInt(frameEl.css("margin-left"));
      var frameRightMargin = this.pixelsToInt(frameEl.css("margin-right"));
      var frameFullWidth = frameRect.width + frameLeftMargin + frameRightMargin;

      var frameCenter = frameRect.width / 2.0;
      var elementCenter = elementRect.width / 2.0;

      var offset = Math.abs(frameCenter - elementCenter);
      var success = (offset <= 0.5);

      //http://javascript.ru/ui/offset
      return success;
    },

    isContentCentered: function (frameSelector, elementSelector) {
      if (!this.isHorisontallyCentered(frameSelector, elementSelector)) return false;

      var textAlign = $(elementSelector).css("text-align");

      return textAlign === "center";
    },

    isContentOnly: function (selector) {
      var el = $(selector);
      var margin = this.pixelsToInt(el.css('margin'));
      var padding = this.pixelsToInt(el.css('padding'));
      var border = this.pixelsToInt(el.css('border'));
      return margin === 0 && padding === 0 && border===0;
    },

    isOnTop: function (frameSelector, elementSelector) {
      return false;
    },

  };

  need.export('cstyle', module);


})();
