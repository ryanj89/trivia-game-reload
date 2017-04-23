(function(){
    'use strict';

    angular
        .module('app')
        .service('triviaService', triviaService)

    triviaService.$inject = ['$http'];
    function triviaService($http){
      const triviaAPI = 'https://opentdb.com/api.php?amount=';

      this.getQuestions = getQuestions;

      function getQuestions(options) {
        let query = formatQuery(options);
        return $http.get(query).then(response => response.data);
      }


      function formatQuery(options) {
        let query = triviaAPI + options.number;
        if (options.category != 'any') {
          query += '&category=' + options.category;
        }
        if (options.difficulty != 'any') {
          query += '&difficulty=' + options.difficulty;
        }
        if (options.type != 'any') {
          query += '&type=' + options.type;
        }
        return query;
      }
    }


}());