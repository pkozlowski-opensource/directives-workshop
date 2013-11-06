angular.module('bs.datefield', [])
  .directive('bsDatefield', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {

        var dateFormat = attrs.bsDatefield || 'YYYY/MM/DD';

        ngModelCtrl.$parsers.push(function (viewValue) {

          //convert string input into moment data model
          var parsedMoment = moment(viewValue, dateFormat);

          //toggle validity
          ngModelCtrl.$setValidity('datefield', parsedMoment.isValid());

          //return model value
          return parsedMoment.isValid() ? parsedMoment.toDate() : undefined;
        });

        ngModelCtrl.$formatters.push(function (modelValue) {

          var isModelADate = angular.isDate(modelValue);
          ngModelCtrl.$setValidity('datefield', isModelADate);

          return isModelADate ? moment(modelValue).format(dateFormat) : undefined;
        });
      }
    };
  });