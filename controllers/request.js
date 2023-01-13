const RequestPost = require('../models/request');
const getTime = require('../public/js/date');

//게시판 접속 GET
exports.getBoards = (req, res, next) => {
  RequestPost.find()
    .sort({"_id":-1})
    .then(post => {
      // console.log(post.length);
      res.render('request/request-personer', {
        posts: post,
        pageTitle: '개인의뢰',
        path: '/request'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

//글 보기 GET
exports.getPostDetail = (req, res, next) => {
  const postid = req.params.postId;
  RequestPost.findById(postid)
    .then(post => {
      res.render('request/personerview', {
        post: post,
        pageTitle: post.title,
        path: '/request'
      });
    })
    .catch(err => console.log(err));
};


//글 작성  GET
exports.getWritePost = (req, res, next) => {
  const editMode = req.query.edit;
    res.render('request/personer-write', {
      pageTitle: '글 작성',
      path: 'request',
      editing: editMode
    });
};

//글 작성 POST
exports.postWritePost =(req,res,next)=>{
  const title = req.body.title;
  const content = req.body.content;
  const requestPost = new RequestPost(
    {
    title: title,
    content: content,
    date: getTime.today,
    userId:req.user
    }
  );
  requestPost
    .save()
    .then(result => {
      // console.log(result);
      console.log('post success!');
      res.redirect('/request-personer');
    })
    .catch(err => {
      console.log(err);
    });
};

//글 수정 GET
exports.getEditPost = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const postId = req.params.postId;
  RequestPost.findById(postId)
    .then(post => {
      if (!post) {
        return res.redirect('/');
      }
      res.render('request/personer-write', {
        pageTitle: '글 수정',
        path: '/request',
        editing: editMode,
        post: post
      });
    })
    .catch(err => console.log(err));
};

//글 수정 POST
exports.postEditPost = (req, res, next) => {
  const postid = req.body.postId;
  const updatedTitle = req.body.title;
  const updatedContent = req.body.content;

  RequestPost.findById(postid)
    .then(post => {
      post.title = updatedTitle;
      post.content = updatedContent;
      return post.save();
    })
    .then(result => {
      console.log('UPDATED POST!');
      res.redirect('/request-personer/'+postid);
    })
    .catch(err => console.log(err));
};

//글 삭제 POST
exports.postDeletePost = (req, res, next) => {
  const postid = req.body.postId;
  RequestPost.findByIdAndRemove(postid)
    .then(() => {
      console.log('DESTROYED POST');
      res.redirect('/request-personer');
    })
    .catch(err => console.log(err));
};