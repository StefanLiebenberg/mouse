goog.provide('mouse.query.ast.Ancestor');
goog.require('mouse.query.ast.Element');



/**
 * @constructor
 * @extends {mouse.query.ast.Element}
 *
 * @param {mouse.query.ast.Element} ancestor
 *        The ancestor.
 * @param {mouse.query.ast.Element} element
 *        The element.
 */
mouse.query.ast.Ancestor = function(ancestor, element) {
  goog.base(this, mouse.query.ast.Type.ANCESTOR);
  this.ancestor = ancestor;
  this.element = element;
};
goog.inherits(mouse.query.ast.Ancestor, mouse.query.ast.Element);


/**
 * @type {mouse.query.ast.Element}
 */
mouse.query.ast.Ancestor.prototype.ancestor;


/**
 * @type {mouse.query.ast.Element}
 */
mouse.query.ast.Ancestor.prototype.element;


/** @override */
mouse.query.ast.Ancestor.prototype.toString = function() {
  return goog.string.format('%s %s',
      this.ancestor.toString(),
      this.element.toString());
};
