const mongoose=require('mongoose');
const Schema=mongoose.Schema;

module.exports=mongoose.model('Movie',new Schema({
  title:String,
  description:String,
  answers:[String],
  userId:Schema.ObjectId
}));
