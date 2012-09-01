# funstance

make an instance callable like a function

# example

## funstantiate an array

``` js
var xs = [1,2,3]
var fxs = funstance(xs, function (n) { return this.push(n) });

console.log(fxs.length);
console.log(fxs.shift());

fxs(555);
console.dir(fxs);
```

***

```
$ node xs.js
3
1
[2,3,555]
```

## funstantiate a prototypical object

suppose 

``` js
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

module.exports = Foo;

function Foo (x) {
    this.x = x;
}

Foo.prototype.beep = function () {
    this.emit('beep', 'boop');
};
```

main.js:

``` js
var funstance = require('funstance');
var Foo = require('./foo');

var obj = new Foo(4);
var fobj = funstance(obj, function (n) {
    return n * obj.x
})

console.log(fobj(111));
fobj.on('beep', console.log);
fobj.beep();
```

***

```
$ node main.js
444
boop
```

# methods

``` js
var funstance = require('funstance')
```

## var fobj = funstance(obj, fn)

Return a function with all the properties and prototypical methods as `obj`.
When `fobj()` is called, `fn()` will fire with the arguments and `this` set to
the `obj`.

# install

With [npm](https://npmjs.org) do:

```
npm install funstance
```

# license

MIT
