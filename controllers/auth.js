const User = require('../models/user');
const bcrypt=require('bcryptjs')
const CommunityPost=require('../models/community');

//로그인페이지 GET
exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: '로그인',
        path: '/login'
    });
};

//회원가입페이지 GET
exports.getSignup = (req, res, next) => {
    console.log(req.session.isLoggedIn);
    res.render('auth/signup', {
        pageTitle: '회원가입',
        path: '/signup'
    });
};

//로그인 POST
exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.redirect('/login');
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });

        })
        .catch(err => console.log(err));
};

//회원가입 POST
exports.postSignup = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                return res.redirect('/signup');
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        name: name,
                        email: email,
                        password: hashedPassword,
                        posts: {
                            personalrequest: [],
                            community: []
                        }
                    });
                    return user.save();
                })
                .then(result => {
                    res.redirect('/login');
                });
        })
        .catch(err => {
            console.log(err);
        });
};

//로그아웃 POST
exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};

exports.getMypage = (req,res,next)=>{
    CommunityPost.find()
        .sort({"_id":-1})
        .then(post=>{
            res.render('auth/mypage', {
                posts:post, 
                pageTitle: '마이페이지',
                path: '/auth'
                });
        })
        .catch(err=>{
            console.log(err);
        });
}