/**
 * create a component with the following interface:
 *
 *   - current-page: binding that represents an integer value of the currently selected page
 *   - collection-size: binding that represents length of the collection we are paginating over
 *   - items-per-page: binding that represents number of items that a page holds
 *
 */

angular.module('bs.paginationIgor', [])
  .directive('bsPaginationIgor', function () {
    return {
      restrict: 'E',
      templateUrl: 'paginationIgor.html'
    };
  });
