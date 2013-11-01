## Topics to cover

* widgets deserve their own HTML element
* template / templateUrl + widget's own model = isolated scope. Variables can clash if we don't isolate
* using `=` and `&` in scope definition (2-way data binding vs. reaching out to a parent scope)
* show `&` in 2 different contexts - getter and setter
* we can offer different APIs for the rating selection - either $watch based or callback-based
* declarative UI driven by model applies to widgets as well - we should apply AngularJS-way inside widgets as well
* testing with externalized templateUrl - feeding the $templateCache
* custom matchers to have compact assertions