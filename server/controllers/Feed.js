var mongoose = require('mongoose');
var Feed = mongoose.model('Feed');
var Result = require('../services/Result');
var log4js = require('log4js');
var logger = log4js.getLogger('controllers/Feed');
var ObjectId = mongoose.Types.ObjectId;
var async = require('async');

function FeedCtrl() {

}

function makeCriteria(req) {
    var query = req.query;
    var params = req.params;
    var criteria = {};
    if (params.user) {
        criteria.user = ObjectId(params.user);
    }
    return criteria;
}

FeedCtrl.getUserFeeds = function(req, res) {
    var errors, criteria, options;
    req.checkParams('user', 'Invalid user').notEmpty();
    req.checkQuery('pageNum', 'Invalid pageNum').notEmpty();
    req.checkQuery('perPage', 'Invalid perPage').notEmpty();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(Result.ERROR(errors));
    criteria = makeCriteria(req);
    options = {
        skip: parseInt(req.query.pageNum) * parseInt(req.query.perPage),
        limit: parseInt(req.query.perPage)
    };
    logger.debug("criteria: ", criteria);
    logger.debug("options: ", options);
    Feed.getFeeds(criteria, {}, options, function(err, docs) {
        res.status(200).send(Result.SUCCESS(docs));
    });
};

module.exports = FeedCtrl;
