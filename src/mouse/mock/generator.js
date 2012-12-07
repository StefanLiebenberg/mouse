goog.provide('mouse.mock.Generator');
goog.require('mouse.math.Random');


/**
 * @private
 * @type {mouse.math.Random}
 */
mouse.mock.random_;


/**
 * @return {!mouse.math.Random}
 *          The random math generator.
 */
mouse.mock.getRandom = function() {
  if (!goog.isDef(mouse.mock.random_)) {
    mouse.mock.random_ = new mouse.math.Random();
  }
  return mouse.mock.random_;
};


/**
 * @param {mouse.math.Random=} opt_random
 *        Optional random number generator.
 * @param {number=} opt_max
 *        Optional max amount.
 * @return {number}
 *        A random integer.
 */
mouse.mock.getNumber = function(opt_random, opt_max) {
  var random = opt_random || mouse.mock.getRandom();
  if (goog.isDefAndNotNull(opt_max)) {
    return random.randomInteger();
  } else {
    return random.between(0, opt_max);
  }
};


/**
 * @private
 * @type {string}
 */
mouse.mock.set_ = 'abcdefghijklmnopqrstvwzyz0123456789';


/**
 * @type {Number}
 */
mouse.mock.STRING_MAX_RANDOM_LENGTH = 500;


/**
 *
 * @param {mouse.math.Random=} opt_random
 *        Optional random.
 * @param {number=} opt_length
 *        Optional length.
 * @return {string}
 *        A string.
 */
mouse.mock.getString = function(opt_random, opt_length) {
  var length = opt_length ||
      mouse.mock.getNumber(opt_random, mouse.mock.STRING_MAX_RANDOM_LENGTH);
  var m = mouse.mock.set_.length;
  var string = '';
  while (length--) {
    var n = mouse.mock.getNumber(opt_random, m);
    string += mouse.mock.set_[n];
  }
  return string;
};


/**
 * @param {mouse.math.Random=} opt_random
 *        Random generator.
 * @return {boolean}
 *         Return boolean.
 */
mouse.mock.getBoolean = function(opt_random) {
  return mouse.mock.getNumber(opt_random, 1) === 1;
};
