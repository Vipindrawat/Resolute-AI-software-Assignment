import mongoose from 'mongoose';
const Schema = mongoose.Schema();

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: string,
        required: true
    },
    description: {
        type: string,
        required: true
    },
    content: {
        type: string,
        required: true
    },
    date: {
        type: string,
        default: new Date(Date.now()).toISOString(),
        immutable: true
    }
})
export default mongoose.model('notes', NotesSchema);