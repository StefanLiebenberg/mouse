goog.provide('mouse.query.ast.Id');
goog.require('mouse.query.ast.Element');
goog.require('mouse.query.ast.Type');



/**
 * @constructor
 * @extends {mouse.query.ast.Element}
 *
 * @param {string} id
 *        The id.
 *
 */
mouse.query.ast.Id = function(id) {
  goog.base(this, mouse.query.ast.Type.ID);
  this.id = id;
};
goog.inherits(mouse.query.ast.Id, mouse.query.ast.Element);


/** @override */
mouse.query.ast.Id.prototype.toString = function() {
  return '#' + this.id;
};
