goog.provide('mouse');
goog.provide('mouse.api');
goog.require('mouse.query.Query');

/**
 * @namespace
 * @expose
 */
mouse.api = {};
goog.exportSymbol('mouse.api', mouse.api);

/**
 * @expose
 * @param {string} queryString
 * @returns {mouse.query.Query}
 */
mouse.api.query = function(queryString) {
  return new mouse.query.Query(queryString);
};

/**
 * @param {string} queryString
 * @return {Array.<Element>} elements
 * @expose
 */
mouse.api.search = function(queryString) {
  return mouse.api.query(queryString).all();
};
goog.exportSymbol('mouse.api.search', mouse.api.search);