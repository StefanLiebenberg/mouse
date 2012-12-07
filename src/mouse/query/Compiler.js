goog.provide('mouse.query.Compiler');
goog.require('goog.dom.classes');
goog.require('goog.functions');
goog.require('mouse.query.ast.Ancestor');
goog.require('mouse.query.ast.Classname');
goog.require('mouse.query.ast.Parent');
goog.require('mouse.query.ast.Tagname');



/**
 * @constructor
 */
mouse.query.Compiler = function() {};


/**
 *
 * @param {mouse.query.ast.Element} element
 *        Some element.
 * @return {function(Node, Node) : boolean}
 *        The compiled match function function.
 */
mouse.query.Compiler.prototype.compile = function(element) {
  var t = mouse.query.ast.Type;
  switch (element.type) {
    case t.PARENT:
      return this.getParentFunction(
          /** @type {mouse.query.ast.Parent} */ (element));
    case t.ANCESTOR:
      return this.getAncestorFunction(
          /** @type {mouse.query.ast.Ancestor} */ (element));
    case t.TAGNAME:
      return this.getTagnameFunction(
          /** @type {mouse.query.ast.Tagname} */ (element));
    default:
      goog.asserts.fail('unknown type');
  }
};


/**
 * @param {mouse.query.ast.Parent} parent
 *        The element chain.
 * @return {function(Node, Node) : boolean} The matching for parent.
 */
mouse.query.Compiler.prototype.getParentFunction = function(parent) {
  var parentFn = this.compile(parent.parent);
  var elementFn = this.compile(parent.element);
  return goog.functions.and(elementFn, function(node, context) {
    return node !== context && parentFn(node.parentNode, context);
  });
};


/**
 * @param {mouse.query.ast.Ancestor} parent
 *        The element chain.
 * @return {function(Node, Node) : boolean} The matching for ancestor.
 */
mouse.query.Compiler.prototype.getAncestorFunction = function(parent) {
  var ancestorFn = this.compile(parent.ancestor);
  var elementFn = this.compile(parent.element);
  return goog.functions.and(elementFn, function(node, context) {
    while (node !== context && (node = node.parentNode)) {
      if (ancestorFn(node, context)) {
        return true;
      }
    }
    return false;
  });
};


/**
 * @param {mouse.query.ast.Tagname} ast
 *        The tagname.
 * @return {function(Node, Node) : boolean}
 *        The tagname function.
 */
mouse.query.Compiler.prototype.getTagnameFunction = function(ast) {
  return function(node, context) {
    return ast.tagname === node.tagName;
  }
};


/**
 *
 * @param {string} classname
 *        The classname.
 * @return {function(Node, Node) : boolean}
 *        The classname function.
 */
mouse.query.Compiler.prototype.getClassnameFunction = function(classname) {
  /* TODO(Stefan) can be optimized by creating a RegExp here. */
  return function(element, context) {
    return goog.dom.classes.has(element, classname);
  }
};


/**
 * @param {string} id
 *        The id.
 * @return {function(Node, Node) : boolean}
 *        The id function.
 */
mouse.query.Compiler.prototype.getIdFunction = function(id) {
  return function(element, context) {
    return id === element.id;
  }
};


/**
 * @param {string} directive
 *        The id.
 * @param {string=} opt_content
 *        The argument to pass to directive.
 *
 * @return {function(Node, Node) : boolean}
 *        The id function.
 */
mouse.query.Compiler.prototype.getDirectiveFunction =
    function(directive, opt_content) {
  var d = mouse.query.Compiler.Directives[directive];

  goog.asserts.assertFunction(d, 'Should be a function');

  return d.apply(this, goog.array.slice(arguments, 1));

};


/**
 * @type {Object.<string,
 *  function(string=) : (function(Node, Node) : boolean)>}
 */
mouse.query.Compiler.Directives = {

  /**
   * @param {string} query
   *        The query to negate.
   * @return {function(Node, Node) : boolean}
   *         The boolean.
   */
  'not': function(query) {
    var compiler = new mouse.query.Compiler();
    var parser = new mouse.query.Parser();
    var fn = compiler.compile(parser.parse(query));
    return goog.functions.not(fn);
  }
};
