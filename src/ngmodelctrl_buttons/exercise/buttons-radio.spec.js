describe('buttons', function () {

  var $scope, $compile;

  beforeEach(module('bs.buttons-radio'));
  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $scope = _$rootScope_;
    $compile = _$compile_;
  }));

  var compileButtons = function (markup, scope) {
    var el = $compile('<div>' + markup + '</div>')(scope);
    scope.$digest();
    return el.find('button');
  };

  //model -> UI
  it('should work correctly set active class based on model', function () {
    var btns = compileButtons(
      '<button ng-model="model" bs-btn-radio="1">click1</button>' +
      '<button ng-model="model" bs-btn-radio="2">click2</button>', $scope);
    expect(btns.eq(0)).not.toHaveClass('active');
    expect(btns.eq(1)).not.toHaveClass('active');

    $scope.model = 2;
    $scope.$digest();
    expect(btns.eq(0)).not.toHaveClass('active');
    expect(btns.eq(1)).toHaveClass('active');
  });

  //UI->model
  it('should work correctly set active class based on model', function () {
    var btns = compileButtons(
      '<button ng-model="model" bs-btn-radio="1">click1</button>' +
      '<button ng-model="model" bs-btn-radio="2">click2</button>', $scope);
    expect($scope.model).toBeUndefined();

    btns.eq(0).click();
    expect($scope.model).toEqual(1);
    expect(btns.eq(0)).toHaveClass('active');
    expect(btns.eq(1)).not.toHaveClass('active');

    btns.eq(1).click();
    expect($scope.model).toEqual(2);
    expect(btns.eq(1)).toHaveClass('active');
    expect(btns.eq(0)).not.toHaveClass('active');
  });

  it('should watch bs-btn-radio values and update state accordingly', function () {
    $scope.values = ["value1", "value2"];

    var btns = compileButtons(
      '<button ng-model="model" bs-btn-radio="values[0]">click1</button>' +
      '<button ng-model="model" bs-btn-radio="values[1]">click2</button>', $scope);
    expect(btns.eq(0)).not.toHaveClass('active');
    expect(btns.eq(1)).not.toHaveClass('active');

    $scope.model = "value2";
    $scope.$digest();
    expect(btns.eq(0)).not.toHaveClass('active');
    expect(btns.eq(1)).toHaveClass('active');

    $scope.values[1] = "value3";
    $scope.model = "value3";
    $scope.$digest();
    expect(btns.eq(0)).not.toHaveClass('active');
    expect(btns.eq(1)).toHaveClass('active');
  });
});