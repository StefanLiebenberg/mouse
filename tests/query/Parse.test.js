goog.provide('test.mouse.query.Parser');
goog.require('goog.dom');
goog.require('goog.testing.jsunit');
goog.require('mouse.query.Parser');
goog.require('mouse.query.ast.Ancestor');
goog.require('mouse.query.ast.Parent');
goog.require('mouse.query.ast.Tagname');
goog.setTestOnly();


var parser;


/**
 * Setup Function.
 */
test.mouse.query.Parser.setup = function() {
  parser = new mouse.query.Parser();
};
goog.exportSymbol('setUp', test.mouse.query.Parser.setup);


/**
 * Teardown.
 */
test.mouse.query.Parser.teardown = function() {
  parser = null;
};
goog.exportSymbol('tearDown', test.mouse.query.Parser.teardown);


/**
 * @param {string} query
 *        Ancestor string to test.
 */
test.mouse.query.Parser.TestAncestor = function(query) {
  var parsed = parser.parse(query);
  assertTrue(parsed instanceof mouse.query.ast.Ancestor);
  assertEquals(query, parsed.toString());
  assertTrue(parsed.ancestor instanceof mouse.query.ast.Element);
  assertTrue(parsed.element instanceof mouse.query.ast.Element);
};


/**
 * @param {string} query
 *        Tagname to test string to test.
 */
test.mouse.query.Parser.TestTagname = function(query) {
  var parsed = parser.parse(query);
  assertTrue(parsed instanceof mouse.query.ast.Tagname);
  assertEquals(query, parsed.tagname);
};


/**
 * Test ancestor.
 */
test.mouse.query.Parser.ParseAncestor = function() {
  test.mouse.query.Parser.TestAncestor('div span');
  test.mouse.query.Parser.TestAncestor('.red div span');
};
goog.exportSymbol('test_Parse_Ancestor',
    test.mouse.query.Parser.ParseAncestor);


/**
 * Test tagname.
 */
test.mouse.query.Parser.ParseTagname = function() {
  test.mouse.query.Parser.TestTagname('div');
  test.mouse.query.Parser.TestTagname('span');
};
goog.exportSymbol('test_Parse_Tagname',
    test.mouse.query.Parser.ParseTagname);


/**
 * Custom test
 */
test.mouse.query.Parser.ParseCustom = function() {
  var query = 'div span:child > #blue.red';
  var ast = parser.parse(query);

  assertTrue(ast instanceof mouse.query.ast.Parent);
  assertTrue(ast.parent instanceof mouse.query.ast.Ancestor);
  assertTrue(ast.parent.ancestor instanceof mouse.query.ast.Tagname);
  assertTrue(ast.parent.element instanceof mouse.query.ast.Composition);
  assertTrue(
      ast.parent.element.elements[0] instanceof mouse.query.ast.Tagname);
  assertTrue(
      ast.parent.element.elements[1] instanceof mouse.query.ast.Directive);
  assertTrue(ast.element instanceof mouse.query.ast.Composition);
  assertTrue(ast.element.elements[0] instanceof mouse.query.ast.Id);
  assertTrue(ast.element.elements[1] instanceof mouse.query.ast.Classname);

};
goog.exportSymbol('test_Parse_Custom',
    test.mouse.query.Parser.ParseCustom);



