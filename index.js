var global = (function(){ return this; })()

module.exports = function(obj, fn) {
    var f = function () {
        if (typeof fn !== 'function') return;
        return fn.apply(this === global || typeof this === 'undefined' ? obj : this, arguments);
    };

    function C () {}
    C.prototype = Object.getPrototypeOf(obj);
    f.__proto__ = new C;

    Object.getOwnPropertyNames(Function.prototype).forEach(function (key) {
        if (f[key] === undefined) {
            f.__proto__[key] = Function.prototype[key];
        }
    });

    Object.getOwnPropertyNames(obj).forEach(function (key) {
        f[key] = obj[key];
    });

    return f;
};