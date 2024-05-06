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
const sales = require('../model/sales');
const Sales = sales.sales;
require('dotenv').config();

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
    const ol = await Order.find();
    const s = await Sales.find();
    const c = await Cus.find();
    const {xlab, ylab, bar0xlab, bar0ylab, datemap} = await cusdata(ol);
    ejs.renderFile(path.resolve(__dirname,"..","pages","admin.ejs"),{user,xlab,ylab,bar0xlab,bar0ylab, datemap,s,c}, (err, str) => {
        if (err) {
         console.log(err)
        } else {
         res.send(str)
        }
    })
}

exports.sorders = async (req, res)=>{
    const username = req.cookies.user
    const order_list = await Order.find({status:"pending"}).sort({date:-1});
    const users =  await Order.distinct("username");
    ejs.renderFile(path.resolve(__dirname,"..","pages","sorders.ejs"),{users,username,orders:order_list}, (err, str) => {
        if (err) {
         console.log(err)
        } else {
         res.send(str)
        }
    })
}
//single order for generating pdf
exports.order = async (req, res)=>{
    const order = await Order.findOne({_id:{$eq:req.params.id}})
    ejs.renderFile(path.resolve(__dirname,"..","pages","order.ejs"),{order, opt:false}, (err, str) => {
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
    const user = await Cus.findOne({username})
    ejs.renderFile(path.resolve(__dirname,"..","pages","items.ejs"),{items:item_list,user}, (err, str) => {
        if (err) {
         console.log(err)
        } else {
         res.send(str)
        }
    })
}

exports.cart = async (req, res)=>{
    const username = req.cookies.user
    const user = await Cus.findOne({username})
    const cart_list = await Cart.find({username});
    ejs.renderFile(path.resolve(__dirname,"..","pages","cart.ejs"),{items:cart_list,user, vercelurl: process.env.VERCEL_URL }, (err, str) => {
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


async function cusdata(ol){
    ol = ol.filter(object => object.status == "approved");
    const totalPricePerProductMap = new Map();
    const totalPricePerProductMap0 = new Map();
    const totalPricePerProductMap1 = new Map();

    ol.forEach(order => {
      const { orderlist, username , date} = order;
      let newdate = date.toString().split(" ");
      newdate = newdate[1]+"-"+newdate[2]+"-"+newdate[3]

      orderlist.forEach(item => {
        const {title, quantity, price } = item;
  
        const totalPrice = quantity * price;

        if (totalPricePerProductMap.has(username)) {
          totalPricePerProductMap.set(
            username,
            totalPricePerProductMap.get(username) + totalPrice
          );
        } else {
          totalPricePerProductMap.set(username, totalPrice);
        }

        if (totalPricePerProductMap0.has(title)) {
            totalPricePerProductMap0.set(
              title,
              totalPricePerProductMap0.get(title) + totalPrice
            );
          } else {
            totalPricePerProductMap0.set(title, totalPrice);
          }

          if (totalPricePerProductMap1.has(newdate)) {
            totalPricePerProductMap1.set(
              newdate,
              totalPricePerProductMap1.get(newdate) + totalPrice
            );
          } else {
            totalPricePerProductMap1.set(newdate, totalPrice);
          }
      });
    });
    const xlab = Array.from(totalPricePerProductMap0.keys())
    const ylab = Array.from(totalPricePerProductMap0.values())
    const bar0xlab = Array.from(totalPricePerProductMap.keys()).reverse()
    const bar0ylab = Array.from(totalPricePerProductMap.values()).reverse()
    const datemap = Array.from(totalPricePerProductMap1)
    return {xlab, ylab,bar0xlab, bar0ylab, datemap};
}
