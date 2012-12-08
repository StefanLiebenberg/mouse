goog.provide('mouse.query.Query');
goog.require('goog.dom');
goog.require('mouse.query.Compiler');
goog.require('mouse.query.Parser');



/**
 * @constructor
 *
 * @param {string} query
 *        The selector query.
 *
 * @param {boolean=} opt_includeNodes
 *        Include nodes.
 */
mouse.query.Query = function(query, opt_includeNodes) {
  var compiler, parser, ast;
  compiler = mouse.query.Compiler.getInstance();
  parser = mouse.query.Parser.getInstance();
  ast = parser.parse(query);
  this.matches = compiler.compile(ast);
  this.includeNodes = opt_includeNodes || false;
};


/**
 * @private
 * @param {!Node} node
 *        The current node.
 * @param {!Node} context
 *        The context node.
 * @param {Array.<Node>} results
 *       The list of found nodes.
 */
mouse.query.Query.prototype.all_ = function(node, context, results) {
  /** @type {Node} */
  var current = node.firstChild;
  while (current) {
    if ((this.includeNodes || goog.dom.isElement(current)) &&
        this.matches(/** @type {!Node} */ (current), context)) {
      goog.array.insert(results, /** @type {!Node} */ (current));
    }
    this.all_(current, context, results);
    current = current.nextSibling;
  }
};


/**
 * @param {Node=} opt_node
 *        The node point to start searching.
 * @return {Array.<Node>} An array with nodes.
 */
mouse.query.Query.prototype.all = function(opt_node) {
  var node, results;
  results = [];
  node = /** @type {!Node} */ (opt_node || document);
  this.all_(node, node, results);
  return results;
};


/**
 * @private
 * @param {!Node} node
 *        The element node.
 * @param {!Node} context
 *        The context.
 * @return {?Node} The node, if found.
 *
 */
mouse.query.Query.prototype.first_ = function(node, context) {
  /** @type {Node} */
  var current = node.firstChild;
  while (current) {
    if ((this.includeNodes || goog.dom.isElement(current)) &&
        this.matches(/** @type {!Node} */ (current), context)) {
      return /** @type {!Node} */ (current);
    }
    var found = this.first_(current, context);
    if (goog.isDefAndNotNull(found)) {
      return  /** @type {!Node} */ (found);
    }
    current = current.nextSibling;
  }
  return null;
};


/**
 * @param {Node=} opt_node
 *        The node point to start searching.
 * @return {?Node} The node, if found.
 */
mouse.query.Query.prototype.first = function(opt_node) {
  var node = opt_node || document;
  return this.first_(node, node);
};
