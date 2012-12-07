goog.provide('mouse.query.ast.Classname');
goog.require('mouse.query.ast.Element');
goog.require('mouse.query.ast.Type');



/**
 * @constructor
 * @extends {mouse.query.ast.Element}
 *
 * @param {string} classname
 *        The classname.
 *
 */
mouse.query.ast.Classname = function(classname) {
  goog.base(this, mouse.query.ast.Type.CLASSNAME);
  this.classname = classname;
};
goog.inherits(mouse.query.ast.Classname, mouse.query.ast.Element);


/** @override */
mouse.query.ast.Classname.prototype.toString = function() {
  return '.' + this.classname;
};
