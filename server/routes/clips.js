var express = require('express');
var router = express.Router();
var clipCtrl = require('../controllers/Clip');

/* GET clips */
router.get('/user/id/:user', clipCtrl.getUserClips);

/* POST clips */
router.post('/save', clipCtrl.saveUserClip);

/* PUT clips */
router.put('/update/id/:id', clipCtrl.updateUserClip);

/* PUT clips */
router.put('/update/id/:id/add/feed', clipCtrl.addUserClipFeed);
router.put('/update/id/:id/remove/feed', clipCtrl.removeUserClipFeed);

/* DELETE user clip */
router.delete('/delete/id/:id', clipCtrl.deleteUserClip);

/* DELETE user clip board */
router.post('/delete', clipCtrl.deleteUserClips);

module.exports = router;
