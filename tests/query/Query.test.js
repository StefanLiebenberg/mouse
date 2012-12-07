goog.provide('test.mouse.query.Query');
goog.require('goog.dom');
goog.require('goog.testing.jsunit');
goog.require('mouse.query.Query');
goog.setTestOnly();


/**
 * Find the body element.
 */
test.mouse.query.Query.FindBody = function() {
  var query = new mouse.query.Query('body');
  assertEquals(document.body, query.first());
  assertEquals(document.body, query.first(document));
  assertEquals(null, query.first(document.body));
};
goog.exportSymbol('test_FindBody', test.mouse.query.Query.FindBody);


/**
 * Find all the elements.
 */
test.mouse.query.Query.FindAll = function() {
  var query = new mouse.query.Query('*');

  var root = document.createElement('div');
  var element1 = document.createElement('div');
  var element2 = document.createElement('span');
  var element3 = document.createElement('li');
  var element4 = document.createElement('table');
  var element5 = document.createElement('br');
  var element6 = document.createElement('a');

  goog.dom.append(root, element1);
  goog.dom.append(root, element2);
  goog.dom.append(element1, element3);
  goog.dom.append(element1, element4);
  goog.dom.append(element2, element5);
  goog.dom.append(element2, element6);

  assertEquals(element1, query.first(root));

  assertArrayEquals(
      [element1, element3, element4, element2, element5, element6],
      query.all(root)
  );

  assertArrayEquals(
      [element3, element4],
      query.all(element1)
  );

  assertArrayEquals(
      [element5, element6],
      query.all(element2)
  );


};
goog.exportSymbol('test_FindAll', test.mouse.query.Query.FindAll);
