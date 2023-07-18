const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const roleSchema = new mongoose.Schema({
  rolename: {
    type: String,
    required: true,
    unique: true,
  },
  jobsPermission: [
    {
      type: String,
    },
  ],
  servicePermission: [
    {
      type: String,
    },
  ],
  vendorPermission: [
    {
      type: String,
    },
  ],

  adminPermission: [
    {
      type: String,
    },
  ],
  rolePermission: [
    {
      type: String,
    },
  ],
  jobs: [
    {
      type: String,
    },
  ],
  services: [
    {
      type: String,
    },
  ],
  vendors: [
    {
      type: String,
    },
  ],
  departments: [
    {
      type: String,
      required: true,
    },
  ],
  schedule: [
    {
      type: String,
    },
  ],
  start: [
    {
      type: String,
    },
  ],
  close: [
    {
      type: String,
    },
  ],
  audit: [
    {
      type: String,
    },
  ],
  finished: [
    {
      type: String,
    },
  ],
  announcement: [
    {
      type: String,
    },
  ],
});
const Role = mongoose.model("Role", roleSchema);
module.exports = { Role };
