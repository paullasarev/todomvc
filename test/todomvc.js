describe("todomvc", function(){
  var $ = need.import('jQuery');
  var expect = need.import('chai').expect;
  var angular = need.import('angular');

  it('body sould be ng-app', function() {
    expect($('body')).to.have.attr('ng-app');
  });


})