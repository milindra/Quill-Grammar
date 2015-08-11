'use strict';

describe('finalizeService', function () {
  beforeEach(module('quill-grammar.services.finalize'));

  var sandbox,
      finalizeService,
      $rootScope,
      conceptTagResultService,
      activitySessionService,
      localStorageService,
      quillOAuthService,
      $q;

  beforeEach(inject(function (_finalizeService_, _$rootScope_, ConceptTagResult, _localStorageService_, ActivitySession, _$q_, QuillOAuthService) {
    sandbox = sinon.sandbox.create();
    finalizeService = _finalizeService_;
    conceptTagResultService = ConceptTagResult;
    activitySessionService = ActivitySession;
    localStorageService = _localStorageService_;
    quillOAuthService = QuillOAuthService;
    $rootScope = _$rootScope_;
    $q = _$q_;
  }));

  afterEach(function () {
    sandbox.verifyAndRestore();
  });

  it('returns a promise', function (done) {
    finalizeService().then(done);
    $rootScope.$apply();
  });

  describe('saving to the LMS', function () {
    var fakeConceptTagResultsList = [
      {foo: 'bar', correct: 1},
      {foo: 'bar', correct: 0}
    ];

    var fakePfResults = [
      {
        conceptClass: 'cool',
        correct: 2,
        total: 3
      },
      {
        conceptClass: 'very cool',
        correct: 0,
        total: 5
      }
    ];

    beforeEach(function () {
      // ConceptTagResult.findAsJsonByActivitySessionId(...)
      sandbox.mock(conceptTagResultService)
             .expects('findAsJsonByActivitySessionId')
             .withArgs('fake-session-id')
             .returns($q.when(fakeConceptTagResultsList));

      sandbox.mock(localStorageService)
             .expects('get')
             .withArgs('pf-fake-passage-id')
             .returns(fakePfResults);

      // gets concept tag results from firebase and sends to LMS

      // ActivitySession.finish(...)
      sandbox.mock(activitySessionService)
             .expects('finish')
             .withArgs('fake-session-id', {
               // FIXME: Do not uncomment this line until the LMS concept tag integration works again.
               // concept_tag_results: fakeConceptTagResultsList,
               percentage: 0.3
             })
             .returns($q.when());

      // Removes the concept tag results afterwards
      sandbox.mock(conceptTagResultService)
              .expects('removeBySessionId')
              .withArgs('fake-session-id')
              .returns($q.when());

      sandbox.mock(quillOAuthService)
             .expects('expire')
             .returns($q.when());
    });

    it('saves when a session ID is present', function (done) {
      finalizeService('fake-session-id', 'fake-passage-id').then(done);
      $rootScope.$apply();
    });
  });
});
