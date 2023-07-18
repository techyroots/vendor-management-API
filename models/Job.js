const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
mongoose.Promise = global.Promise;


const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
    unique: true, // Make the uniqueId field unique
  },
  departments: [{
    type: String,
    required: true
  }],
  client: {
    type: String,
    
  },
  hqphone: {
    type: String,
 
  },
  hqemail: {
    type: String,
    lowercase: true,
    trim: true,
   
  },
  sitename: {
    type: String,
    required: true,
  },
  managerphone: {
    type: String,
    required: true,
  },
  clientemail: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  service: [{
    type: ObjectId,
    ref: "Product",
    required: true,
  }],
  quantity: {
    type: Map,
    of: Number,
    required: true
  },
  vendorprice: {
    type: Map,
    of: Number,
    required: true
  },
  customservice: [{
    id: Number,
    name: String,
    vendorprice: Number,
    quantity: Number,
    unit: String
  }],
  location: {
    type: String,
    required: true
  },
  vendorname: {
    type: String,
  },
  budget: {
    type: Number,
  },
  status: {
    type: String,
    default: "requirement received",
  },
  remarks: {
    type: String
  },
  startdate: {
    type: String
  },
  enddate: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now,
  },
  advancePayment:{
    type:Number,
  }
  ,
  image: {
    type: String, // Assuming you store the image file as a string
  },
});
jobSchema.pre("save", async function (next) {
  try {
    // Generate unique ID based on the document's field values
    const initials = `${this.title.charAt(0)}${this.client.charAt(0)}`;
    const randomNumber = Math.floor(Math.random() * 10000);
    this.uniqueId = `${initials}${randomNumber}`;

    next();
  } catch (error) {
    next(error);
  }
});

const Job = mongoose.model("Job", jobSchema);

module.exports = { Job };
