const Appoint = require("../models/appointmentModel");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
const appointmentControl = {
  async createAppointment(req, res) {
    try {
      const { firstName, lastName, email, phone, date } = req.body;
      if (!firstName || !lastName || !email || !phone) {
        res.status(401).json({ message: " All fields are required ! " });
      }
      const exist = await Appoint.findOne({ email });
      if (exist) {
        res.status(401).json({ message: " Already book! " });
      }
      const token = req.token;
      console.log("token in appoint :" + token.exist._id);

      const oldDate = await Appoint.findOne({ date });
      if (oldDate) {
        res.status(401).json({ message: " Slot not avail ! " });
      }
      if (token) {
        const newAppointment = new Appoint({
          firstName,
          lastName,
          email,
          phone,
          date,
          serviceProvider: token.exist._id,
        });

        await newAppointment.save();

        console.log(newAppointment);
        const message = await transporter.sendMail({
          from: "BeauticianApp@gmail.com", // sender address
          to: `${email}`, // list of receivers
          subject: `Hello Mr/Mrs . ${firstName} `, // Subject line
          text: "Hello  ${firstName}", // plain text body
          html: `<b>Your appointment fixed at ${date} with Beautician ${token.exist.worker} with service of ${token.exist.workerId}</b>`, // html body
        });
        res.status(200).json({ newAppointment });
      }
    } catch (error) {
      res.status(500).json({ message: `${error}` });
    }
  },
};

module.exports = appointmentControl;

