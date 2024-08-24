const shortid=require("shortid");
const db=require("../models/db");

async function handlenewsorturl(req,res) {
  const body=req.body;
  if(!body.url){
    return res.status(400).json({message:"url required"});
  }
  const shortID=shortid();
  await db.create({
  shortId:shortID,
  redirectUrl: body.url,
  visited :[]
  })
   return res.status(201).json({id:shortID});

  
  
}
/*
async function returnshorturl(req,res) {
  const shortId = req.params.shortId;
  const entry = await db.findOneAndUpdate(
    {
      shortId : shortId,
    },
    {
      $push: {
        visited: {
          timestamp: Date.now(),
        },
      },
    }
  );
   return res.redirect(entry.redirectUrl);
  
}*/
async function handelvisit(req,res) {
  const shortId=req.params.shortId;
  const result=await db.findOne({shortId:shortId})
  console.log(result);
  return res.json({
    totalClicks:result.visited.length,
    analytics: result.visited
  })
}

module.exports={
  handlenewsorturl,
 //returnshorturl,
  handelvisit,
}