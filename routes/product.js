const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review');
const { isLoggedIn } = require('../middleware');


// Display all the products
router.get('/products', async(req, res) => {
    
    try {
        const products=await Product.find({});
        res.render('products/index',{products}); 
    } catch (e) {
        console.log("Something Went Wrong");
        req.flash('error', 'Cannot Find Products');
        res.render('error');
    }
})



// Show particular product
router.get('/products/:id', async(req, res) => {
    try {
        const product=await Product.findById(req.params.id).populate('reviews');
        res.render('products/show', { product});
    }
    catch (e) {
        console.log(e.message);
        req.flash('error', 'Cannot find this Product');
        res.redirect('/error');
    }
})



// Creating a New Comment on a Product

router.post('/products/:id/review',isLoggedIn,async (req, res) => {
    
    try {
        const product = await Product.findById(req.params.id);


        const review = new Review({
            user: req.user.username,
            ...req.body
        });

        product.reviews.push(review);

        await review.save();
        await product.save();

        req.flash('success','Successfully added your review!')
        res.redirect(`/products/${req.params.id}`);
    }
    catch (e) {
        console.log(e.message);
        req.flash('error', 'Cannot add review to this Product');
        res.redirect('/error');
    }
    
})


router.get('/error', (req, res) => {
    res.status(404).render('error');
})


module.exports = router;