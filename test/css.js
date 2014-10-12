describe("css", function(){
  var expect = need.import('chai').expect;
  var ctyle = need.import('cstyle');

  it('should be clean', function() {
    expect(cstyle.isContentOnly('body')).ok;
  });

  it('header should be centered', function() {
    expect(cstyle.isHorisontallyCentered('body', '.header')).ok;
  });

});