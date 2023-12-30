const express = require("express");
const router = express.Router();
const cont = require("./longin");
const page = require("./pages");
const reg = require("./register")
const cart = require("./cart")
const sales = require("./sales")

router
.get('/admin',cont.adminAuth,page.admin)//pages
.get('/sales',cont.salesAuth,page.sorders)//sales
.get('/items',cont.customerAuth,page.items)
.get('/items/cart',cont.customerAuth,page.cart)
.get('/items/orders',cont.customerAuth,page.orders)
.get('/items/orders/:id',page.order)//PDF generation
.get('/login',page.form)
.get('/logout',cont.logout)
.post('/saleslogin',cont.slogin)//logins
.post('/adminlogin',cont.login)
.post('/customerlogin', cont.clogin)
.post('/registeradmin',cont.adminAuth, reg.register_a)//registration
.post('/registersales',cont.adminAuth, reg.register_s)
.post('/registercustomer',cont.adminAuth, reg.register_c)
.post('/salesa/:id',cont.salesAuth,sales.approve)//sales
.post('/salesr/:id',cont.salesAuth,sales.reject)
.post('/items/cart',cont.customerAuth,cart.addtocart)//cart
.post('/items/cart/getdetails',cont.customerAuth,cart.getdetails)
.post('/items/cart/details',cont.customerAuth,cart.adddetails)
.post('/items/cart/order',cont.customerAuth,cart.order)
.put('/items/cart',cont.customerAuth,cart.puttoitem)
.delete('/items/cart',cont.customerAuth,cart.deletitem)
.get('/',(req,res)=>{res.redirect("/login")})
.get('/:id',(req,res)=>{res.redirect("/login")})
.get('/*',(req,res)=>{res.redirect("/login")})

module.exports = router;