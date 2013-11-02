describe('minutes field', function () {

  var $scope, ngModelCtrl;

  beforeEach(module('bs.timefields'));
  beforeEach(inject(function (_$rootScope_) {
    $scope = _$rootScope_;
    ngModelCtrl = {
      $setValidity: function(key, isValid) {
        ngModelCtrl[key] = isValid;
      }
    };
  }));

  describe('parsing', function () {

    var parser;

    beforeEach(inject(function (minutesParserFactory) {
      parser = minutesParserFactory(ngModelCtrl, 'key');
    }));

    it('should parse valid minutes and set validation key accordingly', function () {
      expect(parser('5').getMinutes()).toEqual(5);
      expect(ngModelCtrl.key).toBeTruthy();
    });

    it('invalid minutes should not change date values and set validation key accordingly', function () {
      ngModelCtrl.$modelValue = new Date(2*60*1000);
      expect(parser('foo').getMinutes()).toEqual(2);
      expect(ngModelCtrl.key).toBeFalsy();
    });
  });

  describe('formatting', function () {

    var formatter;

    beforeEach(inject(function (minutesFormatterFactory) {
      formatter = minutesFormatterFactory(ngModelCtrl, 'key');
    }));

    it('should format minutes and set validity of a valid date', function () {
      expect(formatter(new Date(2*60*1000))).toEqual(2);
      expect(ngModelCtrl.key).toBeTruthy();
    });

    it('should return undefined for non-model dates and mark field as invalid', function () {
      expect(formatter('not a date')).toBeUndefined();
      expect(ngModelCtrl.key).toBeFalsy();
    });
  });

});