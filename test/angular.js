describe("angular", function(){
  var $ = need.import('jQuery');
  var expect = need.import('chai').expect;
  var angular = need.import('angular');

  it('body sould be ng-app', function() {
    expect($('body')).to.have.attr('ng-app');
  });

  if("angular's $injector service should be injector", function() {
    var $injector = angular.injector();
    expect($injector.get('$injector')).to.be($injector);
  });

})