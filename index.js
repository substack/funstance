module.exports = function (obj, fn) {
    var f = function () {
        if (typeof fn !== 'function') return;
        return fn.apply(obj, arguments);
    };
    
    function C () {}
    C.prototype = Object.getPrototypeOf(obj);
    f.__proto__ = new C;
    
    if (f.__proto__.call === undefined) {
        f.__proto__.call = function (inst) {
            return fn.apply(inst, [].slice.call(arguments, 1));
        };
    }
    if (f.__proto__.apply === undefined) {
        f.__proto__.apply = function (inst, args) {
            return fn.apply(inst, args);
        };
    }
    
    Object.getOwnPropertyNames(obj).forEach(function (key) {
        f[key] = obj[key];
    });
    
    return f;
};
