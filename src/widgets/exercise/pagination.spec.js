describe('pagination', function () {
  var $scope, $compile;

  beforeEach(module('bs.pagination'));
  beforeEach(module('/templates/pagination/pagination.tpl.html'));

  beforeEach(inject(function ($rootScope, _$compile_) {
    $scope = $rootScope;
    $compile = _$compile_;
  }));

  beforeEach(function() {
    this.addMatchers({
      toHavePageStates: function(requiredStates) {

        var states = [];
        var pages = this.actual.find('li');

        for (var i=0; i<pages.length; i++) {
          var state = 0;
          if (pages.eq(i).hasClass('active')) {
            state = 1;
          } else if (pages.eq(i).hasClass('disabled')) {
            state = -1;
          }
          states.push(state);
        }

        this.message = function() {
          return "Expected '" + angular.mock.dump(states) + "' to have '" + angular.mock.dump(requiredStates) + "'.";
        };

        return angular.equals(states, requiredStates);
      }
    });
  });

  function compileElement(elementString, scope) {
    var element = $compile(elementString)(scope);
    scope.$digest();
    return element;
  }

  describe('model to UI', function () {

    it('should render pagination based on model, collection size and page size', function () {

      $scope.myPage = 1;
      var elm = compileElement('<bs-pagination page="myPage" collection-size="5" page-size="2"></bs-pagination>', $scope);
      expect(elm).toHavePageStates([0, 0, 1, 0, 0]);

      $scope.$apply(function(){
        $scope.myPage = 0;
      });
      expect(elm).toHavePageStates([-1, 1, 0, 0, 0]);
    });

    it('should re-render pages in response to collection size change', function () {

      $scope.myPage = 4;
      $scope.myCollectionLen = 50;
      var elm = compileElement('<bs-pagination page="myPage" collection-size="myCollectionLen"></bs-pagination>', $scope);
      expect(elm).toHavePageStates([0, 0, 0, 0, 0, 1, -1]);

      $scope.$apply(function(){
        $scope.myCollectionLen = 30;
      });
      expect(elm).toHavePageStates([0, 0, 0, 1, -1]);
      expect($scope.myPage).toEqual(2);
    });

  });
});