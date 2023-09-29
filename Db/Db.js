const mongoose = require("mongoose");

const conDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });

    console.log(" Data base connected sucessfully ! ");
  } catch (error) {
    console.log(`Error in connect Db : ${error}`);
  }
};

module.exports = conDb;