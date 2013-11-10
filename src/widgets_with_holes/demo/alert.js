angular.module('bs.alert', [])
  .directive('bsAlert', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/alert/alert.tpl.html',
      transclude: true,
      scope: {
        type: '@',
        close: '&'
      },
      link: function (scope, iElement, iAttrs) {
        scope.closeable = "close" in iAttrs;
      }
    };
  });
