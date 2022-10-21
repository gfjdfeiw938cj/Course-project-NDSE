import mongoose from 'mongoose';
import { Message } from './Message.js';

const { Schema, model } = mongoose;
const { ObjectId } = Schema;


const Chat = new Schema({
    users: { type: [ObjectId, ObjectId], required: true },
    createdAt: { type: Date, required: true },
    messages:  [Message],
});

export const ChatModel = model('Chat', Chat);
