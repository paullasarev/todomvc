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
  var inputLeftPadding = 40;
  var inputRightPadding = 16;
  var inputBackgroundColor = "#f4f4f4";

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
      expect(cstyle.isFont('.todo__title', {
        size: "70px",
        weight: "bold",
        family: "sans-serif",
        style: "normal",    })).ok;
    });

    it('text color', function() {
      expect(cstyle.isColor('.todo__title', 'color', headerTitleTextColor)).ok;
    });

    //text-shadow: -1px -1px rgba(0, 0, 0, 0.2);
    it('should have shadow', function() {
      cstyle.haveProperty('.todo__title', 'text-shadow');
    });

  });

  describe(".todo__caption", function(){
    it('should fit after header todo', function() {
      expect(cstyle.isUnder('.todo__header', '.todo__caption'));
      expect(cstyle.isFitWidth('.todo', '.todo__caption'));
    });

    it('should have splitter', function() {
      expect(cstyle.isOnTop('.todo__caption', '.todo__splitter'));
      expect(cstyle.isFitWidth('.todo', '.todo__splitter'));
      expect(cstyle.getHeight('.todo__splitter')).equal(splitterHeight);
      expect(cstyle.isColor('.todo__splitter', 'background-color', splitterColor));
     });
    
    it('should have input', function() {
      expect(cstyle.isUnder('.todo__splitter', '.todo__input'));
      expect(cstyle.isFitWidth('.todo', '.todo__input'));
      expect(cstyle.isTag('.todo__input', 'input'));
    });

    it('should fix input parameters', function() {
      expect(cstyle.getHeight('.todo__input')).equal(inputHeight);
      cstyle.isBox('.todo__input', {
        paddingLeft: inputLeftPadding,
        paddingRight: inputRightPadding,
        border: "none",
        margin: 0,
      });
      expect(cstyle.isFont('.todo__input', {
        size: inputFontSize,
        style: "normal",
        family: "sans-serif",
      }));

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
  });
});
