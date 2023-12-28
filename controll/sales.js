const cart = require('../model/cart');
const Cart = cart.cart;
const cd = require('../model/customerdetail');
const Cd = cd.details;
const customer = require('../model/customer');
const Cus = customer.customer;
const order = require('../model/order');
const Order = order.orders;
const moment = require('moment');
const path = require('path');
const {SendmailOfStatus} = require('./mail')
require('dotenv').config();

exports.approve = async (req, res) => {
    const _id = req.params.id
    var fullUrl = req.protocol + '://' + req.get('host') + "/app/items/orders/" +_id;
    const ord = await Order.findOneAndUpdate({_id},{status:"approved",approvedby:req.cookies.user}, { runValidators: true })
    SendmailOfStatus(ord.email, fullUrl, 0)
    res.end()
}

exports.reject = async (req, res) => {
    const _id = req.params.id
    var fullUrl = req.protocol + '://' + req.get('host') + "/app/items/orders/" +_id;
    const ord = await Order.findOneAndUpdate({_id},{status:"rejected",approvedby:req.cookies.user}, { runValidators: true })
    SendmailOfStatus(ord.email, fullUrl, 1)
    const customer = await Cus.findOne({username:{$eq:ord.username}})
    const balance = customer.balance + ord.cartvalue
    await Cus.findOneAndUpdate({username:{$eq:ord.username}}, {balance},{runValidators:true})
    res.end()
}