describe('collapse', function () {

  var $scope, $compile;

  beforeEach(module('bs.collapse'));
  beforeEach(module('/templates/collapse/collapse.tpl.html'));

  beforeEach(inject(function ($rootScope, _$compile_) {
    $scope = $rootScope;
    $compile = _$compile_;
  }));

  function compileElement(elementString, scope) {
    var element = $compile(elementString)(scope);
    scope.$digest();
    return element;
  }

  function findHeader(element) {
    return element.find('a.accordion-toggle');
  }

  it('should render open panel by default', function () {
    var element = compileElement('<bs-collapse heading="{{\'title\'}}">content</bs-collapse>', $scope);

    expect(findHeader(element).text()).toEqual('title');
    expect(element.find('div.panel-body').text()).toEqual('content');
    expect(element.find('div.panel-collapse')).toHaveClass('in');
  });

  it('should toggle visibility on heading click', function () {
    var element = compileElement('<bs-collapse heading="{{\'title\'}}">content</bs-collapse>', $scope);

    findHeader(element).click();
    expect(element.find('div.panel-collapse')).not.toHaveClass('in');
    expect(element.find('div.panel-collapse')).toHaveClass('collapse');

    findHeader(element).click();
    expect(element.find('div.panel-collapse')).not.toHaveClass('collapse');
    expect(element.find('div.panel-collapse')).toHaveClass('in');
  });
});