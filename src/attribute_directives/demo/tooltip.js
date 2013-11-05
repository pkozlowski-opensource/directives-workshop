angular.module('bs.tooltip', [])
  .directive('bsTooltip', function () {

    var tooltipTpl =
      '<div class="tooltip">' +
        '<div class="tooltip-inner"></div>' +
        '<div class="tooltip-arrow"></div>' +
      '</div>';

    return {

      compile: function (tElement, tAttrs) {

        var placement = tAttrs.bsTooltipPlacement || 'top';
        var tooltipTplEl = angular.element(tooltipTpl);
        tooltipTplEl.addClass(placement);

        return function (scope, iElement, iAttrs) {

          var tooltipInstanceEl = tooltipTplEl.clone();

          //observe interpolated attributes and update tooltip's content accordingly
          iAttrs.$observe('bsTooltip', function(newContent) {
            tooltipInstanceEl.find('div.tooltip-inner').text(newContent);
          });

          iElement.on('mouseenter', function () {

            //attach tooltip to the DOM to gets its size
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