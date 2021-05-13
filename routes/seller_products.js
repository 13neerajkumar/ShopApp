const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review');
const { isLoggedIn } = require('../middleware');


// Display all the products
router.get('/seller_products',isLoggedIn, async(req, res) => {
    
    try {
        const products=await Product.find({});
        res.render('seller_products/index',{products}); 
    } catch (e) {
        console.log("Something Went Wrong");
        req.flash('error', 'Cannot Find Products');
        res.render('error');
    }
})

// Get the form for new product
router.get('/seller_products/new',isLoggedIn, (req, res) => {

    res.render('seller_products/new');
})


// Create New Product
router.post('/seller_products',isLoggedIn,async(req, res) => {

    try {
        await Product.create(req.body.product);
        req.flash('success', 'Product Created Successfully');
        res.redirect('/seller_products');
    }
    catch (e) {
        console.log(e.message);
        req.flash('error', 'Cannot Create Products,Something is Wrong');
        res.render('error');
    } 
});

// Show particular product
router.get('/seller_products/:id', async(req, res) => {
    try {
        const product=await Product.findById(req.params.id).populate('reviews');
        res.render('seller_products/show', { product});
    }
    catch (e) {
        console.log(e.message);
        req.flash('error', 'Cannot find this Product');
        res.redirect('/error');
    }
})

// Get the edit form
router.get('/seller_products/:id/edit',isLoggedIn,async(req, res) => {

    try {
        const product=await Product.findById(req.params.id);
        res.render('seller_products/edit',{product});
    }
    catch (e) {
        console.log(e.message);
        req.flash('error', 'Cannot Edit this Product');
        res.redirect('/error');
    }
})

// Upadate the particular product
router.patch('/seller_products/:id',isLoggedIn,async(req, res) => {
    
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body.product);
        req.flash('success', 'Updated Successfully!');
        res.redirect(`/seller_products/${req.params.id}`) 
    }
    catch (e) {
        console.log(e.message);
        req.flash('error', 'Cannot update this Product');
        res.redirect('/error');
    }
})


// Delete a particular product
router.delete('/seller_products/:id',isLoggedIn,async (req, res) => {

    try {
        await Product.findByIdAndDelete(req.params.id);
        req.flash('success', 'Deleted the product successfully');
        res.redirect('/seller_products');
    }
    catch (e) {
        console.log(e.message);
        req.flash('error', 'Cannot delete this Product');
        res.redirect('/error');
    }
})






module.exports = router;