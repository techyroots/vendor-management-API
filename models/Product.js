const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const productSchema = new mongoose.Schema({
  enabled: {
    type: Boolean,
    default: true,
  },
  departments: [{
    type: String,
    required: true
  }],
  productName: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  unit: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    // required: true
  },
  price: {
    type: Number,
  },
  vendorPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending"
  },
  uniqueId : {
    type:String,
    // required:true,
    unique:true,
  },
});

productSchema.pre("save", async function (next) {
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
const Product = mongoose.model("Product", productSchema);
module.exports = {Product};
