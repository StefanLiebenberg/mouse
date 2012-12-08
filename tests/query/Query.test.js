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


/**
 * Find all the elements.
 */
test.mouse.query.Query.FindParent = function() {


  var root = document.createElement('div');
  var element1 = document.createElement('div');
  var element2 = document.createElement('span');
  var element3 = document.createElement('li');
  var element4 = document.createElement('span');
  var element5 = document.createElement('br');
  var element6 = document.createElement('a');

  goog.dom.append(root, element1);
  goog.dom.append(root, element2);
  goog.dom.append(element1, element3);
  goog.dom.append(element1, element4);
  goog.dom.append(element2, element5);
  goog.dom.append(element2, element6);

  var query1 = new mouse.query.Query('div > *');

  assertEquals(element1, query1.first(root));
  assertArrayEquals(
      [element1, element3, element4, element2],
      query1.all(root)
  );

  assertArrayEquals(
      [element3, element4],
      query1.all(element1)
  );

  assertArrayEquals([],
      query1.all(element2)
  );


  var query2 = new mouse.query.Query('* > span');
  assertEquals(element4, query2.first(root));
  assertArrayEquals(
      [element4, element2],
      query2.all(root)
  );


};
goog.exportSymbol('test_FindParent', test.mouse.query.Query.FindParent);


/**
 * Find all the elements.
 */
test.mouse.query.Query.Searches = function() {




  var root = document.createElement('div');

  var e1 = document.createElement('div');
  goog.dom.append(root, e1);

  var e1_1 = document.createElement('span');
  goog.dom.append(e1, e1_1);

  var e1_1_1 = document.createElement('a');
  goog.dom.append(e1_1, e1_1_1);
  var e1_1_2 = document.createElement('a');
  goog.dom.append(e1_1, e1_1_2);
  var e1_1_3 = document.createElement('h1');
  goog.dom.append(e1_1, e1_1_3);

  var e1_2 = document.createElement('div');
  goog.dom.append(e1, e1_2);

  goog.dom.classes.add(e1_2, goog.getCssName('foo'));
  goog.dom.classes.add(e1_1_3, goog.getCssName('foo'));

  var e2 = document.createElement('div');
  goog.dom.append(root, e2);

  for (var i = 0; i < 10000; i++) {

    var query_all = new mouse.query.Query('*');

    assertArrayEquals(
        [e1, e1_1, e1_1_1, e1_1_2, e1_1_3, e1_2, e2],
        query_all.all(root));

    // tagname
    var query_tagname = new mouse.query.Query('div');
    assertArrayEquals(
        [e1, e1_2, e2],
        query_tagname.all(root));


    // classname
    var query_classname = new mouse.query.Query('.foo');

    // identity
    var query_id = new mouse.query.Query('#foobar');

    // directive
    var query_directive = new mouse.query.Query(':not(div)');

    // compostition
    var query_composition = new mouse.query.Query('div:not(div)');

    // group
    var query_group = new mouse.query.Query('div,span');

    var query_parent = new mouse.query.Query('div > span');

    var query_ancestor = new mouse.query.Query('div a');


  }



};
goog.exportSymbol('test_Searches', test.mouse.query.Query.Searches);
