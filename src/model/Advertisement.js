import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const Advertisement = new Schema({
    shortText: { type: String, required: true },
    description: String,
    images: [String],
    userId: { type: ObjectId, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    tags: [String],
    isDeleted: Boolean,
});

export const AdvertisementModel = model('Advertisement', Advertisement);
