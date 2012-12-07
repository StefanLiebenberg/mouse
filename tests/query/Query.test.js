goog.provide('test.mouse.query.Query');
goog.require('mouse.query.Query');
goog.require('goog.testing.jsunit');
goog.setTestOnly();


/**
 * Test Parse
 */
test.mouse.query.Query.FindBody = function() {
  var query = new mouse.query.Query('body');
  assertEquals(document.body, query.first());
  assertEquals(document.body, query.first(document));
  assertEquals(null, query.first(document.body));
};
goog.exportSymbol('test_FindBody', test.mouse.query.Query.FindBody);
