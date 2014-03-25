/**
 * tag 模型
 */

var mongo = require('./db');
    marked = require('marked');

function Tag(name) {
	this.name = name;
}

module.exports = Tag;

/**
 * [get description]获取最多amount数量的tag,tid倒序,pv无影响
 * @param  {[type]}   arr   [tag組合]
 * @param  {Function} cb [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Tag.prototype.save = function (arr,cb,callback){
	//要存入数据库的文档
	var tag = {
		name: this.name
	};
	//开库
    mongo(function (err, db){
		if(err) return callback(err);
		//读
		db.collection('tags', function (err, collection){
			if(err){
				db.close();
				return callback(err);
			}

            collection.findOne({'name': tag.name}, function (err, doc) {
                if(err){
                    db.close();
                    return callback(err);
                }
                if(doc){
                    db.close();
                    callback(null,arr, cb);
                }else{
                    Tag.getLast(function(err,last){
                        if(err) {
                            db.close;
                            return callback(err);
                        }
                        tag.tid = last[0] ? parseInt(last[0].tid) + 1 : 1;
                        collection.insert(tag, {safe: true}, function (err){
                            db.close();
                            if(err) return callback(err);
                            callback(null,arr, cb);
                        });
                    });

                }
            });

		});
	});
};

Tag.getLast = function(callback){
    mongo(function(err, db){
        if(err){
            db.close;
            return callback(err);
        }
        db.collection('tags', function(err, collection){
            if(err){
                db.close;
                return callback(err);
            }
            collection.find({},{sort: {tid: -1}, limit:1}).toArray(function(err, last){
                if(err){
                    db.close;
                    return callback(err);
                }
                callback(null,last);
            });
        });
    });

}

/**
 * [get description]获取最多amount数量的tag,tid倒序,pv无影响
 * @param  {[type]}   amount   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Tag.get = function (amount, callback) {
    mongo(function (err, db) {
        if(err){
            db.close();
            return callback(err);
        }
        db.collection('tags', function (err, collection) {
            if(err){
                db.close();
                return callback(err);
            }
            collection.find({}, {
                skip: 0,
                limit: amount
            }).sort({tid: -1}).toArray(function (err, docs) {
                    db.close();
                    if(err) return callback(err);
                    callback(null, docs);
                });
        });
    });
};

/**
 * [getOne description]返回一个tag
 * @param  {[type]}   name      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Tag.getOneByName = function (name, callback) {
    mongo(function (err, db) {
		if(err){
			db.close();
			return callback(err);
		}
		db.collection('tags', function (err, collection) {
			if(err){
				db.close();
				return callback(err);
			}
			collection.findOne({'name': name}, function (err, doc) {
                db.close();
				if(err){
					return callback(err);
				}
				if(doc){
					callback(null, doc);
				}else{
					callback(null, null);
				}
			});
		});
	});
};

/**
 * [getOne description]返回一个tag
 * @param  {[type]}   tid      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Tag.getOne = function (tid, callback) {
    mongo(function (err, db) {
		if(err){
			db.close();
			return callback(err);
		}
		db.collection('tags', function (err, collection) {
			if(err){
				db.close();
				return callback(err);
			}
			collection.findOne({'tid': tid}, function (err, doc) {
                db.close();
				if(err){
					return callback(err);
				}
				if(doc){
					callback(null, doc);
				}else{
					callback(null, null);
				}
			});
		});
	});
};

Tag.edit = Tag.getOne;

Tag.delete = function (tid, callback) {
    mongo(function (err, db) {
        if(err){
            db.close();
            return callback(err);
        }
        db.collection('tags', function (err, collection) {
            if(err){
                db.close();
                return callback(err);
            }
            collection.remove({tid: tid}, function (err) {
                db.close();
                if(err) return callback(err);
                callback(null);
            });
        });
    });
}










