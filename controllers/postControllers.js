const Post = require('../models/Post');

exports.load_posts = (req, res) => {
    if(res.locals.currentUser === undefined) {
        res.redirect('/catalog/signin');
        return;
    }
    Post.find()
    .sort({"date" : -1})
    .exec(function(err, posts) {
        if(err) {return next(err);}
        res.render("post_lists", {posts: posts});
    }); 
};

exports.create_posts_get = (req, res) => {
    res.send('Not implemented');
};

exports.create_posts_post = (req, res) => {
    res.send('Not implemented');
};

exports.delete_posts_get = (req, res) => {
    res.send('Not implemented');
};

exports.delete_posts_post = (req, res) => {
    res.send('Not implemented');
};