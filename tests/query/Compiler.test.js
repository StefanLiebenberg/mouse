goog.provide('test.mouse.query.Compiler');
goog.require('goog.dom');
goog.require('goog.testing.jsunit');
goog.require('mouse.query.Compiler');
goog.require('mouse.query.ast.Ancestor');
goog.require('mouse.query.ast.Parent');
goog.require('mouse.query.ast.Tagname');
goog.setTestOnly();


var compiler;


/**
 * Setup Function.
 */
test.mouse.query.Compiler.setup = function() {
  compiler = new mouse.query.Compiler();
};
goog.exportSymbol('setUp', test.mouse.query.Compiler.setup);


/**
 * Teardown.
 */
test.mouse.query.Compiler.teardown = function() {
  compiler = null;
};
goog.exportSymbol('tearDown', test.mouse.query.Compiler.teardown);


/**
 * Test Parse
 */
test.mouse.query.Compiler.TestCompile = function() {
  var tagname = new mouse.query.ast.Tagname('DIV');
  var compiled = compiler.compile(tagname);
  assertTrue(compiled(document.createElement('div'), null));
  assertFalse(compiled(document.createElement('span'), null));
};
goog.exportSymbol('test_TestCompile', test.mouse.query.Compiler.TestCompile);


/**
 * Test Parse
 */
test.mouse.query.Compiler.TestParentCompile = function() {
  var divTagname = new mouse.query.ast.Tagname('DIV');
  var spanTagname = new mouse.query.ast.Tagname('SPAN');
  var parentAST = new mouse.query.ast.Parent(divTagname, spanTagname);
  var compiled = compiler.compile(parentAST);

  var e1 = document.createElement('div');
  var e2 = document.createElement('span');
  var e3 = document.createElement('a');

  goog.dom.append(e1, e2);
  goog.dom.append(e2, e3);

  assertTrue(compiled(e2, e1));
  assertFalse(compiled(e2, e2));
  assertFalse(compiled(e3, e1));

};
goog.exportSymbol('test_TestParentCompile',
    test.mouse.query.Compiler.TestParentCompile);


/**
 * Test Parse
 */
test.mouse.query.Compiler.TestAncestorCompile = function() {
  var divTagname = new mouse.query.ast.Tagname('DIV');
  var anchorTagname = new mouse.query.ast.Tagname('A');
  var parentAST = new mouse.query.ast.Ancestor(divTagname, anchorTagname);
  var compiled = compiler.compile(parentAST);

  var e1 = document.createElement('div');
  var e2 = document.createElement('span');
  var e3 = document.createElement('a');

  goog.dom.append(e1, e2);
  goog.dom.append(e2, e3);

  assertTrue(compiled(e3, e1));
  assertFalse(compiled(e2, e2));
  assertFalse(compiled(e3, e2));
};
goog.exportSymbol('test_TestAncestorCompile',
    test.mouse.query.Compiler.TestAncestorCompile);


