var express = require('express');
var router = express.Router();

// Requires controllers

const userControllers = require('../controllers/userControllers');
const postControllers = require('../controllers/postControllers');

/// Users Routes ///

// GET request for registering
router.get('/', userControllers.register_get);

// POST request for registering
router.post('/', userControllers.register_post);

// GET request for signing in
router.get('/signin', userControllers.sign_in_get);

// POST request for signing in
router.post('/signin', userControllers.sign_in_post);

// GET request for updating status
router.get('/member', userControllers.update_status_get);

// POST request for updating status
router.post('/member', userControllers.update_status_post);


/// Post Routes ///

// GET request for all posts
router.get('/posts', postControllers.load_posts);

// GET request for creating post
router.get('/create', postControllers.create_posts_get);

// POST request for creating post
router.post('/create', postControllers.create_posts_post);

// GET request for deleting post
router.get('/delete', postControllers.delete_posts_get);

// POST request for deleting post
router.post('/delete', postControllers.delete_posts_post);

module.exports = router;
