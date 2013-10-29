describe('rating', function () {

  var $scope, $compile;

  beforeEach(module('bs.rating'));
  beforeEach(module('/templates/rating/rating.tpl.html'));

  beforeEach(inject(function ($rootScope, _$compile_) {
    $scope = $rootScope;
    $compile = _$compile_;
  }));

  beforeEach(function() {
    this.addMatchers({
      toHaveScores: function(requiredScores) {

        var scores = [];
        var spans = this.actual.find('span');
        for (var i=0; i<spans.length; i++) {
          scores.push(spans.eq(i).hasClass('glyphicon-star') ? 1 : 0);
        }

        this.message = function() {
          return "Expected '" + angular.mock.dump(scores) + "' to have '" + angular.mock.dump(requiredScores) + "'.";
        };

        return angular.equals(scores, requiredScores);
      }
    });
  });

  function compileElement(elementString, scope) {
    var element = $compile(elementString)(scope);
    scope.$digest();
    return element;
  }

  describe('model to UI', function () {

    it('should render rating based on model and default max length', function () {
      $scope.myValue = 3;
      var elm = compileElement('<bs-rating rating="myValue"></bs-rating>', $scope);
      expect(elm).toHaveScores([1, 1, 1, 0, 0]);

      $scope.$apply(function(){
        $scope.myValue = 5;
      });
      expect(elm).toHaveScores([1, 1, 1, 1, 1]);
    });

    it('should accept maxRating attribute', function () {
      $scope.myValue = 3;
      var elm = compileElement('<bs-rating rating="myValue" max-rating="3"></bs-rating>', $scope);

      expect(elm).toHaveScores([1, 1, 1]);
    });

  });

  describe('UI to model', function () {

    it('should update model on click', function () {
      $scope.myValue = 3;
      var elm = compileElement('<bs-rating rating="myValue"></bs-rating>', $scope);

      elm.find('span').eq(0).click();

      expect($scope.myValue).toEqual(1);
      expect(elm).toHaveScores([1, 0, 0, 0, 0]);
    });

    it('should support selection callback', function () {

      $scope.myValue = 3;

      $scope.onRate = function ($new, $old) {
        $scope.newRating = $new;
        $scope.oldRating = $old;
      };

      var elm = compileElement('<bs-rating rating="myValue" rated="onRate($new, $old)"></bs-rating>', $scope);

      elm.find('span').eq(0).click();

      expect($scope.newRating).toEqual(1);
      expect($scope.oldRating).toEqual(3);
    });

    it('should highlighted score without rating change on mouse hoover', function () {

      $scope.myValue = 3;
      var elm = compileElement('<bs-rating rating="myValue"></bs-rating>', $scope);

      elm.find('span').eq(0).mouseenter();

      expect($scope.myValue).toEqual(3);
      expect(elm).toHaveScores([1, 0, 0, 0, 0]);

      elm.find('span').eq(0).mouseleave();

      expect($scope.myValue).toEqual(3);
      expect(elm).toHaveScores([1, 1, 1, 0, 0]);
    });

  });

});