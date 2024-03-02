const mongoose = require("mongoose");

async function connectToMongoose(url){
    return mongoose.connect(url, {useNewUrlParser: true});
}

module.exports = {
    connectToMongoose
}