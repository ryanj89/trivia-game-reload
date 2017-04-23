(function(){
    'use strict';

    angular
        .module('app')
        .service('leaderboardService', leaderboardService)

    leaderboardService.$inject = ['$http']
    function leaderboardService($http){
      const scoreAPI = '/leaderboards';

      this.getAllScores = getAllScores;
      this.getHighScores = getHighScores;
      this.submitScore = submitScore;

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

      function submitScore(username, score) {
        return $http.post(scoreAPI, { username, score })
          .then(response => {
            return response.data;
          })
      }
    }

}());