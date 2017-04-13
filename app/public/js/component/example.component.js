(function () {
  'use strict';

  angular.module('app')
    .component('exampleComponent', {
      templateUrl: 'js/component/example.template.html',
      controller: controller,
    });

  controller.$inject = ['$http'];

  function controller($http) {
    const vm = this;

    vm.$onInit = onInit;

    function onInit() {
      $http.get('/api/users').then((res) => {
      console.log('hi');
        vm.users = res.data;
      });
    }
  }
})();
