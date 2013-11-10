angular.module('bs.paginationIgor', [])
  .directive('bsPaginationIgor', function () {
    return {
      restrict: 'E',
      scope: {
        page: '=',
        collectionSize: '=',
        itemsPerPage: '='
      },
      templateUrl: 'paginationIgor.html',
      link: function ($scope, iElement, iAttrs) {
        var pages = $scope.pages = [];

        $scope.$watch('collectionSize', function collectionSizeWatchAction() {
          var pagesCount = Math.ceil($scope.collectionSize / ($scope.itemsPerPage || 10));

          pages.length = 0;

          for (var i = 1; i <= pagesCount; i++) {
            $scope.pages.push(i);
          }

          if ($scope.currentPage > $scope.collectionSize) {
            $scope.currentPage = $scope.collectionSize
          }
        });


        $scope.selectPage = function(page) {
          $scope.selectedPage = page;
        };

        $scope.hasPrevious = function () {
          return $scope.selectedPage > 1;
        };

        $scope.hasNext = function() {
          return $scope.selectedPage < pages.length;
        };
      }
    };
  });
