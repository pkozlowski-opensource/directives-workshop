function calculatePosition(hostEl, elToPosition, placement) {

  var calculatedPosition;

  // Get the position, height and width of both elements
  // so we can center tooltips / popovers
  var hostPosition = angular.extend({}, hostEl.position(), {
    width: hostEl.prop('offsetWidth'),
    height: hostEl.prop('offsetHeight')
  });

  var ttWidth = elToPosition.prop('offsetWidth');
  var ttHeight = elToPosition.prop('offsetHeight');

  // Calculate the tooltip's top and left coordinates to center it
  switch (placement) {
    case 'right':
      calculatedPosition = {
        top: hostPosition.top + hostPosition.height / 2 - ttHeight / 2,
        left: hostPosition.left + hostPosition.width
      };
      break;
    case 'bottom':
      calculatedPosition = {
        top: hostPosition.top + hostPosition.height,
        left: hostPosition.left + hostPosition.width / 2 - ttWidth / 2
      };
      break;
    case 'left':
      calculatedPosition = {
        top: hostPosition.top + hostPosition.height / 2 - ttHeight / 2,
        left: hostPosition.left - ttWidth
      };
      break;
    default: // top
      calculatedPosition = {
        top: hostPosition.top - ttHeight,
        left: hostPosition.left + hostPosition.width / 2 - ttWidth / 2
      };
      break;
  }

  return calculatedPosition;
}