'use strict';
module.exports =
/*@ngInject*/
function configure ($stateProvider) {
  $stateProvider
  .state('cms-activities-practice-questions', {
    parent: 'cms-activities',
    templateUrl: 'practiceQuestions.cms.html',
    contoller: 'PracticeQuestionsCmsCtrl',
    url: '/practiceQuestions'
  });
};
