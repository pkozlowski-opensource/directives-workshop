describe('popover', function () {

  var $scope, $compile;

  beforeEach(module('bs.popover'));
  beforeEach(inject(function ($rootScope, _$compile_) {
    $scope = $rootScope;
    $compile = _$compile_;
  }));

  function compileElement(elementString, scope) {
    var element = $compile(elementString)(scope);
    scope.$digest();
    return element;
  }

  it('should show and hide popover on click', function () {
    var elm = compileElement('<div><button bs-popover="content"></button></div>', $scope);

    elm.find('button').click();
    expect(elm.find('.popover').length).toEqual(1);

    elm.find('button').click();
    expect(elm.find('.popover').length).toEqual(0);
  });

  it('should observe interpolated content and title', function () {
    $scope.title = 't1';
    $scope.content = 'foo';
    var elm = compileElement('<div><button bs-popover="{{content}}" bs-popover-title="{{title}}"></button></div>', $scope);

    elm.find('button').click();
    expect(elm.find('.popover-title').text()).toEqual('t1');
    expect(elm.find('.popover-content').text()).toEqual('foo');

    $scope.title = 't2';
    $scope.content = 'bar';
    $scope.$digest();
    expect(elm.find('.popover-title').text()).toEqual('t2');
    expect(elm.find('.popover-content').text()).toEqual('bar');
  });

  describe('placement', function () {

    it('should be placed on top by default', function () {
      var elm = compileElement('<div><button bs-popover="content"></button></div>', $scope);

      elm.find('button').click();
      expect(elm.find('.popover')).toHaveClass('top');
    });

    it('should accept placement attribute', function () {
      var elm = compileElement('<div><button bs-popover="content" bs-popover-placement="right"></button></div>', $scope);

      elm.find('button').click();
      expect(elm.find('.popover')).toHaveClass('right');
      expect(elm.find('.popover')).not.toHaveClass('top');
    });

  });
});