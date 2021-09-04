import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    username: string;
    password: string;
    email: string;
    date: Date;
};

export interface INote extends mongoose.Document {
    title: string;
    preview: string;
    content: string;
    date: Date;
    user: mongoose.Schema.Types.ObjectId;
};