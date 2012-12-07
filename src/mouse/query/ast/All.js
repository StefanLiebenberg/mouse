goog.provide('mouse.query.ast.All');
goog.require('goog.functions');
goog.require('mouse.query.ast.Element');
goog.require('mouse.query.ast.Type');



/**
 * @constructor
 * @extends {mouse.query.ast.Element}
 */
mouse.query.ast.All = function() {
  goog.base(this, mouse.query.ast.Type.ALL);
};
goog.inherits(mouse.query.ast.All, mouse.query.ast.Element);


/** @override */
mouse.query.ast.All.prototype.toString =
    goog.functions.constant('*');
