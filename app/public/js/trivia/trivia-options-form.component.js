(function () {
    'use strict';

    angular
        .module ('app')
        .component ('triviaOptionsForm', {
          templateUrl: 'js/trivia/trivia-options-form.template.html',
          controller: controller,
          bindings: {}
        });


    function controller() {
        const vm = this;

        vm.$onInit = onInit;

        function onInit() {

        }
    }

} ());