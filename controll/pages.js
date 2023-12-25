const path = require('path'); 
const ejs = require('ejs');
const items = require('../model/items');
const Items = items.items;
const cart = require('../model/cart');
const Cart = cart.cart;
const customer = require('../model/customer');
const Cus = customer.customer;
const order = require('../model/order');
const Order = order.orders;
const { isUndefined } = require('util');
const { use } = require('./router');

exports.form = async (req, res)=>{
    ejs.renderFile(path.resolve(__dirname,"..","pages","loginform.ejs"),{message: ""}, (err, str) => {
        if (err) {
         console.log(err)
        } else {
         res.send(str)
        }
      })
}

exports.admin = async (req, res)=>{
    const user = req.cookies.user
    ejs.renderFile(path.resolve(__dirname,"..","pages","admin.ejs"),{user:user}, (err, str) => {
        if (err) {
         console.log(err)
        } else {
         res.send(str)
        }
    })
}

exports.orders = async (req, res)=>{
    const user = req.cookies.user
    ejs.renderFile(path.resolve(__dirname,"..","pages","orders.ejs"),{user:user}, (err, str) => {
        if (err) {
         console.log(err)
        } else {
         res.send(str)
        }
    })
}

exports.order = async (req, res)=>{
    const order = await Order.findOne({_id:{$eq:req.params.id}})
    ejs.renderFile(path.resolve(__dirname,"..","pages","order.ejs"),{order}, (err, str) => {
        if (err) {
         console.log(err)
        } else {
         res.send(str)
        }
    })
}

exports.items = async (req, res)=>{
    const item_list = await Items.find();
    const username = req.cookies.user
    const user = await Cus.findOne({username:{$eq:username}})
    ejs.renderFile(path.resolve(__dirname,"..","pages","items.ejs"),{items:item_list,user:user}, (err, str) => {
        if (err) {
         console.log(err)
        } else {
         res.send(str)
        }
    })
}

exports.cart = async (req, res)=>{
    const username = req.cookies.user
    const user = await Cus.findOne({username:{$eq:username}})
    const cart_list = await Cart.find({username:{$eq:username}});
    ejs.renderFile(path.resolve(__dirname,"..","pages","cart.ejs"),{items:cart_list,user:user}, (err, str) => {
        if (err) {
         console.log(err)
        } else {
         res.send(str)
        }
    })
}

exports.orders = async (req, res)=>{
    const username = req.cookies.user
    const order_list = await Order.find({username});
    const user = await Cus.findOne({username})
    ejs.renderFile(path.resolve(__dirname,"..","pages","orders.ejs"),{orders:order_list.reverse(),user}, (err, str) => {
        if (err) {
         console.log(err)
        } else {
         res.send(str)
        }
    })
}