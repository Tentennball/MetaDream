const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
    res.render('main', {
        pageTitle: '메타드림',
        path: '/'
    });
});

router.get('/news', function (req, res) {
    res.render('news', { pageTitle: '메타드림:뉴스', path: '/news', isAuth:req.session.isLoggedIn });
});

module.exports = router;