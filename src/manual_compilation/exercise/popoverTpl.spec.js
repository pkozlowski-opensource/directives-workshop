describe('popover', function () {

  var $scope, $compile;
  var $templateCache;

  beforeEach(module('bs.popoverTpl'));
  beforeEach(inject(function ($rootScope, _$compile_,  _$templateCache_) {
    $scope = $rootScope;
    $compile = _$compile_;
    $templateCache = _$templateCache_;
  }));

  function compileElement(elementString, scope) {
    var element = $compile(elementString)(scope);
    scope.$digest();
    return element;
  }

  it('should show and hide popover on click', function () {
    $templateCache.put('content.html', '<span>some content</span>');
    var elm = compileElement('<div><button bs-popover-tpl="content.html"></button></div>', $scope);

    elm.find('button').click();
    expect(elm.find('.popover').length).toEqual(1);

    elm.find('button').click();
    expect(elm.find('.popover').length).toEqual(0);
  });

  it('should observe interpolated content and title', function () {
    $templateCache.put('content.html', '<span ng-bind="content"></span>');
    $scope.title = 't1';
    $scope.content = 'foo';
    var elm = compileElement('<div><button bs-popover-tpl="content.html" bs-popover-title="{{title}}"></button></div>', $scope);

    elm.find('button').click();
    expect(elm.find('.popover-title').text()).toEqual('t1');
    expect(elm.find('.popover-content').text()).toEqual('foo');

    $scope.$apply(function(){
      $scope.title = 't2';
      $scope.content = 'bar';
    });

    expect(elm.find('.popover-title').text()).toEqual('t2');
    expect(elm.find('.popover-content').text()).toEqual('bar');
  });
});