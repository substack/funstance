module.exports = function (obj, fn) {
    var f = function () {
        if (typeof fn !== 'function') return;
        return fn.apply(obj, arguments);
    };
    
    Object.getOwnPropertyNames(obj).forEach(function (key) {
        f[key] = obj[key];
    });
    
    return f;
};
