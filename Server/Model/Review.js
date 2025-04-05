const mongoose = require("mongoose")

const ProductReviewSchema = new mongoose.Schema({
    productId : String,
    userId : String,
    userName : String,
    reviewMessage : String,
    reviewValue: Number,


}, {timeStamps : true});

module.exports = mongoose.model("Review", ProductReviewSchema)