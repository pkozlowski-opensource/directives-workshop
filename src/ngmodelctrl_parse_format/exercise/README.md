Create a date field that parsers and formats a date according to a specified format.
While doing the exercise you can use the moment.js library. Some hints:
* parsing date with moment.js:
** parse string to a moment: `var parsedMoment = moment(viewValue, dateFormat);`
** check parsing status: `parsedMoment.isValid()`
** get date object from a moment: `parsedMoment.toDate()`
* formatting:
** `moment(modelValue).format(dateFormat)`