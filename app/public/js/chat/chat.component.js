// (function () {
//   'use strict';

//   angular.module('app')
//     .component('chat', {
//       templateUrl: 'js/chat/chat.template.html',
//       controller: controller,
//     });
  
//   controller.$inject = ['mySocket']
//   function controller(mySocket) {
//     const vm = this;
//     vm.messages = []

//     vm.createUser = createUser

//     mySocket.on('connect', () => {
//       // mySocket.emit('new user', vm.user);
//     })
    
//     mySocket.on('user joined', (data) => {
//       console.log('user joined', data);
     
//       vm.messages.push({ message: `${data} has joined the room.` })
//     })

//     mySocket.on('disconnect', () => {
//       mySocket.emit('disconnect', vm.user)
//     })


//     function createUser() {

//     }
//   }
// })();
