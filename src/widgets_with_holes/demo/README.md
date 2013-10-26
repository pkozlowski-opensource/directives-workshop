## Topics to cover

* Understanding transclusion
** Conceptually it takes content from the directive element and puts it in the final template
** We can mark a place where the content should be placed by using the `ngTransclude` directive
** If a more fine-grained control is needed we could use a transclusion function
** Content can contain other AngularJS directives so it is all recursive
** Transclusion scope and its pitfalls (to be demonstrated with an input)
** Multiple elements asking for transclusion on the same element
* Reminders:
** A widget usually means element-level directive
** We need an isolated scope here since a widgets has its own model
** Pitfalls of an isolated scope (we could put `ngHide` on the topmost alert)
* Don't hesitate to create such simple directives as those remove markup duplication and create your own DSL