const path = require('path');

const express = require('express');

const router = express.Router();

const requestController = require('../controllers/request');
const isAuth = require('../middleware/is-auth');

router.get('/request-personer', requestController.getBoards);

router.get('/request-personer/write', isAuth, requestController.getWritePost);

router.post('/request-personer/write', requestController.postWritePost);

router.get('/request-personer/:postId', requestController.getPostDetail);

router.get('/request-personer/write/:postId', isAuth, requestController.getEditPost);

router.post('/request-personer/write/:postId', requestController.postEditPost);

router.post('/request-personer/delete-post', requestController.postDeletePost);

module.exports = router;
