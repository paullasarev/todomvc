describe("css", function(){
  var expect = need.import('chai').expect;
  var ctyle = need.import('cstyle');
  var bodyBackgroundColor = '#e0e0e0';
  var headerTitleTextColor = '#c7c7c7';

  it('should be clean', function() {
    expect(cstyle.isContentOnly('body')).ok;
  });

  // .todo
  it('todo should be centered', function() {
    expect(cstyle.isHorisontallyCentered('body', '.todo')).ok;
  });

  it('todo should be onTop', function() {
    expect(cstyle.isOnTop('body', '.todo')).ok;
  });

  it('todo should have fixed width', function() {
    expect(cstyle.getWidth('.todo')).equal(550);
  });

  it('todo background color', function() {
    expect(cstyle.isColor('.todo', 'background-color', bodyBackgroundColor));
  });

  // .todo__header
  it('header should be centered', function() {
    expect(cstyle.isHorisontallyCentered('.todo', '.todo__header')).ok;
  });

  // .header__title
  it('title should be 100px height', function() {
    expect(cstyle.getHeight('.header__title')).equal(100);
  });

  it('title should be "todos"', function() {
    expect(cstyle.getText('.header__title')).equal('todos');
  });

  it('title should be centered horisontally', function() {
    expect(cstyle.isHorisontallyCentered('.todo__header', '.header__title')).ok;
  });

  it('title should be centered vertically', function() {
    expect(cstyle.isVerticallyCentered('.todo__header', '.header__title')).ok;
  });

  it('title should be centered', function() {
    expect(cstyle.isCentered('.todo__header', '.header__title')).ok;
  });

  it('title should be clean', function() {
    expect(cstyle.isContentOnly('.header__title')).ok;
  });

  it('title text should be bold fontface', function() {
    expect(cstyle.isFont('.header__title', {
      size: "70px",
      weight: "bold",
      family: "sans-serif",
      style: "normal",    })).ok;
  });

  it('title text color', function() {
    expect(cstyle.isColor('.header__title', 'color', headerTitleTextColor)).ok;
  });

  //text-shadow: -1px -1px rgba(0, 0, 0, 0.2);
  it('title should have shadow', function() {
    cstyle.haveProperty('.header__title', 'text-shadow');
  });

  // it('title should be centered', function() {
  //   expect(cstyle.isHorisontallyCentered('.todo', '.header__title')).ok;
  // });

});