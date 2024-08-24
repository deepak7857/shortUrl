const mongoose=require("mongoose");
const urlschema=new mongoose.Schema({
shortId:{
  type:String,
  required:true,
  unique: true,
},
redirectUrl :{
  type:String,
  required:true
},
visited :[{timestamp:{type:Number}}],
},
 { timestamps:true,}

);

const url=mongoose.model("url",urlschema);

module.exports=url;