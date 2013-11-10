angular.module('bs.tabs', [])

  .controller('BsTabsController', function ($scope) {

    $scope.tabs = [];

    $scope.selectActiveTab = function (tabIdx) {
      if (tabIdx >= 0 && tabIdx < $scope.tabs.length) {
        angular.forEach($scope.tabs, function (tab) {
          tab.isActive = false;
        });
        $scope.tabs[tabIdx].isActive = true;
      }
    };

    this.addTab = function (tabScope) {
      $scope.tabs.push(tabScope);
      //it is the first tab in the collection or an active tab was added, let's make it active
      if ($scope.tabs.length === 1 || tabScope.isActive) {
        $scope.selectActiveTab($scope.tabs.length - 1);
      }
    };

    this.removeTab = function (tabScope) {
      $scope.tabs.splice($scope.tabs.indexOf(tabScope), 1);
    };
  })

  .directive('bsTabs', function () {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'templates/tabs/tabs.tpl.html',
      transclude: true,
      replace: true,
      controller: 'BsTabsController '
    };
  })

  .directive('bsTab', function () {
    return {
      restrict: 'EA',
      scope: {
        heading: '@'
      },
      templateUrl: 'templates/tabs/tab.tpl.html',
      transclude: true,
      replace: true,
      require: '^bsTabs',
      link: function (scope, element, attrs, tabsCtrl) {

        tabsCtrl.addTab(scope);

        scope.$on('$destroy', function () {
          tabsCtrl.removeTab(scope);
        });
      }
    };
  });