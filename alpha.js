const mongoose = require('mongoose');
let alp = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    alphabet:String,
});
module.exports=mongoose.model('alphabet', alp);