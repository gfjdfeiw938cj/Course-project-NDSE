import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const { ObjectId } = Schema;

export const Message = new Schema({
    author: { type: ObjectId, required: true },
    sentAt: { type: Date, required: true },
    text: { type: String, required: true },
    readAt: Date,
});

export const MessageModel = model('Message', Message);
