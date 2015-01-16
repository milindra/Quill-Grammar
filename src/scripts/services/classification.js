'use strict';

module.exports =
angular.module('quill-grammar.services.classification', [
  require('./crud.js').name,
])

.factory('ClassificationService', function(CrudService, $q) {
  var crud = new CrudService('classifications');
  var cfs = this;
  cfs.saveClassification = function(classification) {
    return crud.save(classification);
  };
  cfs.deleteClassification = function (classification) {
    return crud.del(classification);
  };
  cfs.getClassification = function(classificationId) {
    return crud.get(classificationId);
  };

  cfs.getClassificationIdByString = function(classificationString) {
    var d = $q.defer();
    crud.all().then(function(classifications) {
      angular.forEach(classifications, function(c) {
        if (c.$value.toLowerCase() === classificationString.toLowerCase()) {
          d.resolve(c.$id);
        }
      });
      cfs.saveClassification(classificationString).then(function(id) {
        d.resolve(id);
      }, d.reject);
    }, d.reject);

    return d.promise;
  };
  return cfs;
});
