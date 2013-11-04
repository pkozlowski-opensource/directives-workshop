describe('accordion', function () {

  var $scope;
  var $compile;

  beforeEach(module('bs.accordion'));
  beforeEach(module('templates/accordion/accordion.tpl.html'));
  beforeEach(module('templates/collapse/collapse.tpl.html'));
  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $scope = _$rootScope_;
    $compile = _$compile_;
  }));

  describe('accordion controller', function () {

    var accordionCtrl;

    beforeEach(inject(function ($controller) {
      accordionCtrl = $controller('AccordionCtrl', {'$scope': $scope});
    }));

    it('should allow adding and removing panels', function () {

      var p1 = {};

      accordionCtrl.addPanel(p1);
      accordionCtrl.addPanel({});
      expect($scope.panels.length).toEqual(2);

      accordionCtrl.removePanel(p1);
      expect($scope.panels.length).toEqual(1);
    });

    it('should correctly toggle open panels', function () {

      var p1 = {};
      var p2 = {};

      accordionCtrl.addPanel(p1);
      accordionCtrl.addPanel(p2);

      expect(p1.isOpen).toBeFalsy();
      expect(p2.isOpen).toBeFalsy();

      accordionCtrl.toggleCollapse(p1);
      expect(p1.isOpen).toBeTruthy();
      expect(p2.isOpen).toBeFalsy();

      accordionCtrl.toggleCollapse(p2);
      expect(p1.isOpen).toBeFalsy();
      expect(p2.isOpen).toBeTruthy();
    });
  });

  describe('accordion UI', function () {

    function compileElement(elementString, scope) {
      var element = $compile(elementString)(scope);
      scope.$digest();
      return element;
    }

    it('should render accordion', function () {

      var elm = compileElement(
        '<bs-accordion>' +
          '<bs-collapse heading="foo">foo content</bs-collapse>' +
          '<bs-collapse heading="{{\'bar\'}}">bar content</bs-collapse>' +
          '</bs-accordion>', $scope);

      var panels = elm.find('div.panel');

      expect(panels.eq(0).find('a').text()).toEqual('foo');
      expect(panels.eq(0).find('div.panel-body').text()).toEqual('foo content');

      expect(panels.eq(1).find('a').text()).toEqual('bar');
      expect(panels.eq(1).find('div.panel-body').text()).toEqual('bar content');
    });

    it('should open and collapse individual panels on click', function () {

      var elm = compileElement(
        '<bs-accordion>' +
          '<bs-collapse heading="foo">foo content</bs-collapse>' +
          '<bs-collapse heading="{{\'bar\'}}">bar content</bs-collapse>' +
          '</bs-accordion>', $scope);

      var panels = elm.find('div.panel');

      expect(panels.eq(0).find('div.panel-collapse')).toHaveClass('collapse');
      expect(panels.eq(1).find('div.panel-collapse')).toHaveClass('collapse');

      panels.eq(0).find('a').click();
      expect(panels.eq(0).find('div.panel-collapse')).not.toHaveClass('collapse');
      expect(panels.eq(1).find('div.panel-collapse')).toHaveClass('collapse');

      panels.eq(1).find('a').click();
      expect(panels.eq(0).find('div.panel-collapse')).toHaveClass('collapse');
      expect(panels.eq(1).find('div.panel-collapse')).not.toHaveClass('collapse');
    });

  });
});