const cart = require('../model/cart');
const Cart = cart.cart;
const cd = require('../model/customerdetail');
const Cd = cd.details;

exports.addtocart = async (req, res) => {
    const  data = req.body
    var mess = ""
    try {
        const {id,title,username,quantity,price} = data;
        const db = await Cart.findOne({username,id})
        var mess
        if(!db){
            await Cart.create({id,title,username,quantity,price})
            var mess = "added to the cart"
        }
        else{
            let doc = await Cart.findOneAndUpdate({username,id},{quantity:db.quantity+quantity})
            doc = await Cart.findOne({username,id})
            var mess = "updated Quantity "+doc.quantity
        }
        res.status(200).json({
            message: mess
        })
    } catch (err) {
      res.status(401).json({
        message: "Item not added",
        error: err.mesage
      })
    }
}

exports.puttoitem = async (req, res) => {
    const  data = req.body
    try {
        const {id,username,quantity} = data;
        await Cart.findOneAndUpdate({username,id},{quantity})
        res.send()
    } catch (err) {
      res.status(401).json({
        message: "something went wrong",
        error: err.mesage
      })
    }
}

exports.deletitem = async (req, res) => {
    const  data = req.body
    try {
        const {id,username} = data;
        await Cart.findOneAndDelete({username,id})
        res.send()
    } catch (err) {
      res.status(401).json({
        message: "something went wrong",
        error: err.mesage
      })
    }
}

exports.adddetails = async (req, res) => {
  const  data = req.body
  try {
      const {username,email,phone} = data;
      const db = await Cd.findOne({username})
      var mess
      if(!db){
          await Cd.create({username,email,phone})
          var mess = "Order Placed And Details Added"
      }
      else{
          await Cd.findOneAndUpdate({username},{email,phone},{ runValidators: true })
          var mess = "Order Placed And Details Updated"
      }
      res.status(200).json({
          message: mess
      })
  } catch (err) {
    res.status(401).json({
      message: "Something Went Wrong",
      error: err.mesage
    })
  }
}

exports.getdetails = async (req, res) => {
  const  data = req.body
  try {
      const {username} = data;
      const db = await Cd.findOne({username})
      var mess
      if(!db){
          var mess = {email:"",phone:""}
      }
      else{
          var mess = {email:db.email,phone:db.phone}
      }
      res.status(200).json({
          message: mess
      })
  } catch (err) {
    res.status(401).json({
      message: "something went wrong",
      error: err.mesage
    })
  }
}