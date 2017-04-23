(function () {
    'use strict';

    angular
        .module ('app')
        .component ('triviaQuestion', {
          templateUrl: 'js/trivia/trivia-question.template.html',
          controller: controller,
          bindings: {
            question: '=',
            onAnswer: '&'
          }
        });

    controller.$inject = ['$timeout'];
    function controller($timeout) {
      const vm = this;

      vm.$onInit = onInit;
      vm.submitAnswer = submitAnswer;

      function submitAnswer() {
        vm.newRound = false;
        const points = scoreRound(vm.playerAnswer.answer);
        if (points > 0) {
          vm.correct = true;
        } else {
          vm.correct = false;
        }
        // Delay to display correct answer before next question.
        $timeout(() => {
          vm.roundOver = true;
        }, 2000);
        $timeout(() => {      
          vm.onAnswer({ points, correct: vm.correct });
          onInit();
        }, 2500);
      }

      function onInit(){
        vm.newRound = true;
        vm.roundOver = false;
        vm.correct = false;
      }

      function scoreRound(answer) {
        let points = 0;
        if (answer === vm.question.correct_answer) {
          console.log('CORRECT');
          switch (vm.question.difficulty) {
            case 'easy':
              points = 10;
              break;

            case 'medium':
              points = 25;
              break;

            case 'hard':
              points = 50;
              break;

            default:
              break;
          }
        }
        console.log('Points Received: ', points);
        return points;
      }
    }

} ());