(function () {
    'use strict';

    angular
        .module ('app')
        .component ('triviaQuestionList', {
          templateUrl: 'js/trivia/trivia-question-list.template.html',
          controller: controller,
          bindings: {
            questions: '=',
            score: '<'
          }
        });

    function controller() {
      const vm = this;
      
      vm.$onInit = onInit;

      function onInit(){
        
      }
    }

} ());