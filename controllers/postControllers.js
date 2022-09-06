const Post = require('../models/Post');

const {body, validationResult} = require('express-validator');

exports.load_posts = (req, res) => {
    if(res.locals.currentUser === undefined) {
        res.redirect('/catalog/signin');
        return;
    }
    Post.find()
    .sort({"date" : -1})
    .populate('author')
    .exec(function(err, posts) {
        if(err) {return next(err);}
        res.render("post_lists", {posts: posts});
    }); 
};

exports.create_posts_get = (req, res) => {
    if(res.locals.currentUser === undefined) {
        res.redirect('/catalog/signin');
        return;
    }
    res.render('create_post');
};

exports.create_posts_post = [
    body('title', "Post must have a title")
        .trim()
        .isLength({min: 1})
        .escape(),
    body('message', "Post must have a message")
        .trim()
        .isLength({min: 1})
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.render('create_post', {post: req.body, errors: errors.array()})
            return;
        }
        console.log(res.locals.currentUser._id)
        const post = new Post({
            title: req.body.title,
            author: res.locals.currentUser._id,
            message: req.body.message,
        })
        console.log(post)
        post.save((err) => {
            if(err) {
                return next(err);
            }
            res.redirect('/catalog/posts');
        })
    }
]

exports.delete_posts_get = (req, res) => {
    res.send('Not implemented');
};

exports.delete_posts_post = (req, res) => {
    res.send('Not implemented');
};