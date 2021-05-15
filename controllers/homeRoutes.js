const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    // Get all postss and JOIN with user data
    const postsData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const commentData = await Comment.findAll();

    // Serialize data so the template can read it
    const posts = postsData.map(posts => posts.get({ plain: true }));
    const comments = commentData.map(comment => comment.get({ plain: true }));

    console.log(comments, posts)

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts,
      comments,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/post', withAuth, async (req, res) => {
  try {
    // // Find the logged in user based on the session ID
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    //   include: [{ model: Post }],
    // });

    // const user = userData.get({ plain: true });

    res.render('newPost', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const postsData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['comment'],
        },
      ],
    });

    const post = postsData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    // Get all postss and JOIN with user data
    const postsData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['comment'],
        },
      ],
    });
    
    const commentsData = await Comment.findAll();
    
    // Serialize data so the template can read it
    const posts = postsData.map(posts => posts.get({ plain: true }));
    const user = userData.get({ plain: true });
    const comments = commentsData.map(comment => comment.get({ plain: true }));

    console.log(comments, posts, user)

    res.render('dashboard', {
      ...user,
      posts,
      comments,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
