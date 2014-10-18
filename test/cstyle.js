;(function(){
  var $ = need.import('jQuery');

  var module = {
    getOffsetRect: function(selector) {
      return this.getElementOffsetRect($(selector).get(0));
    },

    getElementOffsetRect: function(elem) {
      var box = elem.getBoundingClientRect();
      var body = document.body;
      var docElem = document.documentElement;
      var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
      var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
      var clientTop = docElem.clientTop || body.clientTop || 0;
      var clientLeft = docElem.clientLeft || body.clientLeft || 0;
      var top  = box.top +  scrollTop - clientTop;
      var left = box.left + scrollLeft - clientLeft;
      return { top: Math.round(top), left: Math.round(left), 
        width: Math.round(box.width), height:Math.round(box.height),
        bottom: Math.round(top) + Math.round(box.height),
        right: Math.round(left) + Math.round(box.width),
      };
    },

    pixelsToInt: function (val) {
      return parseInt(val, 10);
    },

    isHorisontallyCentered: function (frameSelector, elementSelector) {
      var frameEl=$(frameSelector);
      var elementEl=$(elementSelector);
      var frameRect=this.getElementOffsetRect(frameEl.get(0));
      var elementRect=this.getElementOffsetRect(elementEl.get(0));

      // var frameLeftMargin = this.pixelsToInt(frameEl.css("margin-left"));
      // var frameRightMargin = this.pixelsToInt(frameEl.css("margin-right"));
      // var frameFullWidth = frameRect.width + frameLeftMargin + frameRightMargin;

      var frameCenter = frameRect.left + frameRect.width / 2.0;
      var elementCenter = elementRect.left + elementRect.width / 2.0;

      var offset = Math.abs(frameCenter - elementCenter);
      var success = (offset <= 0.5);

      //http://javascript.ru/ui/offset
      return success;
    },

    isVerticallyCentered: function (frameSelector, elementSelector) {
      var frameEl=$(frameSelector);
      var elementEl=$(elementSelector);
      var frameRect=this.getElementOffsetRect(frameEl.get(0));
      var elementRect=this.getElementOffsetRect(elementEl.get(0));

      // var frameTopMargin = this.pixelsToInt(frameEl.css("margin-top"));
      // var frameBottomMargin = this.pixelsToInt(frameEl.css("margin-bottom"));
      // var frameFullHeight = frameRect.height + frameTopMargin + frameBottomMargin;

      var frameCenter = frameRect.top + frameRect.height / 2.0;
      var elementCenter = elementRect.top + elementRect.height / 2.0;

      var offset = Math.abs(frameCenter - elementCenter);
      var success = (offset <= 0.5);

      return success;
    },

    isCentered: function (frameSelector, elementSelector) {
      return this.isHorisontallyCentered(frameSelector, elementSelector)
        && this.isVerticallyCentered(frameSelector, elementSelector);
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

    getText: function(selector) {
      return $(selector).text().trim();
    },

    getHeight: function(selector) {
      return this.getElementOffsetRect($(selector).get(0)).height;
    },

    isTextVCentered: function(selector) {
      var el = $(selector);
      var height = this.pixelsToInt(el.css('height'));
      var lineHeight = this.pixelsToInt(el.css('line-height'));
      return height === lineHeight && height > 0;
    },

    format: function(msg, val0, val1) {
      return msg.replace("{0}", val0). replace("{1}", val1);
    },

    formatRequired: function(msg0, val0, val1) {
      var msg = msg0 + " is '{0}' while required '{1}'";
      return this.format(msg, val0, val1);
    },

    formatUnknown: function(msg, val) {
      return this.format("unknown '{0}: {1}'", msg, val);
    },

    isGenericFontFamily: function(family) {
      return family === "serif" || family === "sans-serif" || family === "monospace"
        || family === "cursive" || family === "fantasy";
    },

    getGenericFontFamily: function(family) {
      if (this.isGenericFontFamily(family))
        return family;
      if (family.search("Times") >= 0
          || family.search("Georgia") >= 0
          || family.search("Palatino") >= 0
        ) 
        return "serif";

      if (family.search("Arial") >= 0
        || family.search("Sans") >= 0
        || family.search("Helvetica") >= 0
        || family.search("Tahoma") >= 0
        || family.search("Geneva") >= 0
        || family.search("Verdana") >= 0
        || family.search("Impact") >= 0
        ) 
        return "sans-serif";

      if (family.search("Courier") >= 0
        || family.search("Console") >= 0
        ) 
        return "monospace";

      throw this.formatUnknown("font generic family", family);
    },

    isFont: function(selector, font) {
      var el = $(selector);
      var value;
      if (font.size) {
        value = el.css("font-size");
        if (this.pixelsToInt(font.size) !== this.pixelsToInt(value))
          throw this.formatRequired("font-size", value, font.size);
      }
      if (font.weight) {
        //font-weight: normal|bold|bolder|lighter|number|initial|inherit;
        value = el.css("font-weight");
        if (font.weight !== value)
          throw this.formatRequired("font-weight'", value, font.weight);
      }
      if (font.style) {
        //"style:normal|italic|oblique"
        value = el.css("font-style");
        if (font.style !== value)
          throw this.formatRequired("font-style", value, font.style);
      }
      if (font.variant) {
        //variant: normal|small-caps|initial|inherit
        value = el.css("font-variant");
        if (font.variant !== value)
          throw this.formatRequired("font-variant", value, font.variant);
      }
      if (font.family) {
        value = el.css("font-family");
        if (this.isGenericFontFamily(font.family)) {
          value = this.getGenericFontFamily(value);
        }
        if (font.family !== value)
          throw this.formatRequired("font-family", value, font.family);
      }

      return true;
    },

  };

  need.export('cstyle', module);


})();
