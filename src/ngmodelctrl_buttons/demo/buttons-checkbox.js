angular.module('bs.buttons-checkbox', [])

//shouldn't this be called button-toggle instead?
.directive('bsBtnCheckbox', function () {

  return {
    scope: {
      active: '=ngModel'
    },
    template: '<button ng-class="{active: active}" ng-click="active = !active" x="{{active}}" ng-transclude>"></button>',
    replace: true,
    transclude: true,
    link: function (scope, element, attrs, ngModelCtrl) {
      element.on('click', function () {
//        scope.$apply(function () {
//          //scope.active = !scope.active;
//        });
      });
    }
  };
});
