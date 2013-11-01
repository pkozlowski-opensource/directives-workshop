describe('tooltip', function () {

  var $scope, $compile;

  beforeEach(module('bs.tooltip'));
  beforeEach(inject(function ($rootScope, _$compile_) {
    $scope = $rootScope;
    $compile = _$compile_;
  }));

  function compileElement(elementString, scope) {
    var element = $compile(elementString)(scope);
    scope.$digest();
    return element;
  }

  it('should show and hide tooltip on mouse enter / leave', function () {
    var elm = compileElement('<div><button bs-tooltip="content"></button></div>', $scope);

    elm.find('button').mouseenter();
    expect(elm.find('.tooltip').length).toEqual(1);

    elm.find('button').mouseleave();
    expect(elm.find('.tooltip').length).toEqual(0);
  });

  it('should observe interpolated content', function () {
    $scope.content = 'foo';
    var elm = compileElement('<div><button bs-tooltip="{{content}}"></button></div>', $scope);

    elm.find('button').mouseenter();
    expect(elm.find('.tooltip-inner').text()).toEqual('foo');

    $scope.content = 'bar';
    $scope.$digest();
    expect(elm.find('.tooltip-inner').text()).toEqual('bar');
  });

  describe('placement', function () {

    it('should be placed on top by default', function () {
      var elm = compileElement('<div><button bs-tooltip="content"></button></div>', $scope);

      elm.find('button').mouseenter();
      expect(elm.find('.tooltip')).toHaveClass('top');
    });

    it('should accept placement attribute', function () {
      var elm = compileElement('<div><button bs-tooltip="content" bs-tooltip-placement="right"></button></div>', $scope);

      elm.find('button').mouseenter();
      expect(elm.find('.tooltip')).toHaveClass('right');
      expect(elm.find('.tooltip')).not.toHaveClass('top');
    });

  });
});