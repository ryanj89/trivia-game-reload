(function () {
  'use strict';

  angular.module('app')
    .component('chat', {
      templateUrl: 'js/chat/chat.template.html',
      controller: controller,
    });

  function controller() {
    const vm = this;

    vm.$onInit = onInit;

    function onInit() {

    }
  }
})();
