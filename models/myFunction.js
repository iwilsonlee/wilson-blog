/**
 * Created with JetBrains WebStorm.
 * User: wilson
 * Date: 14-3-25
 * Time: 下午6:20
 * To change this template use File | Settings | File Templates.
 */

module.exports = MyFunction;

MyFunction.whilst = function (test,value, iterator, callback) {  //test條件，value返回值，iterator是while邏輯，callback為回調函數
    if (test()) {
        iterator(function (err, value) {
            if (err) {
                return callback(err, null);
            }
            nb.whilst(test,value, iterator, callback);
        });
    }
    else {
        callback(null,value);
    }
};