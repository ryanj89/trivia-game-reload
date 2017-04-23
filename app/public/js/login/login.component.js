(function () {
    'use strict';

    angular
        .module ('app')
        .component ('login', {
          templateUrl: 'js/login/login.template.html',
          controller: controller
        });

    function controller() {
      const vm = this;
    }
} ());