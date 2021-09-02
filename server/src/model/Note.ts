import mongoose, { Schema, model } from 'mongoose';
import { INote } from '../types/interfaces';

const noteSchema: Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    favourite: {
        type: Boolean,
        default: false,
    }
});  

export default model<INote>('note', noteSchema);