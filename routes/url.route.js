const express = require("express");
const router = express.Router();
const Url_Controller = require("../controllers/url.controller");

router.post('/', Url_Controller.handleGenerateUrlShortner);

module.exports = router;