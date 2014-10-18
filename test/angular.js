describe("angular", function(){
  // var $ = need.import('jQuery');
  // var expect = need.import('chai').expect;
  // var angular = need.import('angular');
  var $ = window.$;
  var expect = window.chai.expect;
  var angular = window.angular;

  it('body sould be ng-app', function() {
    expect($('body')).to.have.attr('ng-app');
  });

  it("angular's $injector service should be injector", function() {
    var $injector = angular.injector();
    var service = $injector.get('$injector');
    expect(service).equal($injector);
  });

})