;(function(){
  var $ = need.import('jQuery');
  var _tinycolor = need.import('tinycolor');

  var _pixelsToInt = function (val) {
    return parseInt(val, 10);
  };

  var _format = function(msg, val0, val1) {
    return msg.replace("{0}", val0). replace("{1}", val1);
  };

  var _formatRequired = function(msg0, val0, val1) {
    var msg = msg0 + " is '{0}' while required '{1}'";
    return _format(msg, val0, val1);
  };

  var _formatUnknown = function(msg, val) {
    return _format("unknown '{0}: {1}'", msg, val);
  };

  var _compareColor = function(etalon, value, msg) {
    if (_tinycolor(etalon).toHexString() !== _tinycolor(value).toHexString())
      throw new Error(_formatRequired(msg, value, etalon));
  };

  var _comparePixels = function(etalon, value, msg) {
    if (_pixelsToInt(etalon) !== _pixelsToInt(value))
      throw new Error(_formatRequired(msg, value, etalon));
  };

  var _compareValues = function(etalon, value, msg) {
    if (etalon !== value)
      throw new Error(_formatRequired(msg, value, etalon));
  };

  var _parseBorder = function(border, borderStyle, borderWidth, borderColor) {
    var parts = border.split(' ');
    if (parts.length > 0 )
      borderStyle = parts[0];
    if (parts.length > 1 )
      borderWidth = parts[1];
    if (parts.length > 2 )
      borderColor = parts[2];
  };

  var _findStyleSheet = function(selector) {
    var i,j;
    for(i = 0; i < document.styleSheets.length; ++i) {
      var styleSheet = document.styleSheets[i];
      var rules = styleSheet.cssRules;
      if (!rules)
        rules = styleSheet.rules;
      if (!rules)
        continue;
      for(j = 0; j < rules.length; ++j) {
        var rule = rules[j];

        if(selector === rule.selectorText) {
          return {
            css: function(property) {
              return rule.style[property];
            }
          };
        }
      }
    }
    throw new Error(_format("didn't find pseudo selector {0}", selector));  
  };

  var _getCssAccessors = function(selector, pseudo, browsers) {
    var results = [];
    if (!pseudo)
      results.push($(selector));

    if (!browsers)
      browsers = ['webkit', 'moz', 'ie'];
    else if (typeof browsers == 'string')
      browsers = browsers.split(',');

    if (pseudo === 'placeholder') {
      if (browsers.indexOf('webkit') >= 0 )
        results.push(_findStyleSheet(selector + "::-webkit-input-placeholder"));
      if (browsers.indexOf('moz') >= 0 )
        results.push(_findStyleSheet(selector + "::-moz-placeholder"));
      if (browsers.indexOf('ie') >= 0 )
        results.push(_findStyleSheet(selector + ":-ie-input-placeholder"));
    }

    if (!results.length)
      throw new Error(_format("no CSS accessors for '{0}/{1}'", selector, pseudo));

    return results;
  };

  var module = {
    tinycolor: _tinycolor,

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

    isHorisontallyCentered: function (frameSelector, elementSelector) {
      var frameRect=this.getElementOffsetRect($(frameSelector).get(0));
      var elementRect=this.getElementOffsetRect($(elementSelector).get(0));

      var frameCenter = frameRect.left + frameRect.width / 2.0;
      var elementCenter = elementRect.left + elementRect.width / 2.0;

      var offset = Math.abs(frameCenter - elementCenter);
      var success = (offset <= 0.5);

      //http://javascript.ru/ui/offset
      if (!success)
        throw _formatRequired(_format("horisontal center of '{0}' in '{1}'", elementSelector, frameSelector)
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
        throw _formatRequired(_format("vertical center of '{0}' in '{1}'", elementSelector, frameSelector)
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
        throw _formatRequired(_format("top '{0}' in '{1}'", elementSelector, frameSelector)
         , elementRect.top, frameRect.top);

      return true;
    },

    isFitWidth: function (frameSelector, elementSelector) {
      var frameRect=this.getElementOffsetRect($(frameSelector).get(0));
      var elementRect=this.getElementOffsetRect($(elementSelector).get(0));

      if (elementRect.left != frameRect.left || elementRect.right != frameRect.right)
        throw _formatRequired(_format("fit width '{0}' in '{1}'", elementSelector, frameSelector)
         , String(elementRect.left) + "/" + String(elementRect.right)
         , String(frameRect.left) + "/" + String(frameRect.right));

      return true;
    },

    isUnder: function (frameSelector, elementSelector) {
      var frameRect=this.getElementOffsetRect($(frameSelector).get(0));
      var elementRect=this.getElementOffsetRect($(elementSelector).get(0));

      if (elementRect.top != frameRect.bottom)
        throw _formatRequired(_format("'{0}' under '{1}'", elementSelector, frameSelector)
         , elementRect.top, frameRect.bottom);

      return true;
    },

    isTextCentered: function (elementSelector) {
      var textAlign = $(elementSelector).css("text-align");

      return textAlign === "center";
    },

    isContentOnly: function (selector) {
      var el = $(selector);
      var margin = _pixelsToInt(el.css('margin'));
      var padding = _pixelsToInt(el.css('padding'));
      var border = _pixelsToInt(el.css('border'));
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
      var height = _pixelsToInt(el.css('height'));
      var lineHeight = _pixelsToInt(el.css('line-height'));
      return height === lineHeight && height > 0;
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

      throw _formatUnknown("font generic family", family);
    },

    isFont: function(selector, font, pseudo/*=null*/, browsers/*=null*/) {
      var variants = _getCssAccessors(selector, pseudo, browsers);
      for (var i = 0; i < variants.length; i++) {
        var el = variants[i];

        //var el = $(selector);
        var value;
        if (font.size) {
          value = el.css("font-size");
          _comparePixels(font.size, value, "font-size");
        }
        if (font.weight) {
          //font-weight: normal|bold|bolder|lighter|number|initial|inherit;
          value = el.css("font-weight");
          _compareValues(font.weight, value, "font-weight");
        }
        if (font.style) {
          //"style:normal|italic|oblique"
          value = el.css("font-style");
          _compareValues(font.style, value, "font-style");
        }
        if (font.variant) {
          //variant: normal|small-caps|initial|inherit
          value = el.css("font-variant");
          _compareValues(font.variant, value, "font-variant");
        }
        if (font.family) {
          value = el.css("font-family");
          if (this.isGenericFontFamily(font.family)) {
            value = this.getGenericFontFamily(value);
          }
          _compareValues(font.family, value, "font-family");
        }
      };

      return true;
    },

    isColor: function(selector, colorProperty, value) {
      var el = $(selector);
      var color = el.css(colorProperty);
      _compareColor(value, color, colorProperty);
      return true;
    },

    haveProperty: function(selector, property) {
      var el = $(selector);
      var prop = el.css(property);
      if (!prop || prop == 'none')
        throw _format("selector '{0}' have not CSS property '{1}'", selector, property);

      return true;
    },

    isTag: function(selector, tagName) {
      var value = $(selector).get(0).tagName;
      if (value.toLowerCase() !== tagName.toLowerCase())
        throw _formatRequired("tag name", value, tagName);

      return true;
    },

    isBox: function(selector, box) {
      var el = $(selector);
      var value;
      if (box.padding) {
        value = el.css("padding");
        _comparePixels(box.padding, value, "padding");
      }
      if (box.margin) {
        value = el.css("margin");
        _comparePixels(box.margin, value, "margin");
      }
      if (box.border) {
        var borderStyle, borderWidth, borderColor;
        _parseBorder(box.border, borderStyle, borderWidth, borderColor);
        if (borderStyle) {
          value = el.css("border-style");
          _compareValues(borderStyle, value, "style");
        }
        if (borderWidth) {
          value = el.css("border-width");
          _comparePixels(borderWidth, value, "width");
        }
        if (borderColor) {
          value = el.css("border-color");
          _compareColor(borderColor, value, "border-color");
        }
      }

      return true;
    },

    isAttribute: function(selector, attrName, attrValue) {
      var el = $(selector);
      var value = el.attr(attrName);
      _compareValues(attrValue, value, attrName);
    },

  };

  need.export('cstyle', module);


})();
