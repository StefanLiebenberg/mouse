goog.provide('mouse.query.ast.Type');


/**
 * @enum {string}
 */
mouse.query.ast.Type = {
  ALL: 'all',
  PARENT: 'parent',
  ANCESTOR: 'ancestor',
  ID: 'id',
  TAGNAME: 'tagname',
  CLASSNAME: 'classname',
  DIRECTIVE: 'directive'
};
