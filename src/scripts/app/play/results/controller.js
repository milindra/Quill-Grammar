'use strict';

module.exports =

/*@ngInject*/
function InternalResultsController(
  $scope, $state, _
) {
  $scope.partnerIframe = $state.params.partnerIframe;

  /*
   * This is some extra stuff for the partner integration
   * TODO move this out of here
   */
  //Add in some custom images for the 3 stories we are showcasing
  $scope.pfImages = {
    '70B-T6vLMTM9zjQ9LCwoCg': 'the_princes_and_the_turtle_story_header.png',
    'MJCtkml_69W2Dav79v4r9Q': 'ernest_shackleton_story_header.png',
    'Yh49ICvX_YME8ui7cDoFXQ': 'the_apollo_8_photograph_story_header.png'
  };

  $scope.pfTitles = {
    '70B-T6vLMTM9zjQ9LCwoCg': 'The Princes and the Turtle',
    'MJCtkml_69W2Dav79v4r9Q': 'Ernest Shackleton Escapes the Antarctic',
    'Yh49ICvX_YME8ui7cDoFXQ': 'The Apollo 8 Photograph'
  };

  if ($state.params.passageId) {
    $scope.passageImageUrl = $scope.pfImages[$state.params.passageId];
    $scope.passageTitle = $scope.pfTitles[$state.params.passageId];
  }


  /*
   * TODO replace this with the dynamic version
   * from local storage.
   */
  $scope.swResults = [
    {conceptClass: 'Irregular Verbs in the Past Tense', correct: 2, total: 3},
    {conceptClass: 'It\'s', correct:3, total:4},
    {conceptClass: 'Its', correct:2, total: 2},
    {conceptClass: 'Despite', correct: 1, total: 2},
    {conceptClass: 'Commonly Confused Words', correct: 2, total: 3}
  ];

  $scope.pfResults = [
    {conceptClass: 'Irregular Verbs in the Past Tense', correct: 2, total: 3},
    {conceptClass: 'It\'s', correct:3, total:4},
    {conceptClass: 'Its', correct:2, total: 2},
    {conceptClass: 'Despite', correct: 1, total: 2},
    {conceptClass: 'Commonly Confused Words', correct: 2, total: 3}
  ];

  /*
   * Maps a result entry to an array of true and false values.
   * This represents the correct and incorrect images shown
   * for each result.
   */
  $scope.imageList = function(r) {
    var list = _.chain(_.range(0, r.total))
      .map(function(num, i) {
        return [i, r.correct > num];
      })
      .object()
      .value();
    return list;
  };

  /*
   * reduces the results into a ratio
   */
  $scope.getErrorsFoundString = function(results) {
    var correct = _.reduce(results, function(correct, r) {
      return correct + r.correct;
    }, 0);

    var total = _.reduce(results, function(total, r) {
      return total + r.total;
    }, 0);

    return '' + correct + '/' + total;

  };
};
