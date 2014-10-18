describe("css", function(){
  var expect = need.import('chai').expect;
  var ctyle = need.import('cstyle');

  it('should be clean', function() {
    expect(cstyle.isContentOnly('body')).ok;
  });

  it('header should be centered', function() {
    expect(cstyle.isHorisontallyCentered('body', '.header')).ok;
  });

  it('header should be 100px height', function() {
    expect(cstyle.getHeight('.header')).equal(100);
  });

  it('header title should be "todos"', function() {
    expect(cstyle.getText('.header__title')).equal('todos');
  });

  it('header title should be centered', function() {
    expect(cstyle.isHorisontallyCentered('.header', '.header__title')).ok;
  });

  it('header title should be centered vertically', function() {
    expect(cstyle.isVerticallyCentered('.header', '.header__title')).ok;
  });

  it('header title should be centered', function() {
    expect(cstyle.isCentered('.header', '.header__title')).ok;
  });

  it('header title should be clean', function() {
    expect(cstyle.isContentOnly('.header__title')).ok;
  });

  it('header text should be bold fontface', function() {
    expect(cstyle.isFont('.header__title', {
      size: "70px",
      weight: "bold",
      family: "sans-serif",
      style: "normal",
    })).ok;
  });

});