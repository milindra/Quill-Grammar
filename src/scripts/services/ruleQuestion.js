'use strict';

module.exports =
angular.module('quill-grammar.services.ruleQuestion', [
  require('./crud.js').name,
  require('./instruction.js').name,
])

.factory('RuleQuestionService', function(
  CrudService, InstructionService, $q
) {
  var crud = new CrudService('ruleQuestions', [
    'body', 'hint', 'instructions', 'prompt'
  ], 'cms');

  this.saveRuleQuestion = function(ruleQuestion) {
    return crud.save(ruleQuestion);
  };
  this.deleteRuleQuestion = function (ruleQuestion) {
    return crud.del(ruleQuestion);
  };

  function getInstructionForRuleQuestion(ruleQuestions) {
    var insp = $q.defer();
    var ins = [];
    angular.forEach(ruleQuestions, function(rq) {
      ins.push(InstructionService.getInstruction(rq.instructions));
    });
    $q.all(ins).then(function(instructions) {
      angular.forEach(ruleQuestions, function(rq, index) {
        rq.resolvedInstructions = instructions[index].$value;
      });
      insp.resolve(ruleQuestions);
    }, function(errors) {
      insp.reject(errors);
    });
    return insp.promise;
  }

  this._getAllRuleQuestionsWithInstructions = function() {
    return crud.all().then(getInstructionForRuleQuestion);
  }

  this.getRuleQuestions = function(ruleQuestionIds) {
    var d = $q.defer();
    var promises = [];
    angular.forEach(ruleQuestionIds, function(value, id) {
      promises.push(crud.get(id));
    });

    $q.all(promises)
    .then(getInstructionForRuleQuestion)
    .then(function(ruleQuestions) {
      d.resolve(ruleQuestions);
    }, function(error) {
      d.reject(error);
    });
    return d.promise;
  };
  return this;
});
