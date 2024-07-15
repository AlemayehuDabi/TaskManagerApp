const express = require("express");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createToken } = require("../util/Token");
const nodemalier = require("nodemailer");

// sign-up controller
const signUp = async (req, res) => {
  try {
    let { email, username, password, pic } = req.body;

    // check if email entered
    if (!email) {
      return res.status(400).json({ error: true, msg: "Email is required" });
    }

    // check if name entered
    if (!username) {
      return res.status(400).json({ error: true, msg: "Username is required" });
    }

    // password checked
    if (!password) {
      return res.status(400).json({
        error: true,
        msg: "password is required",
      });
    }
    // email exist check in the db
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .json({ error: true, msg: "Email is already taken." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      pic,
    });

    const token = createToken(user._id, "5h");

    return res.json({
      error: false,
      user,
      token: token,
      msg: "successfully registered",
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
};

// login controller
const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // check email and password requirment
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: true, msg: "Username and password are required" });
    }

    // find email
    const user = await User.findOne({ email });

    // user validation
    if (!user) {
      return res.status(400).json({ error: true, msg: "User is NOT found" });
    } else {
      const validePassword = await bcrypt.compare(password, user.password);

      if (!validePassword) {
        return res
          .status(400)
          .json({ error: true, msg: "Invalid credinational" });
      }

      const token = createToken(user._id, "1W");

      return res.json({
        error: false,
        msg: "Login sccussfully",
        token: token,
        user: {
          username: user.username,
          email: user.email,
          pic: user.pic,
          createdOn: user.createdOn,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
};

// get User

const getUser = async (req, res) => {
  const user = req.user;

  try {
    const isUser = await User.findOne({ _id: user._id });

    if (!isUser) {
      return res.sendStatus(401);
    }

    return res.json({
      error: false,
      user: {
        username: isUser.username,
        email: isUser.email,
        pic: isUser.pic,
        createdOn: isUser.createdOn,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: "Server Error",
    });
  }
};

// update personal information

const updatePersonalInfo = async (req, res) => {
  const user = req.user;
  const { username, email, oldPassword, password } = req.body;

  try {
    if (!username && !email && !password) {
      return res.status(400).json({
        error: true,
        msg: "No changes",
      });
    }

    if (!oldPassword) {
      return res.status(400).json({
        error: true,
        msg: "Enter your old password",
      });
    }

    const getUser = await User.findById(user._id);

    if (!getUser) {
      return res.status(400).json({
        error: true,
        msg: "User not found",
      });
    }

    const checkPassword = await bcrypt.compare(oldPassword, getUser.password);

    if (!checkPassword) {
      return res.status(400).json({
        error: true,
        msg: "Credential does NOT match!",
      });
    }

    const updateInfo = {};

    if (username) updateInfo.username = username;

    if (email) updateInfo.email = email;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateInfo.password = hashedPassword;
    }

    const updatePerInfo = await User.findByIdAndUpdate(user._id, updateInfo, {
      new: true,
    });

    if (!updatePerInfo) {
      return res.status(400).json({
        error: true,
        msg: "user NOT found and credential wasn't updated",
      });
    }

    return res.json({
      error: false,
      msg: "Successfuly update personal informations",
      updatePerInfo,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
};

// forgot password and send an email
const forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: true, msg: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: true, msg: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "10m",
    });

    const transporter = nodemalier.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "alemayehudabi606@gmail.com",
      to: email,
      subject: "Reset password",
      text: `http://localhost:5173/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res
          .status(500)
          .json({ error: true, msg: "Email sending problem" });
      } else {
        return res.json({
          error: false,
          msg: "Email sent",
          forgot: "sent-token",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: true, msg: "Server error" });
  }
};

// reset password

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.KEY);

    const id = decoded.id;

    if (!id) {
      return res.status(400).json({ error: true, msg: "Invalid token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(id, { password: hashedPassword });

    return res.json({
      error: false,
      msg: "Password updated",
      reset: "success",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, msg: "Invalid token or server error" });
  }
};

module.exports = {
  signUp,
  login,
  getUser,
  updatePersonalInfo,
  forgotPassword,
  resetPassword,
};
