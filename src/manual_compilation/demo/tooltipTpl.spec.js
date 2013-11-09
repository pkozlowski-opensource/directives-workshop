describe('tooltipTpl', function () {

  var $scope, $compile;
  var $templateCache;

  beforeEach(module('bs.tooltipTpl'));
  beforeEach(inject(function ($rootScope, _$compile_, _$templateCache_) {
    $scope = $rootScope;
    $compile = _$compile_;
    $templateCache = _$templateCache_;
  }));

  function compileElement(elementString, scope) {
    var element = $compile(elementString)(scope);
    scope.$digest();
    return element;
  }

  it('should show and hide tooltip on mouse enter / leave', function () {
    $templateCache.put('content.html', '<span>some content</span>');
    var elm = compileElement('<div><button bs-tooltip-tpl="content.html"></button></div>', $scope);

    elm.find('button').mouseenter();
    expect(elm.find('.tooltip').length).toEqual(1);

    elm.find('button').mouseleave();
    expect(elm.find('.tooltip').length).toEqual(0);
  });

  it('should allow HTML and directives in content templates', function () {
    $scope.content = 'foo';
    $templateCache.put('content.html', '<span><i ng-bind="content"></i></span>');
    var elm = compileElement('<div><button bs-tooltip-tpl="content.html"></button></div>', $scope);

    elm.find('button').mouseenter();
    var contentEl = elm.find('div.tooltip-inner>span>i');

    expect(contentEl.text()).toEqual('foo');

    $scope.$apply(function(){
      $scope.content = 'bar';
    });

    expect(contentEl.text()).toEqual('bar');
  });
});