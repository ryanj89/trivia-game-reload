(function () {
    'use strict';

    angular
        .module ('app')
        .component ('triviaOptionsForm', {
          templateUrl: 'js/trivia/trivia-options-form.template.html',
          controller: controller,
          bindings: {
            onSubmit: '&'
          }
        });

    controller.$inject = ['triviaService'];
    function controller(triviaService) {
        const API = 'https://opentdb.com/api.php?amount=';
        const vm = this;
        
        

        vm.$onInit = onInit;
        vm.getQuestions = getQuestions;

        function getQuestions() {
          vm.optionsSelected = true;

          vm.options = {
            number: vm.selectedNumber.id,
            category: vm.selectedCategory.id,
            difficulty: vm.selectedDifficulty.id,
            type: vm.selectedType.id
          }
          triviaService.getQuestions(vm.options)
          .then(response => {
            vm.onSubmit({ questions: response.results });
          })
                  
        }

        function onInit() {
          // Form options
        vm.numbers = [{id: 1, name: 'One'}, {id: 3, name: 'Three'}, {id: 5, name: 'Five'}, {id: 10, name: 'Ten'}, ];
        vm.selectedNumber = vm.numbers[3];
        vm.categories = [
          { id: 'any', name: 'Any Category' },
          { id: '9', name: 'General Knowledge' },
          { id: '10', name: 'Entertainment: Books' },
          { id: '11', name: 'Entertainment: Film' },
          { id: '12', name: 'Entertainment: Music' },
          { id: '13', name: 'Entertainment: Musicals &amp; Theatres' },
          { id: '14', name: 'Entertainment: Television' },
          { id: '15', name: 'Entertainment: Video Games' },
          { id: '16', name: 'Entertainment: Board Games' },
          { id: '17', name: 'Science &amp; Nature' },
          { id: '18', name: 'Science: Computers' },
          { id: '19', name: 'Science: Mathematics' },
          { id: '20', name: 'Mythology' },
          { id: '21', name: 'Sports' },
          { id: '22', name: 'Geography' },
          { id: '23', name: 'History' },
          { id: '24', name: 'Politics' },
          { id: '25', name: 'Art' },
          { id: '26', name: 'Celebrities' },
          { id: '27', name: 'Animals' },
          { id: '28', name: 'Vehicles' },
          { id: '29', name: 'Entertainment: Comics' },
          { id: '30', name: 'Science: Gadgets' },
          { id: '31', name: 'Entertainment: Japanese Anime &amp; Manga' },
          { id: '32', name: 'Entertainment: Cartoon &amp; Animations' },
        ];
        vm.selectedCategory = vm.categories[0];
        vm.difficulties = [
          { id: 'any', name: 'Any Difficulty' },
          { id: 'easy', name: 'Easy' },
          { id: 'medium', name: 'Medium' },
          { id: 'hard', name: 'Hard' },
        ];
        vm.selectedDifficulty = vm.difficulties[0];
        vm.types = [
          { id:'any', name: 'Any Type' },
          { id:'multiple', name: 'Multiple Choice' },
          { id:'boolean', name: 'True/False' },
        ]
        vm.selectedType = vm.types[0];
        }
    }

} ());