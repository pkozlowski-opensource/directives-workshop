describe('buttons - checkbox', function () {

  var $scope, $compile;

  beforeEach(module('bs.buttons-checkbox'));
  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $scope = _$rootScope_;
    $compile = _$compile_;
  }));

  var compileButton = function (markup, scope) {
    var el = $compile(markup)(scope);
    scope.$digest();
    return el;
  };

  //model -> UI
  it('should work correctly with default model values', function () {
    $scope.model = false;
    var btn = compileButton('<button ng-model="model" bs-btn-checkbox>click</button>', $scope);
    expect(btn).not.toHaveClass('active');

    $scope.model = true;
    $scope.$digest();
    expect(btn).toHaveClass('active');
  });

  it('should bind custom model values', function () {
    $scope.model = 1;
    var btn = compileButton('<button ng-model="model" bs-btn-checkbox bs-btn-checkbox-true="1" bs-btn-checkbox-false="0">click</button>', $scope);
    expect(btn).toHaveClass('active');

    $scope.model = 0;
    $scope.$digest();
    expect(btn).not.toHaveClass('active');
  });

  //UI-> model
  it('should toggle default model values on click', function () {
    $scope.model = false;
    var btn = compileButton('<button ng-model="model" bs-btn-checkbox>click</button>', $scope);

    btn.click();
    expect($scope.model).toEqual(true);
    expect(btn).toHaveClass('active');

    btn.click();
    expect($scope.model).toEqual(false);
    expect(btn).not.toHaveClass('active');
  });

  it('should toggle custom model values on click', function () {
    $scope.model = 0;
    var btn = compileButton('<button ng-model="model" bs-btn-checkbox bs-btn-checkbox-true="1" bs-btn-checkbox-false="0">click</button>', $scope);

    btn.click();
    expect($scope.model).toEqual(1);
    expect(btn).toHaveClass('active');

    btn.click();
    expect($scope.model).toEqual(0);
    expect(btn).not.toHaveClass('active');
  });

  it('should monitor true / false value changes', function () {

    $scope.model = 1;
    $scope.trueVal = 1;
    var btn = compileButton('<button ng-model="model" bs-btn-checkbox bs-btn-checkbox-true="trueVal">click</button>', $scope);

    expect(btn).toHaveClass('active');
    expect($scope.model).toEqual(1);

    $scope.model = 2;
    $scope.trueVal = 2;
    $scope.$digest();

    expect(btn).toHaveClass('active');
    expect($scope.model).toEqual(2);
  });
});