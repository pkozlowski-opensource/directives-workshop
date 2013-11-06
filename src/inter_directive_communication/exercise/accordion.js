angular.module('bs.accordion', [])

  .controller('AccordionCtrl', function ($scope) {

    $scope.panels = [];

    this.toggleCollapse = function (panelScope) {
      panelScope.isOpen = !panelScope.isOpen;
      //close other panels if needed
      if (panelScope.isOpen) {
        angular.forEach($scope.panels, function (otherPanelScope) {
          if (otherPanelScope != panelScope) {
            otherPanelScope.isOpen = false;
          }
        });
      }
    };

    this.addPanel = function (panelScope) {
      $scope.panels.push(panelScope);
    };

    this.removePanel = function (panelScope) {
      $scope.panels.splice($scope.panels.indexOf(panelScope), 1);
    };
  })

  .directive('bsAccordion', function () {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'templates/accordion/accordion.tpl.html',
      transclude: true,
      replace: true,
      controller: 'AccordionCtrl'
    };
  })

  .directive('bsCollapse', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/collapse/collapse.tpl.html',
      transclude: true,
      replace: true,
      scope: {
        heading: '@'
      },
      require: '^?bsAccordion',
      link: function (scope, iElement, iAttrs, accordionCtrl) {

        if (angular.isUndefined(accordionCtrl)) {
          accordionCtrl = {
            toggleCollapse: angular.noop,
            addPanel: angular.noop,
            removePanel: angular.noop
          };
        }

        scope.isOpen = false;

        scope.toggleCollapse = function () {
          accordionCtrl.toggleCollapse(scope);
        };

        accordionCtrl.addPanel(scope);

        scope.$on('$destroy', function () {
          accordionCtrl.removePanel(scope);
        });
      }
    };
  });