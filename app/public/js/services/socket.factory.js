(function(){
    'use strict';

    angular
        .module('app')
        .factory('mySocket', function(socketFactory) {
          const myIoSocket = io.connect('localhost:4000');

          return socketFactory({
            ioSocket: myIoSocket
          });
        })

}());