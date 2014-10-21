describe("css", function(){
  var expect = window.chai.expect;
  var ctyle = window.cstyle;

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
      expect(cstyle.isContentOnly('body')).ok;
    });
  });

  describe(".todo", function(){
    it('todo should be centered', function() {
      expect(cstyle.isHorisontallyCentered('body', '.todo')).ok;
    });

    it('todo should be onTop', function() {
      expect(cstyle.isOnTop('body', '.todo')).ok;
    });

    it('todo should have fixed width', function() {
      expect(cstyle.getWidth('.todo')).equal(todoWidth);
    });

    it('todo background color', function() {
      expect(cstyle.isColor('.todo', 'background-color', bodyBackgroundColor));
    });
  });

  describe(".todo__header", function(){
    it('header should be centered', function() {
      expect(cstyle.isHorisontallyCentered('.todo', '.todo__header')).ok;
    });
  });

  describe(".todo__title", function(){
    it('should be 100px height', function() {
      expect(cstyle.getHeight('.todo__title')).equal(100);
    });

    it('should be "todos"', function() {
      expect(cstyle.getText('.todo__title')).equal('todos');
    });

    it('should be centered', function() {
      expect(cstyle.isCentered('.todo__header', '.todo__title')).ok;
    });

    it('should be only content', function() {
      expect(cstyle.isContentOnly('.todo__title')).ok;
    });

    it('text should be bold fontface', function() {
      cstyle.isFont('.todo__title', {
        size: "70px",
        weight: "bold",
        family: "sans-serif",
        style: "normal",    
      });
    });

    it('text color', function() {
      cstyle.isColor('.todo__title', 'color', headerTitleTextColor);
    });

    //text-shadow: -1px -1px rgba(0, 0, 0, 0.2);
    it('should have shadow', function() {
      cstyle.haveProperty('.todo__title', 'text-shadow');
    });

  });

  describe(".todo__caption", function(){
    it('should fit after header todo', function() {
      cstyle.isUnder('.todo__header', '.todo__caption');
      cstyle.isFitWidth('.todo', '.todo__caption');
    });

    it('should have splitter', function() {
      cstyle.isOnTop('.todo__caption', '.todo__splitter');
      cstyle.isFitWidth('.todo', '.todo__splitter');
      cstyle.isHeight('.todo__splitter', splitterHeight);
      cstyle.isColor('.todo__splitter', 'background-color', splitterColor);
     });
    
    it('should have input', function() {
      cstyle.isUnder('.todo__splitter', '.todo__input');
      cstyle.isFitWidth('.todo', '.todo__input');
      cstyle.isTag('.todo__input', 'input');
    });

    it('should fix input parameters', function() {
      cstyle.isHeight('.todo__input', inputHeight);
      cstyle.isBox('.todo__input', {
        paddingLeft: inputCheckWidth,
        paddingRight: inputDelWidth,
        border: "none",
        margin: 0,
      });

      cstyle.isFont('.todo__input', {
        size: inputFontSize,
        style: "normal",
        family: "sans-serif",
      });

      cstyle.isColor('.todo__input', 'background-color', inputBackgroundColor);

      cstyle.isAttribute('.todo__input', 'placeholder', 'What needs to be done?');
      cstyle.isTextVCentered('.todo__input');
    });
      
    it('input placeholder font should be italic', function() {
      cstyle.isFont('.todo__input:placeholder',  {
        style: 'italic',
        weight: '200',
        color: '#999999',
      });
    });

    it('should have dotted bottom', function() {
      cstyle.isBox('.todo__caption', {
        'border-bottom': "dotted 1px #ccc",
      });
    });

  });

  describe(".todo__list", function(){
    var sel = '.todo__list';
    it('should have item', function() {
      cstyle.isUnder('.todo__caption', sel);
      cstyle.isFitWidth('.todo', sel);
      cstyle.isTag(sel, 'div');
    });
  });

  describe(".todo__item", function(){
    var sel = '.todo__item';
    it('should have item', function() {
      cstyle.isOnTop('.todo__list', sel);
      cstyle.isFitWidth('.todo', sel);
      cstyle.isTag(sel, 'div');
    });

    it('should fix parameters', function() {
      cstyle.isHeight(sel, inputHeight);
      cstyle.isBox(sel, {
        'border-left': "none",
        'border-right': "none",
        margin: 0,
      });
      cstyle.isFont(sel, {
        size: inputFontSize,
        style: "normal",
        family: "sans-serif",
      });

      cstyle.isColor(sel, 'background-color', inputBackgroundColor);
    });

    it('should have dotted bottom', function() {
      cstyle.isBox(sel, {
        'border-bottom': "dotted 1px #ccc",
      });
    });


    it('should have check button', function() {
      var sel = '.todo__item__check';
      cstyle.isTag(sel, 'input');
      cstyle.isAttribute(sel, 'type', 'checkbox');
      cstyle.isBox(sel, {
        width: inputCheckWidth,
        color: inputBackgroundColor,
        border: 'none',
      });
      cstyle.isFitHeight('.todo__item', sel);
      cstyle.isStartOnLeft('.todo__item', sel);
    });

    it('should have splitter', function() {
      var sel = '.todo__item__splitter';
      cstyle.isTag(sel, 'div');
      cstyle.isBox(sel, {
        width: itemSplitterWidth,
        color: inputBackgroundColor,
        borderLeft: 'solid 1px red',
        borderRight: 'solid 1px red',
        borderTop: 'none',
        borderBottom: 'none',
      });
      cstyle.isFitHeight('.todo__item', sel);
      cstyle.isOnRight('.todo__item__check', sel);
    });

    it('should have value', function() {
      var sel = '.todo__item__value';
      cstyle.isTag(sel, 'div');
      cstyle.isBox(sel, {
        color: inputBackgroundColor,
        width: todoWidth - inputDelWidth - inputCheckWidth - itemSplitterWidth,
        border: 'none',
        paddingLeft: 15,
      });
      cstyle.isFitHeight('.todo__item', sel);
      cstyle.isOnRight('.todo__item__splitter', sel);
      cstyle.isTextVCentered(sel);
    });

  });

});
