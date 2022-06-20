
module.exports = {
    ignoreEmpty: function(val) {
        if ('' === val) {
            return undefined;
        } else {
            return val;
        }
    },
}