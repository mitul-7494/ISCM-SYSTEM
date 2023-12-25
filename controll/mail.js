const puppeteer = require('puppeteer');
const path = require('path');
const nodemailer = require('nodemailer')
const {unlink} = require('node:fs')
require('dotenv').config();

exports.convertUrlToPdf = async (url, outputFilePath, i, e) => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.pdf({ path: outputFilePath, format: 'A4' });
    await browser.close();
    Sendmailto(i, e, url);
  }
  
  async function Sendmailto(x, y, url) {
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
    const pdf = path.resolve(__dirname,"..","public", x+".pdf")
    const options = {
      from: process.env.USER, // sender address
      to: y, // receiver email
      subject: "Order Confirmation", // Subject line
      html: "<p>We have received and are processing your order. You will receive notification when the status is updated. The status is still pending. by logging into your account, you can also review your order history or <a href="+url+">Click here</a> to review this order process. The mail has the order invoice attached.</p>",
      attachments: [
        {
          filename: 'Invoice.pdf',
          path:pdf
        }]
    }
    await transporter.sendMail(options)
    unlink(pdf, (err) => {})
  }