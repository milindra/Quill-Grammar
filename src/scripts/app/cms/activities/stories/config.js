'use strict';
module.exports =
/*@ngInject*/
function configure ($stateProvider) {
  $stateProvider
  .state('cms-activities-stories', {
    parent: 'cms-activities-base',
    templateUrl: 'stories.cms.html',
    contoller: 'StoriesCmsCtrl',
    url: '/stories'
  });
};
