## Topics to cover

* Reminder: requiring other directive's mandatory controller (on the same element)
* Understanding and plugging into the `NgModelController.$render()` infrastructure
** it is invoked every time model changes lead to $viewValue changes
** default implementation of the `$render` method is empty, custom implementation should update DOM
** no need to observe model, it is already observed in `NgModelController`
* Understanding and using `ngModelCtrl.$setViewValue()` to propagate control state from the DOM to the model
* Using `scope.$eval()` to get just-in-time value of an attributes' expression (no need to $watch)
* No need to create an isolated scope as there is no model that is internal to this directive