const order = require('../model/order');
const ejs = require('ejs')
const Order = order.orders;
const path = require('path');
const pdf = require('html-pdf');
const nodemailer = require('nodemailer')
require('dotenv').config();

exports.convertUrlToPdf = async (url, e, _id) => {
    const order = await Order.findOne({ _id });
    const obj = (process.env.NODE_ENV == "production") ? {order, opt:true} : {order, opt:false}
    ejs.renderFile(path.resolve(__dirname, "..", "pages", "order.ejs"), obj, (err, str) => {    
        if (err) {
            console.log(err);
        } else {        
            var options = {
                format: 'A4', childProcessOptions: {
                    env: {
                        OPENSSL_CONF: '/dev/null',
                    },
                }
            }
            pdf.create(str, options).toBuffer(function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    Sendmailto(e, url, data);                
                }
            });
        }
    })

}

async function Sendmailto(y, url, pdfBuffer) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });
    const options = {
        from: process.env.USER, // sender address
        to: y, // receiver email
        subject: "Order Confirmation", // Subject line
        html: "<p>We have received and are processing your order. You will receive notification when the status is updated. The status is still pending. by logging into your account, you can also review your order history or <a href=" + url + ">Click here</a> to review this order process. The mail has the order invoice attached.</p>",
        attachments: [
            {
                filename: 'Invoice.pdf',
                content: pdfBuffer,
                encoding: 'base64',
            }]
    }
    await transporter.sendMail(options)
}

exports.SendmailOfStatus = async (y, url, i) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });
    const messages = ["<p>We pleased to inform you that your order has been <b>Approved</b>. please feel free to reach out to our customer support. You can also log into your account to review the details or <a href='" + url + "'>click here</a>.</p><p>Thank you for choosing us!</p>",
    "<p>We regret to inform you that your order has been <b>rejected</b>. If you have any questions or concerns regarding the rejection, please feel free to reach out to our customer support. You can also log into your account to review the details or <a href='" + url + "'>click here</a>.<p>The amount paid for the order will be refunded to your account balance.</p></p><p>Thank you for your understanding.</p>"
    ]
    const options = {
        from: process.env.USER, // sender address
        to: y, // receiver email
        subject: "Order Status", // Subject line
        html: messages[i],
    }
    await transporter.sendMail(options)
}