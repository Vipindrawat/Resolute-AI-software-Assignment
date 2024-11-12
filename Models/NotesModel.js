const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const NotesSchema = new Schema({
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
    tag: {
        type: string,
        default: "xyz"
    },
    date: {
        type: string,
        default: new Date(Date.now()).toISOString(),
        immutable: true
    }
})
module.exports = mongoose.model('notes', NotesSchema);