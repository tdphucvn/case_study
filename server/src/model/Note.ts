import mongoose, { Schema, model } from 'mongoose';
import { INote } from '../types/interfaces';

const noteSchema: Schema = new mongoose.Schema({
    // Title that is displayed on the side panel
    title: {
        type: String,
        required: true,
    },
    // Preview text that is displayed on the side panel
    preview: {
        type: String,
        required: true,
    },
    // Formated text of the note
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    // reference to the owner of the certain note
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
});  

export default model<INote>('note', noteSchema);