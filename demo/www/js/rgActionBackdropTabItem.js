'use strict';

angular.module('rg.actionTab', [])
  .directive('actionTab', ['$ionicTabsDelegate', '$ionicBackdrop', '$rootElement', '$compile',
    function ($ionicTabsDelegate, $ionicBackdrop, $rootElement, $compile) {

      var jqLite = angular.element;
      var backgroundEl = jqLite(
        '<div class="action-backdrop">' +
        '<div class="action-row">' +
        '</div>' +
        '</div>');
      var iconEl = jqLite('<i class="icon"></i>');
      var tabNavEl = jqLite(
        '<a ng-class="{\'tab-item-active\': isTabActive(), \'tab-hidden\':isHidden()}" ' +
        'class="tab-item">' +
        '</a>')
        .append(iconEl);

      return {
        restrict: 'E',
        scope: true,
        require: ['^ionTabs'],
        link: function (scope, element, attrs, ctrls) {
          var tabsCtrl = ctrls[0];
          backgroundEl.children().append(element.children());
          tabsCtrl.$tabsElement.append($compile(tabNavEl)(scope));
          tabsCtrl.$tabsElement.append($compile(backgroundEl)(scope));
          iconEl.addClass(attrs.iconOff);
          tabNavEl.on('click', toggleBackdrop);

          function toggleBackdrop() {
            if (tabNavEl.hasClass('rg-action-button-active')) {
              backgroundEl.removeClass('active');
              backgroundEl.removeClass('visible');
              tabNavEl.removeClass('rg-action-button-active');
              iconEl.addClass(attrs.iconOff);
              iconEl.removeClass(attrs.iconOn);
            } else {
              backgroundEl.addClass('active');
              backgroundEl.addClass('visible');
              tabNavEl.addClass('rg-action-button-active');
              iconEl.addClass(attrs.iconOn);
              iconEl.removeClass(attrs.iconOff);
            }
          }
        }
      };
    }]);
