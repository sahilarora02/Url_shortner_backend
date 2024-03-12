const express = require("express");
require("dotenv").config();
const app = express();
const URL = require("./models/url.model");
const UrlRoute = require("./routes/url.route");
const { connectToMongoose } = require("./connect");
const PORT = 8001;
const cors = require("cors")

connectToMongoose(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.use(express.json());

app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
  next();
});


app.use(cors({
  origin: 'https://web-url-shortner.netlify.app',
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type'] 
}));

app.use("/url", UrlRoute);
app.use("/:shortid", async (req, res) => {
  const shortId = req.params.shortid;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timeStamp: Date.now() } } }
  );
  console.log(entry);
  res.setHeader('Access-Control-Allow-Origin', 'https://web-url-shortner.netlify.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));
