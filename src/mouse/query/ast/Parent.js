goog.provide('mouse.query.ast.Parent');
goog.require('mouse.query.ast.Element');
goog.require('mouse.query.ast.Type');



/**
 * @constructor
 * @extends {mouse.query.ast.Element}
 *
 * @param {mouse.query.ast.Element} parent
 *        The parent element.
 * @param {mouse.query.ast.Element} element
 *        The element.
 *
 */
mouse.query.ast.Parent = function(parent, element) {
  goog.base(this, mouse.query.ast.Type.PARENT);
  this.parent = parent;
  this.element = element;

};
goog.inherits(mouse.query.ast.Parent, mouse.query.ast.Element);


/**
 * @type {mouse.query.ast.Element}
 */
mouse.query.ast.Parent.prototype.parent;


/**
 * @type {mouse.query.ast.Element}
 */
mouse.query.ast.Parent.prototype.element;


/** @override */
mouse.query.ast.Parent.prototype.toString = function() {
  return goog.string.format('%s > %s',
      this.parent.toString(), this.element.toString());
};
