goog.provide('mouse.query.ast.Tagname');
goog.require('mouse.query.ast.Element');
goog.require('mouse.query.ast.Type');



/**
 * @constructor
 * @extends {mouse.query.ast.Element}
 *
 * @param {string} tagname
 *        The tagname.
 */
mouse.query.ast.Tagname = function(tagname) {
  goog.base(this, mouse.query.ast.Type.TAGNAME);
  this.tagname = tagname;
};
goog.inherits(mouse.query.ast.Tagname, mouse.query.ast.Element);


/**
 * @override
 */
mouse.query.ast.Tagname.prototype.toString = function() {
  return this.tagname;
};
