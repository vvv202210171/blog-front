/* eslint-disable no-extend-native */
import NP from 'number-precision'
Number.prototype.add = function(arg) {
  return NP.plus(arg, this)
}

Number.prototype.minus = function() {
  return NP.minus(this, ...arguments)
}

Number.prototype.divide = function(arg) {
  return NP.divide(this, ...arguments)
}

Number.prototype.times = function(arg) {
  return NP.times(this, ...arguments)
}
