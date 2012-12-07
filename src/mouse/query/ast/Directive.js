goog.provide('mouse.query.ast.Directive');
goog.require('mouse.query.ast.Element');
goog.require('mouse.query.ast.Type');



/**
 * @constructor
 * @extends {mouse.query.ast.Element}
 *
 * @param {string} name
 *        The directive name.
 * @param {string} content
 *        The element.
 *
 */
mouse.query.ast.Directive = function(name, content) {
  goog.base(this, mouse.query.ast.Type.DIRECTIVE);
  this.name = name;
  this.content = content;
};
goog.inherits(mouse.query.ast.Directive, mouse.query.ast.Element);


/**
 * @type {mouse.query.ast.Element}
 */
mouse.query.ast.Directive.prototype.parent;


/**
 * @type {mouse.query.ast.Element}
 */
mouse.query.ast.Directive.prototype.element;


/** @override */
mouse.query.ast.Directive.prototype.toString = function() {
  var string = ':' + this.name;
  if (goog.isDefAndNotNull(this.name)) {
    string += '(' + this.content + ')';
  }
  return string;
};
