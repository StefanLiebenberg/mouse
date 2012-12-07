goog.provide('mouse.query.Parser');
goog.require('goog.asserts');
goog.require('goog.string');
goog.require('goog.string.format');
goog.require('goog.structs.Map');
goog.require('mouse.query.ast.All');
goog.require('mouse.query.ast.Ancestor');
goog.require('mouse.query.ast.Classname');
goog.require('mouse.query.ast.Composition');
goog.require('mouse.query.ast.Directive');
goog.require('mouse.query.ast.Group');
goog.require('mouse.query.ast.Id');
goog.require('mouse.query.ast.Parent');



/**
 * @constructor
 */
mouse.query.Parser = function() {
  this.store_ = new goog.structs.Map();
};
goog.addSingletonGetter(mouse.query.Parser);


/**
 * @param {string} query
 *        The query string.
 * @return {mouse.query.ast.Element}
 *        The parsed ast.
 */
mouse.query.Parser.prototype.parse = function(query) {
  query = goog.string.trim(query);
  var ast;
  if (this.store_.containsKey(query)) {
    ast = /** @type {mouse.query.ast.Element} */ (this.store_.get(query));
  } else {
    ast = this.parseInternal(query);
    this.store_.set(query, ast);
  }
  return ast;
};


/**
 * @param {string} query
 *        The query string.
 * @return {mouse.query.ast.Element}
 *        The parsed ast.
 */
mouse.query.Parser.prototype.parseInternal = function(query) {
  if (goog.string.isEmpty(query)) {
    goog.asserts.fail('empty query');
  }

  if (query == '*') {
    return new mouse.query.ast.All();
  }

  var length = query.length;

  var p = 0, b = 0;

  var groups = [], last = 0;
  for (var i = 0; i < length; i++) {
    switch (query[i]) {
      case '(':
        p++; break;
      case ')':
        p--; break;
      case '[':
        b++; break;
      case ']':
        b--; break;
      case ',':
        if (p === 0 && b === 0) {
          groups.push(query.substring(last, i));
          last = i;
        }
    }
  }

  if (groups.length > 0) {
    return new mouse.query.ast.Group(groups);
  }


  for (var i = 0; i < length; i++) {
    switch (query[i]) {
      case '(':
        p++; break;
      case ')':
        p--; break;
      case '[':
        b++; break;
      case ']':
        b--; break;
      case '>':
        if (p === 0 && b === 0) {
          return new mouse.query.ast.Parent(
              this.parse(query.substr(0, i)),
              this.parse(query.substr(i + 1, length)));
        }
    }
  }

  for (var i = 0; i < length; i++) {
    switch (query[i]) {
      case '(':
        p++; break;
      case ')':
        p--; break;
      case '[':
        b++; break;
      case ']':
        b--; break;
      case ' ':
        if (p === 0 && b === 0) {
          return new mouse.query.ast.Ancestor(
              this.parse(query.substr(0, i)),
              this.parse(query.substr(i + 1, length)));
        }
    }
  }

  var composition = [], last = 0;
  for (var i = 0; i < length; i++) {
    switch (query[i]) {
      case '(':
        p++; break;
      case ')':
        p--; break;
      case '[':
        b++; break;
      case ']':
        b--; break;
      case '.':
      case '#':
      case ':':
        if (i !== 0) {
          composition.push(query.substring(last, i));
          last = i;
        }
        break;
      case '*':
        composition.push('*');
        last = i;
    }
  }
  if (last !== i) {
    composition.push(query.substring(last, i));
  }

  var items = goog.array.map(composition, function(item) {
    switch (item[0]) {
      case '*':
        return new mouse.query.ast.Id(item.substring(1, item.length));
      case '#':
        return new mouse.query.ast.Id(item.substring(1, item.length));
      case ':':
        var part = item.substring(1, item.length);
        var idx = part.indexOf('(');
        var name, content;
        if (idx === -1) {
          name = part;
          content = null;
        } else {
          name = part.substring(0, idx - 1);
          content = part.substring(idx, item.length - 1);
        }
        return new mouse.query.ast.Directive(name, content);
      case '.':
        return new mouse.query.ast.Classname(item.substring(1, item.length));
      default:
        return new mouse.query.ast.Tagname(item);
    }
  }, this);

  return items.length === 1 ?
      items[0] :
      new mouse.query.ast.Composition(items);


};
