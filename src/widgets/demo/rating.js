angular.module('bs.rating', [])
  .directive('bsRating', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/rating/rating.tpl.html',
      scope: {
        rating: '=',
        maxRating: '&',
        rated: '&'
      },
      link: function (scope, iElement, iAttrs) {

        var maxRating = scope.maxRating() || 5;

        scope.ratings = [];
        for (var i = 0; i < maxRating; i++) {
          scope.ratings.push(i + 1);
        }

        scope.$watch('rating', function(newRating) {
          scope.newRating = newRating;
        });

        scope.enter = function (score) {
          scope.newRating = score;
        };

        scope.leave = function (score) {
          scope.newRating = scope.rating;
        };

        scope.rate = function (score) {
          scope.rated({$new: score, $old: scope.rating});
          scope.rating = scope.newRating = score;
        };
      }
    };
  });