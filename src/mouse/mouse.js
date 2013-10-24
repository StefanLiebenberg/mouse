goog.provide('mouse');
goog.require('mouse.query.Query');

/**
 * @param {string} queryString
 * @return {Array.<Element>} elements
 */
mouse.search = function(queryString) {
  var query = new mouse.query.Query(queryString);
  return query.all();
};