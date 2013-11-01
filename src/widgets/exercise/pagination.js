angular.module('bs.pagination', [])
  .directive('bsPagination', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        page: '=',
        collectionSize: '&',
        pageSize: '&'
      },
      templateUrl: '/templates/pagination/pagination.tpl.html',
      link: function (scope, iElement, iAttrs) {

        var noOfPages;
        scope.pages = [];

        function calculateNoOfPages(collectionSize, pageSize) {
          return Math.ceil(collectionSize / (pageSize || 10));
        }

        function preparePagesModel(noOfPages) {
          scope.pages.length = 0;
          for (var i = 0; i < noOfPages; i++) {
            scope.pages.push(i);
          }
        }

        scope.selectPage = function (pageNo) {
          scope.page = Math.max(Math.min(pageNo, noOfPages - 1), 0);
        };

        scope.hasPrevious = function () {
          return scope.page > 0;
        };

        scope.hasNext = function () {
          return scope.page < noOfPages - 1;
        };

        scope.$watch(scope.collectionSize, function (newSize) {
          noOfPages = calculateNoOfPages(newSize, scope.pageSize());
          preparePagesModel(noOfPages);
          scope.selectPage(scope.page);
        });

        scope.$watch(scope.pageSize, function (newSize) {
          noOfPages = calculateNoOfPages(scope.collectionSize(), newSize);
          preparePagesModel(noOfPages);
          scope.selectPage(scope.page);
        });

        scope.$watch('page', function (newPage) {
          scope.selectPage(newPage);
        });
      }
    };
  });