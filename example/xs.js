var funstance = require('../');
var xs = [1,2,3];
var fxs = funstance(xs, function (n) { return this.push(n) });

console.log(fxs.length);
console.log(fxs.shift());

fxs(555);
console.log(fxs.join(','));
