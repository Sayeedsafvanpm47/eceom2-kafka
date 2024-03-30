const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    products: [],
    userId:{
      type:String
    },
    total: {
      type: Number,
      required: true,
    },},
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
