const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/postsController.js');

router.get('/posts', postsCtrl.showPosts);
router.post('/posts', postsCtrl.createPost);

router.get('/posts/:postId', postsCtrl.showPost);

router.get('/posts/:postId/comments', postsCtrl.showCommentsForPost);

router.route('/posts/:postId/comments/:commentId')
      .get(postsCtrl.getComment)
      .post(postsCtrl.createComment)
      .put(postsCtrl.updateComment)
      .delete(postsCtrl.deleteComment);

module.exports = router;
