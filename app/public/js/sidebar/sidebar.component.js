(function () {
    'use strict';

    angular
        .module ('app')
        .component ('sideBar', {
          templateUrl: 'js/sidebar/sidebar.template.html',
          controller: controller,
          bindings: {}
        });

    function controller() {
        const vm = this;

        vm.$onInit = function () {
          vm.tab = 1;
        }

        vm.setTab = function(newTab) {
          vm.tab = newTab;
        }
        vm.isSet = function (tabNum) {
          return vm.tab === tabNum;
        }
    }

} ());