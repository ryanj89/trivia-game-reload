(function () {
  'use strict';

  angular.module('app')
    .component('exampleComponent', {
      templateUrl: 'js/leaderboards/leaderboard-list.template.html',
      controller: controller,
    });

  controller.$inject = ['leaderboardService'];

  function controller(leaderboardService) {
    const vm = this;

    vm.$onInit = onInit;

    function onInit() {
      leaderboardService.getHighScores()
        .then(scores => {
          vm.scores = scores;
        })
    }
  }
})();
