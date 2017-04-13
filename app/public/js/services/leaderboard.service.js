(function(){
    'use strict';

    angular
        .module('app')
        .service('leaderboardService', leaderboardService)

    leaderboardService.$inject = ['$http']
    function leaderboardService($http){
      const scoreAPI = 'https://galvanize-leader-board.herokuapp.com/api/v1/leader-board/TRVA';

      this.getAllScores = getAllScores;
      this.getHighScores = getHighScores;

      function getAllScores(){
        return $http.get(scoreAPI)
          .then(response => {
            return response.data;
          })
      }

      function getHighScores() {
        return $http.get(scoreAPI)
          .then(response => {
            return response.data
              .sort((a, b) => { return b.score - a.score })
              .slice(0, 10);
          })
      }
    }

}());