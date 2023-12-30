const model = require('../model/admin');
const Admin = model.admin;
const model1 = require('../model/sales');
const Sales = model1.sales;
const model2 = require('../model/customer');
const Customer = model2.customer;
const jwt = require('jsonwebtoken')
require('dotenv').config();
const path = require('path');
const c = require('cookie-parser');
const ejs = require('ejs');

exports.register_a = async (req, res) => {
    const { username, password } = req.body
    if (password.length < 6) {
      return res.status(400).json({ message: "Password less than 6 characters" })
    }
    try {
      await Admin.create({
        username,
        password,
      }).then(admin =>
        res.status(200).json({
          message: "admin successfully created",
          admin,
        })
      )
    } catch (err) {
      res.status(401).json({
        message: "User not successful created",
        error: err.mesage
      })
    }
}

exports.register_s = async (req, res) => {
    const { username, password } = req.body
    if (password.length < 6) {
      return res.status(400).json({ message: "Password less than 6 characters" })
    }
    try {
        const db = await Sales.findOne({username})
        if(!db){
      await Sales.create({
        username,
        password,
      }).then(
        res.redirect('./admin?e=' + encodeURIComponent('user created successfully'))
      )}
      else{
        await Sales.findOneAndUpdate({username},{password},{runValidators:true})
        res.redirect('./admin?e=' + encodeURIComponent('password changed'))
      }
    } catch (err) {
      res.status(401).json({
        message: "User not successful created",
        error: err.mesage
      })
    }
}

exports.register_c = async (req, res) => {
  const { username, password , balance} = req.body
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" })
  }
  try {
      const db = await Customer.findOne({username})
      if(!db){
    await Customer.create({
      username,
      password,
      balance
    }).then(
      res.redirect('./admin?e=' + encodeURIComponent('user created successfully'))
    )}
    else{
      await Customer.findOneAndUpdate({username},{password, balance},{runValidators:true})
      res.redirect('./admin?e=' + encodeURIComponent('balance and password changed'))
    }
  } catch (err) {
    res.status(401).json({
      message: "User not successful created",
      error: err.mesage
    })
  }
}