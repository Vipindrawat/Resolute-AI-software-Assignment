import mongoose from 'mongoose'
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: string,
        required: true
    },
    email: {
        type: string,
        required: true
    },
    password: {
        type: string,
        required: true
    },
    date: {
        type: string,
        default: new Date(Date.now()).toISOString(),
        immutable: true
    }
})

export default mongoose.model("Users",userSchema);