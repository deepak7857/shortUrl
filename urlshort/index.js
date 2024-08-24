const express=require("express");
const app=express();
const urlRouter =require("./routes/url");
const {connectToMongo}=require("./connect");
const Url="mongodb://127.0.0.1:27017/short-url";
const URL=require("./models/db")
const port=8000;

app.use(express.json());
connectToMongo(Url, (err, db) => {
  if (err) {
      console.error(err);
  }
}).then(() => {
  console.log("Connected to MongoDB");
})

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId : shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});




app.use("/url",urlRouter);
app.listen(port,()=>{
  console.log(`server started on port ${port}`);
})