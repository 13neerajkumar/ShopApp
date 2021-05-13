const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Seller = require('../models/seller');
const passport = require('passport');


// Get the signup form for Seller
router.get('/seller_register', async (req, res) => {
    res.render('auth/seller_signup');
})

router.post('/seller_register', async (req, res) => {
    
    try {
        const seller = new Seller({ username: req.body.username, email: req.body.email });
        const newSeller = await Seller.register(seller, req.body.password);
        req.flash('success', 'Registered Successfully,Please Login to Continue');
        res.redirect('/seller_login');
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/seller_register')
    }
});


// Get the login form for seller
router.get('/seller_login', async (req, res) => {
    
    res.render('auth/seller_login')
})

router.post('/seller_login',
    passport.authenticate('sellerLocal',
        {
            failureRedirect: '/seller_login',
            failureFlash: true
        }
    ), (req, res) => {
        req.flash('success', `Welcome Back!! ${req.user.username}`)
        res.redirect('/seller_products');
});

// Logout the seller from the current session for seller
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged Out Successfully');
    res.redirect('/seller_login');
})



// Get the signup form for User
router.get('/user_register', async (req, res) => {
    res.render('auth/user_signup');
})

router.post('/user_register', async (req, res) => {
    
    try {
        const user = new User({ username: req.body.username, email: req.body.email });
        const newUser = await User.register(user, req.body.password);
        req.flash('success', 'Registered Successfully,Please Login to Continue');
        res.redirect('/user_login');
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/user_register')
    }
});


// Get the login form for User
router.get('/user_login', async (req, res) => {
    
    res.render('auth/user_login')
})

router.post('/user_login',
    passport.authenticate('userLocal',
        {
            failureRedirect: '/user_login',
            failureFlash: true
        }
    ), (req, res) => {
        req.flash('success', `Welcome Back!! ${req.user.username}`)
        res.redirect('/products');
});

// Logout the user from the current session for User 
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged Out Successfully');
    res.redirect('/login');
})


module.exports = router;