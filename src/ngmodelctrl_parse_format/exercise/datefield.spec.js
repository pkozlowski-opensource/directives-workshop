describe('datefield', function () {

  var $scope, $compile;
  var $sniffer;

  beforeEach(module('bs.datefield'));
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

    it('should format a valid date with a default format (YYYY/MM/DD)', function () {
      $scope.model = new Date(0);
      var elm = compileElement('<form name="f"><input name="i" ng-model="model" bs-datefield></form>', $scope);

      expect(elm.find('input').val()).toEqual('1970/01/01');
      expect($scope.f.i.$valid).toBeTruthy();
    });

    it('should format a valid date with a specified format (YYYY-MM-DD)', function () {
      $scope.model = new Date(0);
      var elm = compileElement('<form name="f"><input name="i" ng-model="model" bs-datefield="YYYY-MM-DD"></form>', $scope);

      expect(elm.find('input').val()).toEqual('1970-01-01');
      expect($scope.f.i.$valid).toBeTruthy();
    });

    it('should leave an input field blank and mark a field as invalid for invalid date', function () {
      $scope.model = 'invalid';
      var elm = compileElement('<form name="f"><input name="i" ng-model="model" bs-datefield></form>', $scope);

      expect(elm.find('input').val()).toEqual('');
      expect($scope.f.i.$invalid).toBeTruthy();
    });

  });

  describe('parse', function () {

    it('should correctly parse date in the default format', function () {
      var elm = compileElement('<form name="f"><input name="i" ng-model="model" bs-datefield></form>', $scope);
      changeInputValueTo(elm, '2013/11/02');

      expect($scope.model.getFullYear()).toEqual(2013);
      expect($scope.model.getMonth()).toEqual(10);
      expect($scope.model.getDate()).toEqual(2);
      expect($scope.f.i.$valid).toBeTruthy();
    });


    it('should correctly parse date in the specified format', function () {
      var elm = compileElement('<form name="f"><input name="i" ng-model="model" bs-datefield="YYYY-MM-DD"></form>', $scope);
      changeInputValueTo(elm, '2013-11-02');

      expect($scope.model.getFullYear()).toEqual(2013);
      expect($scope.model.getMonth()).toEqual(10);
      expect($scope.model.getDate()).toEqual(2);
      expect($scope.f.i.$valid).toBeTruthy();
    });

    it('should bind undefined to the model and mark a field as invalid if parsing fails', function () {

      var elm = compileElement('<form name="f"><input name="i" ng-model="model" bs-datefield></form>', $scope);
      changeInputValueTo(elm, 'gibberish');

      expect($scope.model).toBeUndefined();
      expect($scope.f.i.$invalid).toBeTruthy();
    });

  });

});