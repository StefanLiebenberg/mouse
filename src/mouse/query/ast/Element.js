goog.provide('mouse.query.ast.Element');
goog.require('mouse.query.ast.Type');



/**
 * @constructor
 *
 * @param {mouse.query.ast.Type} type
 *        The element type.
 */
mouse.query.ast.Element = function(type) {
  this.type = type;
};


/**
 * @type {mouse.query.ast.Type}
 */
mouse.query.ast.Element.type;


/**
 * @return {string}
 *         The query string for this element.
 */
mouse.query.ast.Element.toString = function() {
  return '';
};
