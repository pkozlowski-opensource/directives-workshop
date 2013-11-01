* creating directive basics
** declaring directives - `.directive()` factory method
** factory method vs. compile vs. link
** prefix directives to avoid collisions, ideally with your own project identifier (2-3 letters)
* DOM manipulation goes into directives
** element passed to a directive is already jQuery / jqLite - wrapped
** registering DOM event handlers
** direct DOM manipulation in a directive - jQury can be useful for low-level DOM routines
* normalization of directive / attribute names
* observing attributes vs. attribute value straight from the DOM
* tests
** introduction to the DOM-based directives testing
** jQuery is useful for:
*** matching rendered HTML
*** triggering events
** in order to test size / positioning we would have to attach elements to <body> but this would slow down tests
