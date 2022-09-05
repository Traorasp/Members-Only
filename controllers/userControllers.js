const User = require('../models/User');

const bcrypt = require('bcryptjs')
const {body, validationResult} = require('express-validator');

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
    res.send('Not implemented');
};

exports.sign_in_post = (req, res) => {
    res.send('Not implemented');
};

exports.update_status_get = (req, res) => {
    res.send('Not implemented');
};

exports.update_status_post = (req, res) => {
    res.send('Not implemented');
};

