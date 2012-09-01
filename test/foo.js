var test = require('tap').test;
var funstance = require('../');

var inherits = require('inherits');
var Stream = require('stream');

module.exports = Foo;
inherits(Foo, Stream);

function Foo (x) {
    this.x = x;
}

Foo.prototype.beep = function () {
    this.emit('beep', 'boop');
};

test('funstantiate foo', function (t) {
    t.plan(2);
    
    var obj = new Foo(4);
    var fobj = funstance(obj, function (n) {
        return n * obj.x
    });
    
    t.equal(fobj(111), 444);
    fobj.on('beep', function (s) {
        t.equal(s, 'boop');
    });
    fobj.beep();
});