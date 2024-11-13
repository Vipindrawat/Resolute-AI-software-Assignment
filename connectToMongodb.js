import mongoose from 'mongoose';
const connectToMongoDb = () => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("connected to mongodb");
    }).catch((error) => {
        console.log("connection error :", error);
    })
}

export default connectToMongoDb;