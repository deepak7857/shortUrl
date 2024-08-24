const express=require("express");
const router=express.Router();
const mongoose = require('mongoose');
const {handlenewsorturl,returnshorturl,handelvisit}=require("../controlles/url")
router.post("/",handlenewsorturl);
//router.get(":shortId",returnshorturl);

router.get('/analytics/:shortId', handelvisit)

module.exports=router;