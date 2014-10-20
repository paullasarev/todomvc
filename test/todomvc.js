describe("todomvc", function(){
  var $ = window.jQuery;
  var expect = window.chai.expect;
  var angular = window.angular;

  it('body sould be ng-app', function() {
    expect($('body')).to.have.attr('ng-app');
  });
});