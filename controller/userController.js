const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('../jwt/jwt')
const userControl = {
  async createUser(req, res) {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (!name || !email || !password || !confirmPassword) {
        res.status(401).json(" All fields are required !");
      }
      const exist = await User.findOne({ email });
      if (exist) {
      return  res.status(401).json(" Email already exist here !");
      }
      if (password !== confirmPassword) {
      return  res.status(401).json(" Incorrect Password or Confirm Password !");
      }

      const hashPaswd = await bcrypt.hash(password, 10);
      console.log(hashPaswd);
      const newUser = new User({
        name,
        email,
        password:hashPaswd,
      });
      await newUser.save();
      console.log(newUser);
      const token = jwt.sign({newUser})
     return res.status(200).json({token});
    } catch (error) {
    return  res.status(500).json({ message: `${error}` });
    }
  },
  async getUser(req,res)
  {
   
 const data = req.token;

    if(data)
    {return res.status(200).json({data})}


  }
};

module.exports = userControl;
