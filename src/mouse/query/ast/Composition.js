goog.provide('mouse.query.ast.Composition');
goog.require('mouse.query.ast.Element');
goog.require('mouse.query.ast.Type');



/**
 * @constructor
 * @extends {mouse.query.ast.Element}
 *
 * @param {Array.<mouse.query.ast.Element>} list
 *        The list of elements.
  *
 */
mouse.query.ast.Composition = function(list) {
  goog.base(this, mouse.query.ast.Type.COMPOSITION);
  this.elements = list;
};
goog.inherits(mouse.query.ast.Composition, mouse.query.ast.Element);


/** @override */
mouse.query.ast.Composition.prototype.toString = function() {
  return goog.array.map(this.elements, function(element) {
    return element.toString();
  }).join('');
};
