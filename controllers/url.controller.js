const URL = require("../models/url.model");
const shortid = require("shortid");
const { shortId } = require("shortid");
module.exports = {
  handleGenerateUrlShortner,
};

async function handleGenerateUrlShortner(req, res) {
  const body = req.body;
  try {
    if (!body.URL) {
      return res.status(404).json({ message: "No url provided" });
    }
    const shortId = shortid(8); // generate a random id of length
    await URL.create({
      shortId: shortId,
      redirectUrl: body.URL,
      visitHistory: [],
    });
    return res.status(200).json({ id: shortId });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
}
