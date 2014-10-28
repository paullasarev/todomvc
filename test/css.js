describe("css", function(){
  var expect = window.chai.expect;
  var tdstyle = window.tdstyle;

  var bodyBackgroundColor = '#e0e0e0';
  var headerTitleTextColor = '#c7c7c7';
  var todoWidth = 550;

  var splitterHeight = 15;
  var splitterColor = '#7f6f68';

  var inputHeight = 48;
  var inputFontSize = 23;
  var inputCheckWidth = 40;
  var inputDelWidth = 16;
  var inputBackgroundColor = "#f4f4f4";
  var itemSplitterWidth = 4;

  describe("body", function(){
    it('body should be clean', function() {
      expect(tdstyle.isContentOnly('body')).ok;
    });
  });

  describe(".todo", function(){
    it('todo should be centered', function() {
      expect(tdstyle.isHorisontallyCentered('body', '.todo')).ok;
    });

    it('todo should be onTop', function() {
      expect(tdstyle.isOnTop('body', '.todo')).ok;
    });

    it('todo should have fixed width', function() {
      expect(tdstyle.getWidth('.todo')).equal(todoWidth);
    });

    it('todo background color', function() {
      expect(tdstyle.isColor('.todo', 'background-color', bodyBackgroundColor));
    });
  });

  describe(".todo__header", function(){
    it('header should be centered', function() {
      expect(tdstyle.isHorisontallyCentered('.todo', '.todo__header')).ok;
    });
  });

  describe(".todo__title", function(){
    it('should be 100px height', function() {
      expect(tdstyle.getHeight('.todo__title')).equal(100);
    });

    it('should be "todos"', function() {
      expect(tdstyle.getText('.todo__title')).equal('todos');
    });

    it('should be centered', function() {
      expect(tdstyle.isCentered('.todo__header', '.todo__title')).ok;
    });

    it('should be only content', function() {
      expect(tdstyle.isContentOnly('.todo__title')).ok;
    });

    it('text should be bold fontface', function() {
      tdstyle.isFont('.todo__title', {
        size: "70px",
        weight: "bold",
        family: "sans-serif",
        style: "normal",    
      });
    });

    it('text color', function() {
      tdstyle.isColor('.todo__title', 'color', headerTitleTextColor);
    });

    //text-shadow: -1px -1px rgba(0, 0, 0, 0.2);
    it('should have shadow', function() {
      tdstyle.haveProperty('.todo__title', 'text-shadow');
    });

  });

  describe(".todo__caption", function(){
    it('should fit after header todo', function() {
      tdstyle.isUnder('.todo__header', '.todo__caption');
      tdstyle.isFitWidth('.todo', '.todo__caption');
    });

    it('should have splitter', function() {
      tdstyle.isOnTop('.todo__caption', '.todo__splitter');
      tdstyle.isFitWidth('.todo', '.todo__splitter');
      tdstyle.isHeight('.todo__splitter', splitterHeight);
      tdstyle.isColor('.todo__splitter', 'background-color', splitterColor);
     });
    
    it('should have input', function() {
      tdstyle.isUnder('.todo__splitter', '.todo__input');
      tdstyle.isFitWidth('.todo', '.todo__input');
      tdstyle.isTag('.todo__input', 'input');
    });

    it('should fix input parameters', function() {
      tdstyle.isHeight('.todo__input', inputHeight);
      tdstyle.isBox('.todo__input', {
        paddingLeft: inputCheckWidth,
        paddingRight: inputDelWidth,
        border: "none",
        margin: 0,
      });

      tdstyle.isFont('.todo__input', {
        size: inputFontSize,
        style: "normal",
        family: "sans-serif",
      });

      tdstyle.isColor('.todo__input', 'background-color', inputBackgroundColor);

      tdstyle.isAttribute('.todo__input', 'placeholder', 'What needs to be done?');
      tdstyle.isTextVCentered('.todo__input');
    });
      
    it('input placeholder font should be italic', function() {
      tdstyle.isFont('.todo__input:placeholder',  {
        style: 'italic',
        weight: '200',
        color: '#999999',
      });
    });

    it('should have dotted bottom', function() {
      tdstyle.isBox('.todo__caption', {
        'border-bottom': "dotted 1px #ccc",
      });
    });

  });

  describe(".todo__list", function(){
    var sel = '.todo__list';
    it('should have item', function() {
      tdstyle.isUnder('.todo__caption', sel);
      tdstyle.isFitWidth('.todo', sel);
      tdstyle.isTag(sel, 'div');
    });
  });

  describe(".todo__item", function(){
    var sel = '.todo__item';
    it('should have item', function() {
      tdstyle.isOnTop('.todo__list', sel);
      tdstyle.isFitWidth('.todo', sel);
      tdstyle.isTag(sel, 'div');
    });

    it('should fix parameters', function() {
      tdstyle.isHeight(sel, inputHeight);
      tdstyle.isBox(sel, {
        'border-left': "none",
        'border-right': "none",
        margin: 0,
      });
      tdstyle.isFont(sel, {
        size: inputFontSize,
        style: "normal",
        family: "sans-serif",
      });

      tdstyle.isColor(sel, 'background-color', inputBackgroundColor);
    });

    it('should have dotted bottom', function() {
      tdstyle.isBox(sel, {
        'border-bottom': "dotted 1px #ccc",
      });
    });


    it('should have check button', function() {
      var sel = '.todo__item__check';
      tdstyle.isTag(sel, 'input');
      tdstyle.isAttribute(sel, 'type', 'checkbox');
      tdstyle.isBox(sel, {
        width: inputCheckWidth,
        color: inputBackgroundColor,
        border: 'none',
      });
      tdstyle.isFitHeight('.todo__item', sel);
      tdstyle.isStartOnLeft('.todo__item', sel);
    });

    it('should have splitter', function() {
      var sel = '.todo__item__splitter';
      tdstyle.isTag(sel, 'div');
      tdstyle.isBox(sel, {
        width: itemSplitterWidth,
        color: inputBackgroundColor,
        borderLeft: 'solid 1px red',
        borderRight: 'solid 1px red',
        borderTop: 'none',
        borderBottom: 'none',
      });
      tdstyle.isFitHeight('.todo__item', sel);
      tdstyle.isOnRight('.todo__item__check', sel);
    });

    it('should have value', function() {
      var sel = '.todo__item__value';
      tdstyle.isTag(sel, 'div');
      tdstyle.isBox(sel, {
        color: inputBackgroundColor,
        width: todoWidth - inputDelWidth - inputCheckWidth - itemSplitterWidth,
        border: 'none',
        paddingLeft: 15,
      });
      tdstyle.isFitHeight('.todo__item', sel);
      tdstyle.isOnRight('.todo__item__splitter', sel);
      tdstyle.isTextVCentered(sel);
    });

  });

});
