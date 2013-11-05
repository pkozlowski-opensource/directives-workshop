angular.module('bs.popover', [])
  .directive('bsPopover', function () {

    var popoverTpl =
      '<div class="popover">' +
        '<div class="arrow"></div>' +
        '<h3 class="popover-title"></h3>' +
        '<div class="popover-content"></div>' +
      '</div>';

    return {

      compile: function (tElement, tAttrs) {

        var placement = tAttrs.bsPopoverPlacement || 'top';
        var popoverTplEl = angular.element(popoverTpl);
        popoverTplEl.addClass(placement);
        popoverTplEl.css('display', 'block');

        return function (scope, iElement, iAttrs) {

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

              //attach popover to the DOM to gets its size
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