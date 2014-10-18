describe("css", function(){
  var expect = need.import('chai').expect;
  var ctyle = need.import('cstyle');
  var bodyBackgroundColor = '#e0e0e0';
  var headerTitleTextColor = '#c7c7c7';
  var todoWidth = 550;
  var splitterHeight = 15;
  var splitterColor = '#7f6f68';

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

  describe(".header__title", function(){
    it('should be 100px height', function() {
      expect(cstyle.getHeight('.header__title')).equal(100);
    });

    it('should be "todos"', function() {
      expect(cstyle.getText('.header__title')).equal('todos');
    });

    it('should be centered', function() {
      expect(cstyle.isCentered('.todo__header', '.header__title')).ok;
    });

    it('should be only content', function() {
      expect(cstyle.isContentOnly('.header__title')).ok;
    });

    it('text should be bold fontface', function() {
      expect(cstyle.isFont('.header__title', {
        size: "70px",
        weight: "bold",
        family: "sans-serif",
        style: "normal",    })).ok;
    });

    it('text color', function() {
      expect(cstyle.isColor('.header__title', 'color', headerTitleTextColor)).ok;
    });

    //text-shadow: -1px -1px rgba(0, 0, 0, 0.2);
    it('should have shadow', function() {
      cstyle.haveProperty('.header__title', 'text-shadow');
    });

  });

  describe(".todo__caption", function(){
    it('should fit after header todo', function() {
      expect(cstyle.isUnder('.todo__header', '.todo__caption'));
      expect(cstyle.isFitWidth('.todo', '.todo__caption'));
    });

    it('should have splitter', function() {
      expect(cstyle.isOnTop('.todo__caption', '.caption__splitter'));
      expect(cstyle.isFitWidth('.todo', '.caption__splitter'));
      expect(cstyle.getHeight('.caption__splitter')).equal(splitterHeight);
      expect(cstyle.isColor('.caption__splitter', 'background-color', splitterColor));
     });
    
  });
});