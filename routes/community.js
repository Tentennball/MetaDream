const path = require('path');

const express = require('express');

const router = express.Router();

const communityController = require('../controllers/community');
const isAuth = require('../middleware/is-auth');

router.get('/', communityController.getBoards);

router.get('/search', communityController.getSearch);
  
router.get('/writing', isAuth, communityController.getWritePost);

router.get('/:postId', communityController.getPostDetail);

router.post('/writing', communityController.postWritePost);

router.get('/writing/:postId', isAuth, communityController.getEditPost);

router.post('/writing/:postId', communityController.postEditPost);

router.post('/delete-post', communityController.postDeletePost);

router.post('/add-comment',communityController.postWriteComment);

module.exports = router;
