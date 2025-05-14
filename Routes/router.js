const express = require('express');
const router = express.Router();
const Users = require('../models/userSchema');
const nodemailer = require('nodemailer');
const ViewerCount = require('../models/viewerCount');



//email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }

});


// register user details
router.post('/register', async (req, res) => {
  const { fname, email, message, subject } = req.body;
  if (!fname || !email || !subject) {
    return res.status(401).json({ status: 401, error: "All input fields are required" });
  }

  try {
    const preUser = await Users.findOne({ email: email });

    if (preUser) {
      preUser.messages.push({ message }); // Add the message to the messages array

      await preUser.save();

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Areeb Ahmed",
        text: "Thank you for contacting! Your response has been submitted and I will get back to you very soon."
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error:", error);
          return res.status(500).json({ status: 500, error: "Error sending email" });
        } else {
          console.log("Email sent:", info.response);
          return res.status(201).json({ status: 201, message: "Email sent successfully", storeData });
        }
      });

      return res.status(201).json({ status: 201, message: "Your response has been submitted again successfully" });
    } else {
      const newUser = new Users({
        fname,
        email,
        subject,
        messages: [{ message }] // Initialize the messages array with the message
      });
      const storeData = await newUser.save();

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Areeb Ahmed",
        text: "Thank you for contacting! Your response has been submitted and I will get back to you very soon."
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error:", error);
          return res.status(500).json({ status: 500, error: "Error sending email" });
        } else {
          console.log("Email sent:", info.response);
          return res.status(201).json({ status: 201, message: "Email sent successfully", storeData });
        }
      });
    }
  } catch (error) {
    console.log("Caught an error:", error);
    return res.status(400).json({ status: 400, error: "All input fields are required" });
  }
});


router.get('/', async (req, res) => {
  try {
      let viewerCount = await ViewerCount.findOne();

      if (!viewerCount) {
          viewerCount = new ViewerCount({ count: 0 });
      }

      viewerCount.count += 1;
      await viewerCount.save();

      res.json({ viewers: viewerCount.count });
  } catch (err) {
      res.status(500).send('Error updating viewer count');
  }
});


router.get('/api/get-count', async (req, res) => {
  try {
    const viewerCount = await ViewerCount.findOne();
    res.json({ viewers: viewerCount ? viewerCount.count : 0 });
  } catch (err) {
    res.status(500).send('Error retrieving viewer count');
  }
});

module.exports = router;