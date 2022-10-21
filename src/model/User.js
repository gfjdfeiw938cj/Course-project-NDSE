import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const User = new Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    contactPhone: String,
});

export const UserModel = model('User', User);
