angular.module('bs.popover', [])
  .directive('bsPopover', function () {

    /**
     * Bootstrap 3 uses the following markup to create popover elements. Popovers,
     * after being created are inserted after the host element in the DOM tree.
     * Popovers's content goes into the `div.popover-content` element while its title
     * to the `div.popover-title` element.
     * There are 2 additional important CSS classes at play as well:
     * - one of `top`, `bottom`, `left`, `right` - needs to be added to `div.popover` to indicate positioning
     * - `in` - to actually show (make visible) a popover
     * @type {string}
     */
    var popoverTpl =
      '<div class="popover">' +
        '<div class="arrow"></div>' +
        '<h3 class="popover-title"></h3>' +
        '<div class="popover-content"></div>' +
      '</div>';

    return {

      compile: function compileFunction(tElement, tAttrs) {

        var placement = tAttrs.bsPopoverPlacement || 'top';
        var popoverTplEl = angular.element(popoverTpl);
        popoverTplEl.addClass(placement);
        popoverTplEl.css('display', 'block');

        return function linkingFunction(scope, iElement, iAttrs) {

          var shown = false;
          var popoverInstanceEl = popoverTplEl.clone();

          //observe interpolated attributes and update popover's content accordingly
          iAttrs.$observe('bsPopoverTitle', function(newTitle) {
            popoverInstanceEl.find('.popover-title').text(newTitle);
          });
          iAttrs.$observe('bsPopover', function(newContent) {
            popoverInstanceEl.find('.popover-content').text(newContent);
          });

          iElement.on('click', function () {

            if (!shown) {

              //attach popover to the DOM to get its size
              iElement.after(popoverInstanceEl);

              //calculate position
              var popoverPosition = calculatePosition(iElement, popoverInstanceEl, placement);
              popoverInstanceEl.css(popoverPosition);

            } else {
              popoverInstanceEl.remove();
            }

            shown = !shown;
          });
        };
      }
    };
  });