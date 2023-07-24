const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const vendorSchema = new mongoose.Schema({
  enabled: {
    type: Boolean,
    default: true,
  },
  departments: [{
    type: String,
    required: true
  }],
  uniqueId : {
    type:String,
    // required:true,
    unique:true,
  },
  service: [{
    type: String,
    required: true,
  }],
  vendorname: {
    type: String,
    trim: true,
    required: true,
  },
  surname: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  alternatephone:
  {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true
  },

  pincode: {
    type: Number,
    required: true,
  },
  adhaarnumber:
  {
    type: Number,
    required: true,
  },
  pannumber:
  {
    type: String,
    required: true,
  },
  holdername:
  {
    type: String,
    required: true,
  },

  // customField: [
  //   {
  //     bankname: {
  //       type: String,
  //       trim: true,
  //     },
  //     branchname: {
  //       type: String,
  //       trim: true,
  //     },
  //   },
  // ],

  account:
  {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "available"
  },

});
vendorSchema.pre("save", async function (next) {
  try {
    // Generate unique ID based on the document's field values
    const initials = `${this.surname.charAt(0)}${this.vendorname.charAt(0)}`;
    const randomNumber = Math.floor(Math.random() * 10000);
    this.uniqueId = `${initials}${randomNumber}`;

    next();
  } catch (error) {
    next(error);
  }
});

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = {Vendor};
