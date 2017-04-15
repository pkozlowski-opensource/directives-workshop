describe("alert", function () {

  var $scope, $compile;

  beforeEach(module('bs.alert'));
  beforeEach(module('/templates/alert/alert.tpl.html'));

  beforeEach(inject(function ($rootScope, _$compile_) {
    $scope = $rootScope;
    $compile = _$compile_;
  }));

  function compileElement(elementString, scope) {
    var element = $compile(elementString)(scope);
    scope.$digest();
    return element;
  }

  function findCloseButton(element) {
    return element.find('button.close');
  }

  it('should set "warning" CSS class by default', function () {
    var element = compileElement('<bs-alert>Default</bs-alert>', $scope);
    expect(element).toHaveClass('alert-warning');
  });

  it('should set appropriate CSS class based on the alert type', function () {
    var element = compileElement('<bs-alert type="{{\'info\'}}">Info</bs-alert>', $scope);
    expect(element).toHaveClass('alert-info');
  });
  
  it('should be possible to add additional classes for alert', function () {
    var element = compileElement('<bs-alert class="alert-block" type="info">Some additional class</bs-alert>', $scope);
    expect(element).toHaveClass('alert-block');
    expect(element).toHaveClass('alert-info');
  });

  it('should not show close buttons if no close callback specified', function () {
    var element = compileElement('<bs-alert>No close</bs-alert>', $scope);
    expect(findCloseButton(element).is(':visible')).toBeFalsy();
  });

  it('should fire callback when closed', function () {
    $scope.removeAlert = function() {
      $scope.removed = true;
    };
    var element = compileElement('<bs-alert close="removeAlert()">Has close</bs-alert>', $scope);

    findCloseButton(element).click();
    expect($scope.removed).toBeTruthy();
  });

});