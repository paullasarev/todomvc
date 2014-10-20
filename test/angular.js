describe("angular", function(){
  var $ = window.jQuery;
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