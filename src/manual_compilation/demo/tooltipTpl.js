angular.module('bs.tooltipTpl', [])
  .directive('bsTooltipTpl', function ($http, $templateCache, $compile) {

    /**
     * Bootstrap 3 uses the following markup to create tooltip elements. Tooltips,
     * after being created are inserted after the host element in the DOM tree.
     * Tooltip's text goes into the `div.tooltip-inner` element
     * There are 2 additional important CSS classes at play as well:
     * - one of `top`, `bottom`, `left`, `right` - needs to be added to `div.tooltip` to indicate positioning
     * - `in` - to actually show a tooltip
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

          //fetch a template with content over $http, making sure that it is
          //retrieved only once (note usage of $templateCache)
          $http.get(iAttrs.bsTooltipTpl, {
            cache: $templateCache
          }).then(function (response) {

              var tooltipTplInstanceEl = tooltipTplEl.clone();
              tooltipTplInstanceEl.find('div.tooltip-inner').html(response.data.trim());

              var tooltipInstanceEl = $compile(tooltipTplInstanceEl)(scope);

              //register DOM handlers only when a template is fetched and ready to be used
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
            });
        };
      }
    };
  });