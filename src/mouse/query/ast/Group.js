goog.provide('mouse.query.ast.Group');
goog.require('mouse.query.ast.Element');



/**
 * @constructor
 * @extends {mouse.query.ast.Element}
 *
 * @param {Array.<mouse.query.ast.Element>} list
 *        A array of elements.
  *
 */
mouse.query.ast.Group = function(list) {
  this.elements = list;
};
goog.inherits(mouse.query.ast.Group, mouse.query.ast.Element);
