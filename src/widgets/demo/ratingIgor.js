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
          var maxRating = $scope.maxRating || 5;
          var stars = $scope.stars = [];

          for (var i = 1; i <= maxRating; i++) {
            stars.push(i);
          }

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
