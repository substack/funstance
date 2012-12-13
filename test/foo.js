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
    t.plan(8);
    
    var obj = new Foo(4);
    var fobj = funstance(obj, function (n) {
        return n * obj.x
    });
    
    t.equal(fobj(111), 444);
    fobj.on('beep', function (s) {
        t.equal(s, 'boop');
    });
    fobj.beep();
    
    t.equal(fobj.call(null, 25), 100);
    t.equal(fobj.apply(null, [64]), 256);
    t.equal(fobj.bind(null, 0.25)(), 1);
    
    t.ok(!obj.call);
    t.ok(!obj.apply);
    t.ok(!obj.bind);
});

test('let call/bind/apply to work too', function(t) {
    t.plan(3);

    var obj = new Foo(4)
    var fobj = funstance(obj, function(n) {
        return n * this.x
    }, true);

    t.equal(fobj.call({ x: 2 }, 25), 50);
    t.equal(fobj.apply({ x: 3 }, [9]), 27);
    t.equal(fobj.bind({ x: 5 }, 25)(), 125);
})