angular.module('bs.buttons-checkbox', [])

.directive('bsBtnCheckbox', function () {

  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ngModelCtrl) {

      function getTrueValue() {
        var trueValue = scope.$eval(attrs.bsBtnCheckboxTrue);
        return angular.isDefined(trueValue) ? trueValue : true;
      }

      function getFalseValue() {
        var falseValue = scope.$eval(attrs.bsBtnCheckboxFalse);
        return angular.isDefined(falseValue) ? falseValue : false;
      }

      //model -> UI
      ngModelCtrl.$render = function () {
        element.toggleClass('active', angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
      };

      //ui->model
      element.on('click', function () {
        scope.$apply(function () {
          ngModelCtrl.$setViewValue(element.hasClass('active') ? getFalseValue() : getTrueValue());
          ngModelCtrl.$render();
        });
      });
    }
  };
});