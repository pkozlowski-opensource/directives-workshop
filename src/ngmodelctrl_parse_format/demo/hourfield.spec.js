describe('hour field', function () {

  var $scope, $compile;
  var $sniffer;

  beforeEach(module('bs.timefields'));
  beforeEach(inject(function (_$rootScope_, _$compile_, _$sniffer_) {
    $scope = _$rootScope_;
    $compile = _$compile_;
    $sniffer = _$sniffer_;
  }));

  function compileElement(elementString, scope) {
    var element = $compile(elementString)(scope);
    scope.$digest();
    return element;
  }

  function changeInputValueTo(element, value) {
    var inputEl = element.find('input');
    inputEl.val(value);
    inputEl.trigger($sniffer.hasEvent('input') ? 'input' : 'change');
    $scope.$digest();
  }

  describe('format', function () {

    it('should format a valid hour', function () {
      ($scope.model = new Date()).setHours(15);
      var elm = compileElement('<form name="f"><input name="i" ng-model="model" bs-hourfield></form>', $scope);

      expect(elm.find('input').val()).toEqual('15');
      expect($scope.f.i.$valid).toBeTruthy();
    });

    it('should leave an input field blank and mark a field as invalid for invalid hour', function () {
      var elm = compileElement('<form name="f"><input name="i" ng-model="model" bs-hourfield></form>', $scope);

      expect(elm.find('input').val()).toEqual('');
      expect($scope.f.i.$invalid).toBeTruthy();
    });

  });

  describe('parsing', function () {

    it('should correctly parse hour in the 24 hour format', function () {
      var elm = compileElement('<form name="f"><input name="i" ng-model="model" bs-hourfield></form>', $scope);
      changeInputValueTo(elm, '20');

      expect($scope.model.getHours()).toEqual(20);
      expect($scope.f.i.$valid).toBeTruthy();
    });

    it('should not change hour value and mark a field as invalid if parsing fails', function () {

      $scope.model = new Date();
      var elm = compileElement('<form name="f"><input name="i" ng-model="model" bs-hourfield></form>', $scope);
      changeInputValueTo(elm, '40');

      expect($scope.model.getHours()).toEqual($scope.model.getHours());
      expect($scope.f.i.$invalid).toBeTruthy();
    });

  });
});