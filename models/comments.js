const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comment = new Schema({
    comment:String,
    sender:String,
    title:String,
    date:{type:Date, default:Date.now()}
});

const commentModels = mongoose.model("comment", comment);

module.exports = commentModels;