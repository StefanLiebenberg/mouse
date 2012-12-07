
/**
 * @author siga.fredo@gmail.com (Stefan)
 * @fileoverview Provides a seedable random generator.
 */
goog.provide('mouse.math.Random');



/**
 * @constructor
 * @param {number=} opt_seed
 *        Optional seed for this random generator.
 */
mouse.math.Random = function(opt_seed) {
  this.seed_ = goog.isDefAndNotNull(opt_seed) ? opt_seed : +new Date();
  this.m_ = Math.pow(2, 32);
  this.a_ = 1103515245;
  this.c_ = 12345;
  this.reset();
};


/**
 * Sets the state to the original seed. And steps an optional count in.
 * @param {number=}  opt_count
 *       The optional count to step in.
 *
 */
mouse.math.Random.prototype.reset = function(opt_count) {
  this.state_ = this.seed_;
  this.count_ = 0;
  if (goog.isDefAndNotNull(opt_count) && opt_count > 0) {
    while (opt_count--) {
      this.nextState();
    }
  }
};


/**
 * Returns what the next state will be.
 * Note: Does not modify this .state_ attribute, see .nextState();
 * @return {number}
 *         A integer value.
 */
mouse.math.Random.prototype.getNextState = function() {
  return (this.a_ * this.state_ + this.c_) % this.m_;
};


/**
 * Returns the next state. Similiar to .getNextState, but also modifies the
 * .state_ attribute.
 *
 * @return {number}
 *         A integer value.
 */
mouse.math.Random.prototype.nextState = function() {
  this.count_++;
  return this.state_ = this.getNextState();
};


/**
 * @return {number}
 *         The a random float between 0 and 1.
 */
mouse.math.Random.prototype.random = function() {
  return this.nextState() / (this.m_ - 1);
};


/**
 * @return {number}
 *         A random number.
 */
mouse.math.Random.prototype.randomInteger = function() {
  return this.nextState();
};


/**
 * Return a random integer between max and min values.
 * @param {number} min The minimum Number.
 * @param {number} max The maximum Number.
 * @return {number}
 *      The value.
 */
mouse.math.Random.prototype.betweenFloat = function(min, max) {
  return min + ((max - min) * this.random());
};


/**
 * Return a random integer between max and min values.
 * @param {number} min The minimum Number.
 * @param {number} max The maximum Number.
 * @return {number}
 *      The value.
 */
mouse.math.Random.prototype.between = function(min, max) {
  return Math.round(this.betweenFloat(min, max));
};
