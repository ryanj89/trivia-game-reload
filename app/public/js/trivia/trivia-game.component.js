(function () {
    'use strict';

    angular
        .module ('app')
        .component ('triviaGame', {
          templateUrl: 'js/trivia/trivia-game.template.html',
          controller: controller,
          bindings: {}
        });

    controller.$inject = ['$timeout']
    function controller($timeout) {
      const vm = this;
      vm.currentRound = 0;
      vm.playerScore = 0;
      vm.numberCorrect = 0;

      vm.$onInit = onInit;
      vm.setupGame = setupGame;
      vm.nextRound = nextRound;

      function setDelay(delay) {
        $timeout(() => {
          vm.newRound = true;
        }, delay);
      }

      function setupGame(questions) {
        setDelay(850);   // Delay showing question until option form has faded out.

        // create array of all answers for each question
        vm.questions = questions.map(question => {
          const answers = question.incorrect_answers;
          answers.push(question.correct_answer);
          shuffle(answers);
          question.answers = answers;
          delete question.incorrect_answers;
          return question;
        });
        vm.currentQuestion = vm.questions[vm.currentRound];
      }

      function nextRound(pointsAcquired, correct) {
        if (correct === true) {
          vm.numberCorrect++;
          vm.questions[vm.currentRound].correct = true;
        } else {
          vm.questions[vm.currentRound].wrong = true;
        }
        vm.playerScore += pointsAcquired;
        if (vm.currentRound < vm.questions.length - 1) {
          vm.currentRound++;
          vm.currentQuestion = vm.questions[vm.currentRound];
        } else {
          vm.newRound = false;
          vm.gameOver = true;
        }
      }

      function onInit() {
        vm.newRound = false;
      }

      // Shuffle
      function shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
      }
    }
} ());