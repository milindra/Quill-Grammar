'use strict';

module.exports =
angular.module('quill-grammar.services.rule', [
  require('./crud.js').name,
  require('./ruleQuestion.js').name,
])

.factory('RuleService', function(CrudService, RuleQuestionService, $q) {
  var crud = new CrudService('rules');
  this.saveRule = function(rule) {
    return crud.save(rule);
  };
  this.deleteRule = function (rule) {
    return crud.del(rule);
  };

  this.getRules = function(ruleIds) {
    var d = $q.defer();
    var promises = [];
    angular.forEach(ruleIds, function(value, id) {
      promises.push(crud.get(id));
    });
    $q.all(promises).then(function(rules) {
      var ruleQuestionPromises = [];
      angular.forEach(rules, function(rule) {
        ruleQuestionPromises.push(
          RuleQuestionService.getRuleQuestions(rule.ruleQuestions)
        );
      });
      $q.all(ruleQuestionPromises).then(function(ruleQuestions) {
        angular.forEach(rules, function(rule, index) {
          rule.resolvedRuleQuestions = ruleQuestions[index];
        });
        d.resolve(rules);
      }, function(errors) {
        d.reject(errors);
      });
    }, function(error) {
      d.reject(error);
    });
    return d.promise;
  };
  return this;
});