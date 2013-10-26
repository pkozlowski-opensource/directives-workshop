angular.module('bs.buttons-radio', [])

  .directive('bsBtnRadio', function () {

    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {

        //model -> UI
        ngModelCtrl.$render = function () {
          element.toggleClass('active', angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.bsBtnRadio)));
        };

        //ui->model
        element.bind('click', function () {
          if (!element.hasClass('active')) {
            scope.$apply(function () {
              ngModelCtrl.$setViewValue(scope.$eval(attrs.bsBtnRadio));
              ngModelCtrl.$render();
            });
          }
        });
      }
    };
  });
