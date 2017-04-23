(function () {
    'use strict';

    angular
        .module ('app')
        .component ('triviaScore', {
          templateUrl: 'js/trivia/trivia-score.template.html',
          controller: controller,
          bindings: {
            score: '<',
            correct: '<',
            questions: '<'
          }
        });

    controller.$inject = ['leaderboardService'];
    function controller(leaderboardService) {
      const vm = this;

      vm.$onInit = onInit;
      vm.submitScore = submitScore;

      function submitScore() {
        leaderboardService.submitScore(vm.userName, vm.score)
          .then(response => {
            console.log(response);
          })
      }

      function onInit(){

      }
    }

} ());