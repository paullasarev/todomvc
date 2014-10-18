;(function(){
  var $ = need.import('jQuery');
  var tinycolor = need.import('tinycolor');

  var module = {
    tinycolor: tinycolor,

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
      var frameRect=this.getElementOffsetRect($(frameSelector).get(0));
      var elementRect=this.getElementOffsetRect($(elementSelector).get(0));

      var frameCenter = frameRect.left + frameRect.width / 2.0;
      var elementCenter = elementRect.left + elementRect.width / 2.0;

      var offset = Math.abs(frameCenter - elementCenter);
      var success = (offset <= 0.5);

      //http://javascript.ru/ui/offset
      if (!success)
        throw this.formatRequired(this.format("horisontal center of '{0}' in '{1}'", elementSelector, frameSelector)
         , elementCenter, frameCenter);

      return true;
    },

    isVerticallyCentered: function (frameSelector, elementSelector) {
      var frameRect=this.getElementOffsetRect($(frameSelector).get(0));
      var elementRect=this.getElementOffsetRect($(elementSelector).get(0));

      var frameCenter = frameRect.top + frameRect.height / 2.0;
      var elementCenter = elementRect.top + elementRect.height / 2.0;

      var offset = Math.abs(frameCenter - elementCenter);
      var success = (offset <= 0.5);

      if (!success)
        throw this.formatRequired(this.format("vertical center of '{0}' in '{1}'", elementSelector, frameSelector)
         , elementCenter, frameCenter);

      return true;
    },

    isCentered: function (frameSelector, elementSelector) {
      return this.isHorisontallyCentered(frameSelector, elementSelector)
        && this.isVerticallyCentered(frameSelector, elementSelector);
    },

    isOnTop: function (frameSelector, elementSelector) {
      var frameRect=this.getElementOffsetRect($(frameSelector).get(0));
      var elementRect=this.getElementOffsetRect($(elementSelector).get(0));

      if (elementRect.top != frameRect.top)
        throw this.formatRequired(this.format("top '{0}' in '{1}'", elementSelector, frameSelector)
         , elementRect.top, frameRect.top);

      return true;
    },

    isFitWidth: function (frameSelector, elementSelector) {
      var frameRect=this.getElementOffsetRect($(frameSelector).get(0));
      var elementRect=this.getElementOffsetRect($(elementSelector).get(0));

      if (elementRect.left != frameRect.left || elementRect.right != frameRect.right)
        throw this.formatRequired(this.format("fit width '{0}' in '{1}'", elementSelector, frameSelector)
         , elementRect.left, frameRect.left);

      return true;
    },

    isUnder: function (frameSelector, elementSelector) {
      var frameRect=this.getElementOffsetRect($(frameSelector).get(0));
      var elementRect=this.getElementOffsetRect($(elementSelector).get(0));

      if (elementRect.top != frameRect.bottom)
        throw this.formatRequired(this.format("'{0}' under '{1}'", elementSelector, frameSelector)
         , elementRect.top, frameRect.bottom);

      return true;
    },

    isTextCentered: function (elementSelector) {
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

    getText: function(selector) {
      return $(selector).text().trim();
    },

    getHeight: function(selector) {
      return this.getOffsetRect(selector).height;
    },

    getWidth: function(selector) {
      return this.getOffsetRect(selector).width;
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

    isColor: function(selector, colorProperty, value) {
      var el = $(selector);
      var color = el.css(colorProperty);
      if (this.tinycolor(color).toHexString() !== this.tinycolor(value).toHexString() )
        throw this.formatRequired(colorProperty, color, value);
      return true;
    },

    haveProperty: function(selector, property) {
      var el = $(selector);
      var prop = el.css(property);
      if (!prop || prop == 'none')
        throw this.format("selector '{0}' have not CSS property '{1}'", selector, property);

      return true;
    },

  };

  need.export('cstyle', module);


})();
