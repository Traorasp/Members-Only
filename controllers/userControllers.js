const User = require('../models/User');

const bcrypt = require('bcryptjs')
const {body, validationResult} = require('express-validator');
const passport = require('passport');

exports.register_get = (req, res) => {
 res.render('register');
};

exports.register_post = [
    body('name', "Name cannot be empty")
        .trim()
        .isLength({min:1})
        .isAlpha()
        .withMessage('Name must be alphabet letters')
        .escape(),
    body('lastname', "Last name cannot be empty")
        .trim()
        .isLength({min:1})
        .isAlpha()
        .withMessage('Last name must be alphabet letters')
        .escape(),
    body('username', "Username cannot be empty")
        .trim()
        .isLength({min:1})
        .escape(),
    body('password', "Password cannot be empty")
        .trim()
        .isLength({min:1})
        .escape(),
    body('confirmPassword')
        .trim()
        .isLength({min:1})
        .escape()
        .custom((value, {req}) => value === req.body.password)
        .withMessage("Confirm password must be same as Password"),
    (req, res, next) => {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                res.render('register', {user: req.body, errors: errors.array()});
                return;
            }

            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if(err) {
                    return next(err);
                }

                const user = new User({
                    name: req.body.name,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    password: hashedPassword,
                });
    
                user.save((err) => {
                    if(err) {
                        return next(err);
                    }
                    res.redirect('/catalog/posts');
                });
            })
        }
];

exports.sign_in_get = (req, res) => {
    res.render('login')
};

exports.sign_in_post = 
    passport.authenticate("local", {
        successRedirect: "/catalog/posts",
        failureRedirect: "/catalog/signin"
    });

exports.sign_out_post = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/catalog/signin');
    })
}

exports.update_status_get = (req, res) => {
    if(res.locals.currentUser === undefined) {
        res.redirect('/catalog/signin');
        return;
    }
    res.render('update_status');
};

exports.update_status_post = [
    body("keycode", "Must input a keycode")
        .trim()
        .isLength({min:1})
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.render('update_status', {errors: errors.array()});
            return;
        }

        const keycode = req.body.keycode;
        const isMember = keycode === process.env.memberKey ? true : keycode === process.env.adminKey ? true : false;
        const isAdmin = keycode === process.env.adminKey;

        const user = new User({
            name: res.locals.currentUser.name,
            lastname: res.locals.currentUser.lastname,
            username: res.locals.currentUser.username,
            password: res.locals.currentUser.password,
            ismember: isMember,
            isadmin: isAdmin,
            _id: res.locals.currentUser._id,
        });

        User.findByIdAndUpdate(res.locals.currentUser._id, user, {}, (err, theuser) => {
            if(err) {
                return next(err);
            }
            res.redirect("/catalog/posts")
        })
    }
]
