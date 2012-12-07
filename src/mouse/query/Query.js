goog.provide('mouse.query.Query');
goog.require('mouse.query.Compiler');
goog.require('mouse.query.Parser');
goog.require('goog.dom');



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
 * @param {Node} node
 *        The current node.
 * @param {Node} context
 *        The context node.
 * @param {Array.<Node>} results
 *       The list of found nodes.
 */
mouse.query.Query.prototype.all_ = function(node, context, results) {
  node = node.firstChild;
  while (node) {
    if ((this.includeNodes || goog.dom.isElement(node)) &&
      this.matches(node, context)) {
      goog.array.insert(results, node);
    }
    this.all_(node, context, results);
    node = node.nextSibling;
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
  node = opt_node || document;
  this.all_(node, node, results);
  return results;
};


/**
 * @private
 * @param {Node} node
 *        The element node.
 * @param {Node} context
 *        The context.
 * @return {?Node} The node, if found.
 *
 */
mouse.query.Query.prototype.first_ = function(node, context) {
  node = node.firstChild;
  while (node) {
    if ((this.includeNodes || goog.dom.isElement(node)) &&
      this.matches(node, context)) {
      return node;
    }
    var found = this.first_(node, context);
    if (goog.isDefAndNotNull(found)) {
      return found;
    }
    node = node.nextSibling;
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

