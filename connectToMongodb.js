const mongoose = require('mongoose');
const connnetToMongoDb = () => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("connected to mongodb");
    }).catch((error) => {
        console.log("connection error :", error);
    })
}

module.exports = connnetToMongoDb;