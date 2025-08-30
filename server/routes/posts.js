const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new post
router.post('/', auth, [
  body('content')
    .isLength({ min: 1, max: 2000 })
    .withMessage('Post content must be between 1 and 2000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, images } = req.body;
    
    // Extract hashtags and mentions
    const hashtags = content.match(/#[\w]+/g)?.map(tag => tag.slice(1).toLowerCase()) || [];
    const mentionMatches = content.match(/@[\w]+/g) || [];
    
    // Find mentioned users
    const mentions = [];
    for (const mention of mentionMatches) {
      const username = mention.slice(1);
      const user = await User.findOne({ username });
      if (user) {
        mentions.push(user._id);
      }
    }

    const post = new Post({
      author: req.userId,
      content,
      images: images || [],
      hashtags,
      mentions
    });

    await post.save();
    
    const populatedPost = await Post.findById(post._id)
      .populate('author', 'username fullName profilePicture isVerified')
      .populate('comments.user', 'username fullName profilePicture')
      .populate('mentions', 'username fullName');

    res.status(201).json({
      message: 'Post created successfully',
      post: populatedPost
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get feed posts
router.get('/feed', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const currentUser = await User.findById(req.userId);
    const followingIds = [...currentUser.following, req.userId];

    const posts = await Post.find({ author: { $in: followingIds } })
      .populate('author', 'username fullName profilePicture isVerified')
      .populate('comments.user', 'username fullName profilePicture')
      .populate('likes.user', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json(posts);
  } catch (error) {
    console.error('Get feed error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single post
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('author', 'username fullName profilePicture isVerified')
      .populate('comments.user', 'username fullName profilePicture')
      .populate('likes.user', 'username');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like/Unlike post
router.post('/:postId/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const likeIndex = post.likes.findIndex(
      like => like.user.toString() === req.userId
    );

    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1);
    } else {
      // Like
      post.likes.push({ user: req.userId });
    }

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate('author', 'username fullName profilePicture')
      .populate('likes.user', 'username');

    res.json({
      message: likeIndex > -1 ? 'Post unliked' : 'Post liked',
      post: updatedPost
    });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add comment
router.post('/:postId/comment', auth, [
  body('content')
    .isLength({ min: 1, max: 500 })
    .withMessage('Comment must be between 1 and 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({
      user: req.userId,
      content: req.body.content
    });

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate('author', 'username fullName profilePicture')
      .populate('comments.user', 'username fullName profilePicture');

    res.json({
      message: 'Comment added successfully',
      post: updatedPost
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete post
router.delete('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(req.params.postId);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get posts by hashtag
router.get('/hashtag/:tag', async (req, res) => {
  try {
    const tag = req.params.tag.toLowerCase();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ hashtags: tag })
      .populate('author', 'username fullName profilePicture isVerified')
      .populate('comments.user', 'username fullName profilePicture')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json(posts);
  } catch (error) {
    console.error('Get hashtag posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;