import mongoose from 'mongoose'
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: new Date(Date.now()).toISOString(),
        immutable: true
    }
})

export default mongoose.model("Users",userSchema);