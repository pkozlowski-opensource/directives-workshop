angular.module('bs.ratingIgor', [])
    .directive('bsRatingIgor', function () {
      return {
        restrict: 'E',
        scope: {
          rating: '=', //or use '=ngModel' to get the component to support validation
          maxRating: '='
        },
        templateUrl: 'ratingIgor.html',
        link: function($scope) {
          var stars = $scope.stars = [];

          $scope.$watch('maxRating', function maxRatingWatchAction() {
            $scope.maxRating = parseInt($scope.maxRating, 10) || 5;

            stars.length = 0;
            for (var i = 1; i <= $scope.maxRating; i++) {
              stars.push(i);
            }
          });

          $scope.enter = function(starValue) {
            $scope.highlightedRating = starValue;
          };

          $scope.leave = function() {
            $scope.highlightedRating = null;
          };


          $scope.select = function(starValue) {
            $scope.rating = starValue;
          };

          $scope.isFilled = function(starValue) {
            return ($scope.highlightedRating || $scope.rating) >= starValue;
          };
        }
      };
    });
