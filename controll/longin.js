const model = require('../model/admin');
const Admin = model.admin;
const smodel = require('../model/sales');
const Sales = smodel.sales;
const cmodel = require('../model/customer');
const Customer = cmodel.customer;
const jwt = require('jsonwebtoken')
require('dotenv').config();
const path = require('path');
const c = require('cookie-parser');
const ejs = require('ejs')


exports.login = async (req, res) => {
  const { username, password } = req.body
  // Check if username and password is provided
  if (!username || !password) {
    ejs.renderFile(path.resolve(__dirname,"..","pages","loginform.ejs"),{ message: "Username or Password not present" }, (err, str) => {
      if (err) {
       console.log(err)
      } else {
       res.send(str)
      }
    })
  }
    try {
      const adminobj = await Admin.findOne({ username, password })
      if (!adminobj) {
        ejs.renderFile(path.resolve(__dirname,"..","pages","loginform.ejs"),{ message: "Login not successful, User not found" }, (err, str) => {
          if (err) {
           console.log(err)
          } else {
           res.send(str)
          }
        })
      } else {
        const maxAge = 72 * 60 * 60;
        const token = jwt.sign(
          { id: adminobj._id, username},
          process.env.HEX,
          {
            expiresIn: maxAge, // 3hrs in sec
          });
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, 
        });
        res.cookie("user", username, {
          httpOnly: true,
          maxAge: maxAge * 1000, 
        });
        res.redirect('./admin');
      }
    } catch (error) {
      res.status(400).json({
        message: "An error occurred",
        error: error.message,
      })
    }
}

exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" })
  res.cookie("jwts", "", { maxAge: "1" })
  res.cookie("user", "", { maxAge: "1" })
  res.redirect("./login")
}



exports.adminAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.HEX, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" })
      } else {
        next()
      }
    })
  } else {
    ejs.renderFile(path.resolve(__dirname,"..","pages","loginform.ejs"),{ message: "Not authorized" }, (err, str) => {
      if (err) {
       console.log(err)
      } else {
       res.send(str)
      }
    })
  }
}



// sales login

exports.slogin = async (req, res) => {
  const { username, password } = req.body
  // Check if username and password is provided
  if (!username || !password) {
    ejs.renderFile(path.resolve(__dirname,"..","pages","loginform.ejs"),{ message: "Username or Password not present" }, (err, str) => {
      if (err) {
       console.log(err)
      } else {
       res.send(str)
      }
    })
  }
    try {
      const salesobj = await Sales.findOne({ username, password })
      if (!salesobj) {
        ejs.renderFile(path.resolve(__dirname,"..","pages","loginform.ejs"),{ message: "Login not successful, User not found" }, (err, str) => {
          if (err) {
           console.log(err)
          } else {
           res.send(str)
          }
        })
      } else {
        const maxAge = 72 * 60 * 60;
        const token = jwt.sign(
          { id: salesobj._id, username},
          process.env.HEXS,
          {
            expiresIn: maxAge, // 3hrs in sec
          });
        res.cookie("jwts", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        });
        res.cookie("user", username, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        });
        res.redirect('./sales');
      }
    } catch (error) {
      res.status(400).json({
        message: "An error occurred",
        error: error.message,
      })
    }
}


exports.salesAuth = (req, res, next) => {
  const token = req.cookies.jwts
  if (token) {
    jwt.verify(token, process.env.HEXS, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" })
      } else {
        next()
      }
    })
  } else {
    ejs.renderFile(path.resolve(__dirname,"..","pages","loginform.ejs"),{ message: "Not authorized" }, (err, str) => {
      if (err) {
       console.log(err)
      } else {
       res.send(str)
      }
    })
  }
}


// customer login

exports.clogin = async (req, res) => {
  const { username, password } = req.body
  // Check if username and password is provided
  if (!username || !password) {
    ejs.renderFile(path.resolve(__dirname,"..","pages","loginform.ejs"),{ message: "Username or Password not present" }, (err, str) => {
      if (err) {
       console.log(err)
      } else {
       res.send(str)
      }
    })
  }
    try {
      const custobj = await Customer.findOne({ username, password })
      if (!custobj) {
        ejs.renderFile(path.resolve(__dirname,"..","pages","loginform.ejs"),{ message: "Login not successful, User not found" }, (err, str) => {
          if (err) {
           console.log(err)
          } else {
           res.send(str)
          }
        })
      } else {
        const maxAge = 72 * 60 * 60;
        const token = jwt.sign(
          { id: custobj._id, username},
          process.env.HEXC,
          {
            expiresIn: maxAge, // 3hrs in sec
          });
        res.cookie("jwtc", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        });
        res.cookie("user", username, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        });
        res.redirect('./items');
      }
    } catch (error) {
      res.status(400).json({
        message: "An error occurred",
        error: error.message,
      })
    }
}


exports.customerAuth = (req, res, next) => {
  
  const token = req.cookies.jwtc
  if (token) {
    jwt.verify(token, process.env.HEXC, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" })
      } else {
        next()
      }
    })
  } else {
    ejs.renderFile(path.resolve(__dirname,"..","pages","loginform.ejs"),{ message: "Not authorized" }, (err, str) => {
      if (err) {
       console.log(err)
      } else {
       res.send(str)
      }
    })
  }
}