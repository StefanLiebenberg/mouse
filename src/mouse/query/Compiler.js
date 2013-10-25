goog.provide('mouse.query.Compiler');
goog.require('goog.dom.classes');
goog.require('goog.functions');
goog.require('goog.structs.Map');
goog.require('mouse.query.Parser');
goog.require('mouse.query.ast.Ancestor');
goog.require('mouse.query.ast.Classname');
goog.require('mouse.query.ast.Composition');
goog.require('mouse.query.ast.Parent');
goog.require('mouse.query.ast.Tagname');



/**
 * @constructor
 */
mouse.query.Compiler = function() {
  this.store_ = new goog.structs.Map();
};
goog.addSingletonGetter(mouse.query.Compiler);


/**
 * @typedef {function(!Node, !Node) : !boolean}
 */
mouse.query.Compiler.MatchFn;


/**
 * @param {mouse.query.ast.Element} ast
 *        Some element.
 * @return {?mouse.query.Compiler.MatchFn}
 *        The compiled match function function.
 */
mouse.query.Compiler.prototype.compile = function(ast) {
  var query = ast.toString();
  if (this.store_.containsKey(query)) {
    return /** @type {mouse.query.Compiler.MatchFn} */ (
        this.store_.get(query));
  } else {
    var matchFn = this.compileInternal(ast);
    this.store_.set(query, matchFn);
    return matchFn;
  }
};


/**
 *
 * @param {mouse.query.ast.Element} element
 *        Some element.
 * @return {?mouse.query.Compiler.MatchFn}
 *        The compiled match function function.
 */
mouse.query.Compiler.prototype.compileInternal = function(element) {
  var t = mouse.query.ast.Type;
  switch (element.type) {
    case t.ALL:
      return goog.functions.TRUE;
    case t.TAGNAME:
      return this.getTagnameFunction(
          /** @type {mouse.query.ast.Tagname} */ (element));
    case t.CLASSNAME:
      return this.getClassnameFunction(
          /** @type {mouse.query.ast.Classname} */ (element));
    case t.ID:
      return this.getIdFunction(
          /** @type {mouse.query.ast.Id} */ (element));
    case t.DIRECTIVE:
      return this.getDirectiveFunction(
          /** @type {mouse.query.ast.Directive} */ (element));
    case t.PARENT:
      return this.getParentFunction(
          /** @type {mouse.query.ast.Parent} */ (element));
    case t.ANCESTOR:
      return this.getAncestorFunction(
          /** @type {mouse.query.ast.Ancestor} */ (element));
    case t.COMPOSITION:
      return this.getCompositionFunction(
          /** @type {mouse.query.ast.Composition} */ (element));
    case t.GROUP:
      return this.getGroupFunction(
          /** @type {mouse.query.ast.Group} */ (element)
      );

    default:
      goog.asserts.fail('unknown type');
  }
  return null;
};


/**
 * @param {mouse.query.ast.Parent} parent
 *        The element chain.
 * @return {mouse.query.Compiler.MatchFn} The matching for parent.
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
 * @return {mouse.query.Compiler.MatchFn} The matching for ancestor.
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
 * @return {mouse.query.Compiler.MatchFn}
 *        The tagname function.
 */
mouse.query.Compiler.prototype.getTagnameFunction = function(ast) {
  return function(node, context) {
    return ast.tagname === node.tagName;
  }
};


/**
 *
 * @param {mouse.query.ast.Classname} classname
 *        The classname.
 * @return {mouse.query.Compiler.MatchFn}
 *        The classname function.
 */
mouse.query.Compiler.prototype.getClassnameFunction = function(classname) {
  /* TODO(Stefan) can be optimized by creating a RegExp here. */
  return function(element, context) {
    return goog.dom.classes.has(element, classname.classname);
  }
};


/**
 * @param {mouse.query.ast.Id} id
 *        The id.
 * @return {mouse.query.Compiler.MatchFn}
 *        The id function.
 */
mouse.query.Compiler.prototype.getIdFunction = function(id) {
  return function(element, context) {
    return id.id === element.id;
  }
};


/**
 * @param {mouse.query.ast.Directive} directive
 *        The directive.
 *
 * @return {mouse.query.Compiler.MatchFn}
 *        The id function.
 */
mouse.query.Compiler.prototype.getDirectiveFunction =
    function(directive) {
  var func = mouse.query.Compiler.Directives[directive.name];
  goog.asserts.assertFunction(func, 'Should be a function');
  return func(directive.content);
};


/**
 * @param {mouse.query.ast.Composition} composition
 *        The composition.
 *
 * @return {mouse.query.Compiler.MatchFn}
 *        The id function.
 */
mouse.query.Compiler.prototype.getCompositionFunction =
    function(composition) {
  return goog.functions.and.apply(null,
      goog.array.map(composition.elements,
      function(element) {
        this.compile(element);
      }, this));
};


/**
 * @param {mouse.query.ast.Group} group
 *        The composition.
 *
 * @return {mouse.query.Compiler.MatchFn}
 *        The id function.
 */
mouse.query.Compiler.prototype.getGroupFunction =
    function(group) {
  return goog.functions.or.apply(null,
      goog.array.map(group.elements,
      function(element) {
        this.compile(element);
      }, this));
};


/**
 * @type {Object.<string,
 *  function(string=) : (mouse.query.Compiler.MatchFn)>}
 */
mouse.query.Compiler.Directives = {

  /**
   * @param {string} query
   *        The query to negate.
   * @return {mouse.query.Compiler.MatchFn}
   *         The boolean.
   */
  'not': function(query) {
    var compiler = new mouse.query.Compiler();
    var parser = new mouse.query.Parser();
    var fn = compiler.compile(parser.parse(query));

    return goog.functions.not(
        /** @type {!mouse.query.Compiler.MatchFn} */ (fn));

  }
};
