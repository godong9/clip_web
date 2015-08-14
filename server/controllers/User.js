var mongoose = require('mongoose');
var User = mongoose.model('User');
var Result = require('../services/Result');
var async = require('async');

function UserCtrl() {

}

UserCtrl.getHomePage = function(req, res) {
    var errors, criteria;
    req.checkParams('id', 'Invalid id').notEmpty();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(Result.ERROR(errors));
    criteria = { _id: req.params.id };
    // TODO: 유저 정보 + 유저 피드들 정보 만들어서 html 형태로 내려줘야함!
    User.getUser(criteria, function(err, docs) {
        res.render('home');
    });
};

UserCtrl.getUserPage = function(req, res) {
    var errors, criteria;
    req.checkParams('id', 'Invalid id').notEmpty();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(Result.ERROR(errors));
    criteria = { _id: req.params.id };
    // TODO: 유저 정보 + 클립 보드 정보 만들어서 html 형태로 내려줘야함!
    User.getUser(criteria, function(err, docs) {
        res.status(200).send(Result.SUCCESS(docs));
    });
};



UserCtrl.getAllUsers = function(req, res) {
    var errors;
    req.checkQuery('test', 'Must be true').isIn(["true"]);
    errors = req.validationErrors();
    if (errors) return res.status(400).send(Result.ERROR(errors));
    User.getUsers({}, function(err, docs) {
       res.status(200).send(Result.SUCCESS(docs));
    });
};

UserCtrl.getUser = function(req, res) {
    var errors, criteria;
    req.checkParams('id', 'Invalid id').notEmpty();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(Result.ERROR(errors));
    criteria = { _id: req.params.id };
    User.getUser(criteria, function(err, doc) {
        res.status(200).send(Result.SUCCESS(doc));
    });
};

UserCtrl.saveUser = function(req, res) {
    var errors, userData;
    req.checkQuery('email', 'Invalid email').isEmail();
    req.checkQuery('pw', 'Invalid pw').notEmpty();
    req.checkQuery('pw2', 'Invalid pw2').notEmpty();
    req.checkQuery('name', 'Invalid name').notEmpty();
    errors = req.validationErrors();
    if (errors) return res.status(400).send(Result.ERROR(errors));
    userData = {
        email: req.query.email,
        pw: req.query.pw,
        name: req.query.name
    };
    User.saveUser(userData, function(err, doc) {
        res.status(200).send(Result.SUCCESS(doc));
    });
};

UserCtrl.loginUser = function(req, res) {
    // POST
    // email, pw
    //
    // email로 criteria 만들어서 해당 email을 가진 유저 존재하는지 확인하고
    // 존재안하면 fail 리턴. 존재하면 pw가 넘겨받은 pw랑 같은지 확인해서 같으면 success, 다르면 fail
    // TODO: 과제1 로그인 여기에 구현해야 함
};

UserCtrl.updateUser = function(req, res) {
    // PUT
    // id <- params, 업데이트 되는 필드 데이터 <- req.body
    // 업데이트 가능한 필드: feeds, keywords, name, profileUrl, pw
    // TODO: 과제2 유저 정보 업데이트하는 부분 여기에 구현해야 함
};

module.exports = UserCtrl;
