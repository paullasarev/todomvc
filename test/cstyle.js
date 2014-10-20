;(function(){
  var $ = window.jQuery;
  var _tinycolor = window.tinycolor;

  var _pixelsToInt = function (val) {
    if (!val)
      return 0;
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

  var _none = function(value) {
    if (!value)
      return 'none';
    return value;
  };

  var _parseBorder = function(border) {
    var result = {};
    var parts = border.split(' ');
    if (parts.length > 0 )
      result.style = parts[0];
    if (parts.length > 1 )
      result.width = parts[1];
    if (parts.length > 2 )
      result.color = parts[2];
    return result;
  };

  var _normWeight = function(weight) {
    if (weight === '700')
      return 'bold';
    if (weight === '400')
      return 'normal';
    return weight;
  };

  var _getCssPrefix = function() {
    var styles = window.getComputedStyle(document.documentElement, '');
    var prefix = (Array.prototype.slice.call(styles).join('') 
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1];
    return prefix;
  }

  var _camelCase = function(input) { 
    return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
        return group1.toUpperCase();
    });
  };

  var _cssPrefix = _getCssPrefix();

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
              return rule.style[_camelCase(property)];
            }
          };
        }
      }
    }
    throw new Error(_format("didn't find pseudo selector {0}", selector));  
  };

  var _cssHints = {
    ':placeholder': {
      webkit: "::-webkit-input-placeholder",
      moz: "::-moz-placeholder",
      ms: ":-ms-input-placeholder"
    }
  };

  var _getCssAccessor = function(selector) {
    var pos = selector.search(":");
    if (pos < 0)
      return $(selector);

    var sel = selector.substring(0, pos);
    var pseudo = selector.substring(pos);

    var hints = _cssHints[pseudo]; 
    if (hints) {
      prefix = hints[_cssPrefix];
      if (prefix)
        return _findStyleSheet(sel + prefix);
    }

    return _findStyleSheet(sel + pseudo);
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

    isFont: function(selector, font) {
      var el = _getCssAccessor(selector);

      var value;
      if (font.size) {
        value = el.css("font-size");
        _comparePixels(font.size, value, "font-size");
      }
      if (font.weight) {
        //font-weight: normal|bold|bolder|lighter|number|initial|inherit;
        value = el.css("font-weight");
        _compareValues(_normWeight(font.weight), _normWeight(value), "font-weight");
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

      return true;
    },

    isColor: function(selector, colorProperty, value) {
      var el = _getCssAccessor(selector);
      var color = el.css(colorProperty);
      _compareColor(value, color, colorProperty);
      return true;
    },

    haveProperty: function(selector, property) {
      var el = _getCssAccessor(selector);
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
      var el = _getCssAccessor(selector);
      var value;

      if (box.padding) {
        _comparePixels(box.padding, el.css("padding-left"), "padding-left");
        _comparePixels(box.padding, el.css("padding-right"), "padding-right");
        _comparePixels(box.padding, el.css("padding-top"), "padding-top");
        _comparePixels(box.padding, el.css("padding-bottom"), "padding-bottom");
      }
      if (box['padding-left'])
        _comparePixels(box.padding, el.css("padding-left"), "padding-left");
      if (box['padding-right'])
        _comparePixels(box.padding, el.css("padding-right"), "padding-right");
      if (box['padding-top'])
        _comparePixels(box.padding, el.css("padding-top"), "padding-top");
      if (box['padding-bottom'])
        _comparePixels(box.padding, el.css("padding-bottom"), "padding-bottom");

      if (box.margin) {
        value = el.css("margin");
        _comparePixels(box.margin, value, "margin");
      }

      if (box.border) {
        var border = _parseBorder(box.border);
        if (border.style) {
          value = el.css("border-style");
          _compareValues(_none(border.style), _none(value), "style");
        }
        if (border.width) {
          value = el.css("border-width");
          _comparePixels(border.width, value, "width");
        }
        if (border.color) {
          value = el.css("border-color");
          _compareColor(border.color, value, "border-color");
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

  window.cstyle = module;

})();
