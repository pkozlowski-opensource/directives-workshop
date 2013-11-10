angular.module('bs.paginationIgor', [])
  .directive('bsPaginationIgor', function () {
    return {
      restrict: 'E',
      scope: {
        currentPage: '=',
        collectionSize: '=',
        itemsPerPage: '='
      },
      templateUrl: 'paginationIgor.html',
      link: function (scope, iElement, iAttrs) {
        var pages = scope.pages = [];
        var pagesCount;

        scope.$watch('collectionSize', function collectionSizeWatchAction() {
          pagesCount = Math.ceil(scope.collectionSize / (scope.itemsPerPage || 10));

          pages.length = 0;

          for (var i = 1; i <= pagesCount; i++) {
            scope.pages.push(i);
          }

          if (scope.currentPage > pagesCount) {
            scope.currentPage = pagesCount;
          }
        });

        scope.$watch('currentPage', function(currentPage) {
          scope.currentPage = Math.max(Math.min(currentPage, pagesCount), 1)
        });


        scope.selectPage = function(page) {
          scope.currentPage = page;
        };

        scope.hasPrevious = function () {
          return scope.currentPage > 1;
        };

        scope.hasNext = function() {
          return scope.currentPage < pages.length;
        };
      }
    };
  });
