var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('underscore'),
    log4js = require('log4js'),
    logger = log4js.getLogger('models/User'),
    async = require('async');

/**
 * Clip Schema
 */
var ClipSchema = new Schema({
    user: { type: String, required: true }, // 유저 ID
    title: { type: String, required: true }, // 클립 제목
    boardImageUrl: { type: String, default: '/images/card_no_image.png' }, // 보드 이미지
    feeds: { type: Array, default: [] }, // 클립에 포함된 피드 리스트
    createDate: { type: Date, required: true }, // 등록된 시간
    // 클라이언트로 내려주는 데이터를 위한 필드들
    feedCount: { type: String } // 포함된 피드 개수
}, {collection: 'clip'});

ClipSchema.index({ user: 1 });
ClipSchema.index({ createDate: -1 });

/**
 * Model Methods
 */

ClipSchema.statics.getClip = function(criteria, projection, options, callback) {
    this.findOne(criteria, projection, options, callback);
};

ClipSchema.statics.getClips = function(criteria, projection, options, callback) {
    this.find(criteria, projection, options, function(err, clips) {
        if (err) return callback(err);
        logger.debug(clips);
        _.map(clips, function(clip) {
            clip.feedCount = clip.feeds.length || 0;
        });
        callback(null, clips);
    });
};

ClipSchema.statics.saveClip = function(doc, callback) {
    if (!doc) return;

    doc.createDate = doc.createDate ? doc.createDate : new Date();
    this.create(doc, callback);
};

ClipSchema.statics.updateClip = function(conditions, doc, callback) {
    var self = this;
    if (!conditions || !doc) return;
    async.waterfall([
        function(callback) {
            self.findOne(conditions, function(err, clip) {
                callback(err, clip);
            });
        },
        function(clip, callback) {
            doc.feeds = _.union(clip.feeds, doc.feeds);
            self.update(conditions, doc, callback);
        }
    ], function (err, doc) {
        callback(err, doc);
    });
};

ClipSchema.statics.deleteClip = function(criteria, callback) {
    if (!criteria) return;
    this.update(criteria, callback);
};

ClipSchema.statics.deleteClipAll = function(criteria, callback) {
    if (!criteria) return;
    this.remove(criteria, callback);
};


module.exports = mongoose.model('Clip', ClipSchema);