const GalleryPost = require('../models/gallery');
const getTime = require('../public/js/date');

//게시판 접속 GET
exports.getBoards = (req, res, next) => {
  GalleryPost.find()
    .sort({"_id":-1})
    .then(post => {
      // console.log(post.length);
      res.render('gallery/gallery', {
        posts: post,
        pageTitle: '포트폴리오',
        path: '/gallery'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

//글 보기 GET
exports.getPostDetail = (req, res, next) => {
  const postid = req.params.postId;
  GalleryPost.findById(postid)
    .then(post => {
      res.render('gallery/galleryview', {
        post: post,
        pageTitle: post.title,
        path: '/gallery'
      });
    })
    .catch(err => console.log(err));
};


//글 작성  GET
exports.getWritePost = (req, res, next) => {
  const editMode = req.query.edit;
    res.render('gallery/write', {
      pageTitle: '글 작성',
      path: 'gallery',
      editing: editMode
    });
};

//글 작성 POST
exports.postWritePost =(req,res,next)=>{
  const title = req.body.title;
  const content = req.body.content;
  const GalleryPost = new GalleryPost(
    {
    title: title,
    content: content,
    date: getTime.today,
    userId:req.user
    }
  );
  GalleryPost
    .save()
    .then(result => {
      // console.log(result);
      console.log('post success!');
      res.redirect('/gallery');
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
  GalleryPost.findById(postId)
    .then(post => {
      if (!post) {
        return res.redirect('/');
      }
      res.render('gallery/write', {
        pageTitle: '글 수정',
        path: '/gallery',
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

  GalleryPost.findById(postid)
    .then(post => {
      post.title = updatedTitle;
      post.content = updatedContent;
      return post.save();
    })
    .then(result => {
      console.log('UPDATED POST!');
      res.redirect('/gallery/'+postid);
    })
    .catch(err => console.log(err));
};

//글 삭제 POST
exports.postDeletePost = (req, res, next) => {
  const postid = req.body.postId;
  GalleryPost.findByIdAndRemove(postid)
    .then(() => {
      console.log('DESTROYED POST');
      res.redirect('/gallery');
    })
    .catch(err => console.log(err));
};