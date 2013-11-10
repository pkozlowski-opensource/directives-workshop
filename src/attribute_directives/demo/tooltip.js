angular.module('bs.tooltip', [])
  .directive('bsTooltip', function () {

    /**
     * Bootstrap 3 uses the following markup to create tooltip elements. Tooltips,
     * after being created are inserted after the host element in the DOM tree.
     * Tooltip's text goes into the `div.tooltip-inner` element
     * There are 2 additional important CSS classes at play as well:
     * - one of `top`, `bottom`, `left`, `right` - needs to be added to `div.tooltip` to indicate positioning
     * - `in` - to actually show (make visible) a tooltip
     * @type {string}
     */
    var tooltipTpl =
      '<div class="tooltip">' +
        '<div class="tooltip-inner"></div>' +
        '<div class="tooltip-arrow"></div>' +
      '</div>';

    return {

      compile: function compileFunction(tElement, tAttrs) {

        var placement = tAttrs.bsTooltipPlacement || 'top';
        var tooltipTplEl = angular.element(tooltipTpl);
        tooltipTplEl.addClass(placement);

        return function linkingFunction(scope, iElement, iAttrs) {

          var tooltipInstanceEl = tooltipTplEl.clone();

          //observe interpolated attributes and update tooltip's content accordingly
          iAttrs.$observe('bsTooltip', function (newContent) {
            tooltipInstanceEl.find('div.tooltip-inner').text(newContent);
          });

          iElement.on('mouseenter', function () {

            //attach tooltip to the DOM to get its size (needed to calculate positioning)
            iElement.after(tooltipInstanceEl);

            //calculate position
            var ttipPosition = calculatePosition(iElement, tooltipInstanceEl, placement);
            tooltipInstanceEl.css(ttipPosition);
            //finally show the tooltip
            tooltipInstanceEl.addClass('in');
          });

          iElement.on('mouseleave', function () {
            tooltipInstanceEl.remove();
          });
        };
      }
    };
  });