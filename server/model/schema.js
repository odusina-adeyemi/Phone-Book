const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({

// _id: { type: String, required: true },

  name: {
    type: String,
    required: true,
  },

  address: {type:String,
    required: false
  },

  email: {
    type: String,
    required: true,
  },

  number: {
    type: Number,
    required: true,
  },

   image: Buffer,

   imageType: {
    type: String
   }
},

{timestamps: true}

);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
