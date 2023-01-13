const CommunityPost = require('../models/community');
const getTime = require('../public/js/date');
const getUserIP=require('../public/js/userIP');
const Comment=require('../models/comment');
const ThumbUser = require('../models/thumbuser');
const clickbtn = require('../public/js/btn');
//게시판 접속GET
exports.getBoards = (req, res, next) => {
  CommunityPost.find()
    .sort({ "_id": -1 })
    .then(post => {
      //console.log(post);
      res.render('community/community', {
        posts: post,
        pageTitle: '커뮤니티',
        path: '/community',
      });
    })
    .catch(err => {
      console.log(err);
    });
};

//게시판 검색GET
exports.getSearch = (req, res, next) => {
  const searchtext = req.query.value;
  const searchby = req.query.searchby;
  // console.log(searchby);
  if (searchby === "bytitle_content") {
    CommunityPost.find({ $or: [{ title: { $regex: searchtext } }, { content: { $regex: searchtext } }] })
      .sort({ "_id": -1 })
      .then(post => {
        res.render('community/community', {
          posts: post,
          pageTitle: '커뮤니티:' + searchtext + ' 검색',
          path: '/community'
        })
      })
      .catch(err => {
        console.log(err);
      });
  } else if (searchby === "bytitle") {
    CommunityPost.find({ title: { $regex: searchtext } })
      .sort({ "_id": -1 })
      .then(post => {
        res.render('community/community', {
          posts: post,
          pageTitle: '커뮤니티:' + searchtext + ' 검색',
          path: '/community'
        })
      })
      .catch(err => {
        console.log(err);
      });
  } else if (searchby === "bycontent") {
    CommunityPost.find({ content: { $regex: searchtext } })
      .sort({ "_id": -1 })
      .then(post => {
        res.render('community/community', {
          posts: post,
          pageTitle: '커뮤니티:' + searchtext + ' 검색',
          path: '/community'
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
};

//글 보기 GET
exports.getPostDetail = (req, res, next) => {
  const postid = req.params.postId;
  
  
  CommunityPost.findById(postid)
    .then(post => {
      if(req.cookies[postid]==undefined){
        res.cookie(postid,getUserIP,{maxAge:86400000})
        post.viewCounts++;
        post.save();
      }
      res.render('community/communityview', {
        post: post,
        pageTitle: post.title,
        comments:post.comments,
        path: '/community',
      });
    })  
    .catch(err => console.log(err));
    
  
// else
// {
//     클래스 active 삭제
// }



};

//글 작성  GET
exports.getWritePost = (req, res, next) => {
  const editMode = req.query.edit;
  res.render('community/writing', {
    pageTitle: '글작성',
    path: 'community/writing',
    editing: editMode
  });
};

//글 작성 POST
exports.postWritePost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const image = req.file;
  const name = req.user.name;
  const viewcount = req.viewCounts;
  console.log(name);
  if(image)
  {
    const imageUrl = image.path;
  const communityPost = new CommunityPost(
    {
      title: title,
      content: content,
      date: getTime.today,
      imageUrl: imageUrl,
      userId: req.user,
      name: name,
      viewCounts: viewcount
    }
  );
  communityPost
    .save()
    .then(result => {
      // console.log(result);
      console.log('post success!');
      res.redirect('/community');
    })
    .catch(err => {
      console.log(err);
    });
  }
  else{
  const communityPost = new CommunityPost(
    {
      title: title,
      content: content,
      date: getTime.today,
      name: name,
      userId: req.user
    }
  );
  communityPost
    .save()
    .then(result => {
      // console.log(result);
      console.log('post success!');
      res.redirect('/community');
    })
    .catch(err => {
      console.log(err);
    });
  }
};

//글 수정 GET
exports.getEditPost = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const postId = req.params.postId;
  CommunityPost.findById(postId)
    .then(post => {
      if (!post) {
        return res.redirect('/');
      }
      res.render('community/writing', {
        pageTitle: '글 수정',
        path: '/community',
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
  const image = req.file;

  CommunityPost.findById(postid)
    .then(post => {
      post.title = updatedTitle;
      post.content = updatedContent;
      if(image){
        post.imageUrl = image.path;
      }
      return post.save();
    })
    .then(result => {
      console.log('UPDATED POST!');
      res.redirect('/community/' + postid);
    })
    .catch(err => console.log(err));
};

//글 삭제 POST
exports.postDeletePost = (req, res, next) => {
  const postid = req.body.postId;
  CommunityPost.findByIdAndRemove(postid)
    .then(() => {
      console.log('DESTROYED POST');
      res.redirect('/community');
    })
    .catch(err => console.log(err));
};

//댓글 작성 POST
exports.postWriteComment = (req, res, next) => {
  const postid=req.body.postId;
  const content = req.body.content;
  const comment = new Comment(
    {
      content:content,
      date:getTime.today,
      userId:req.user
    }
  );
  CommunityPost.findByIdAndUpdate(postid,{$push:{comments:comment}})
    .then(()=>{
      console.log('WRITE COMMENT');
      res.redirect('/community/' + postid);
    })
    .catch(err=>console.log(err));
};