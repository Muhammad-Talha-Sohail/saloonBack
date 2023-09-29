const Worker = require("../models/workerSchema");
const Jimp = require("jimp");
const path = require("path");
const jwt = require("../jwt/jwt");
const workerControl = {
  async createWorker(req, res) {
    try {
      const { worker, workId, Image, price } = req.body;
      if (!worker || !workId || !Image || !price) {
        return res.status(401).json({ message: "All fields are required !" });
      }

      const exist = await Worker.findOne({ workId });

      if (exist) {
        return res.status(401).json({ message: "Service Already exist" });
      }

      const buffer = Buffer.from(
        Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
        "base64"
      );
      const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
      const jimResp = await Jimp.read(buffer);
      jimResp
        .resize(150, Jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/${imagePath}`));

      const newWorker = new Worker({
        worker,
        workId,
        Image: `http://localhost:5000/storage/${imagePath}`,
        price,
      });

      await newWorker.save();
      res.status(200).json({ newWorker });
    } catch (error) {
      res.status(500).json({ message: "Could not process the image" });
      console.log(error);
    }
  },


  async createToken(req, res) {
    const { workId } = req.body;
    const exist = await Worker.findOne({ workId });
    
    if (!exist) {
      return res.status(401).json({ message: " No exist !" });
    }
    const token = await jwt.sign({ exist });
    if (!token) {
      return res.status(401).json({ message: " No token generate !" });
    }

    return res.status(200).json({ exist, token });
  },


  async getWorker(req, res) {
    try {
      const data = req.token;
// console.log(data)
    if (data) {
      return res.status(200).json({ data });
    }
    } catch (error) {
     console.log(error) 
    }
  },
};

module.exports = workerControl;
