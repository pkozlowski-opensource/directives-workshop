* Directive controllers, they syntax and roles:
    * inter-directive communication through controllers
    * while templates can be overridden to customize UI, controllers are here to extend behavior
    * different ways of requiring a controller (on the same element, ^, ?)
* Tests:
    * controllers are good since allow us to test logic on the lowest possible level, without DOM interactions
    * using the $controller service to instantiate controllers
* listening to scope's $destroy event to clean up after yourself