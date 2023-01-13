const path = require('path');

const express = require('express');

const router = express.Router();

const galleryController = require('../controllers/gallery');
const isAuth = require('../middleware/is-auth');

router.get('/gallery', galleryController.getBoards);

router.get('/gallery/write', isAuth, galleryController.getWritePost);

router.post('/gallery/write', galleryController.postWritePost);

router.get('/gallery/:postId', galleryController.getPostDetail);

router.get('/gallery/write/:postId', isAuth, galleryController.getEditPost);

router.post('/gallery/write/:postId', galleryController.postEditPost);

router.post('/gallery/delete-post', galleryController.postDeletePost);

module.exports = router;
