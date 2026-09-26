import { Schema, model } from 'mongoose';

const memorySchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },

  {
    collection: 'mementos_collection',
    versionKey: false,
    timestamps: true,
  },
);

const Memory = model('Memory', memorySchema);
export default Memory;
