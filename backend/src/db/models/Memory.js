import { Schema, model } from 'mongoose';
import { addStatus, setUpdateRules } from '../hooks.js';

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
      type: Date,
      required: true,
    },
    season: {
      type: Schema.Types.ObjectId,
      ref: 'Season',
      required: true,
    },
  },

  {
    collection: 'mementos_collection',
    versionKey: false,
    timestamps: true,
  },
);

memorySchema.post('save', addStatus);

memorySchema.pre('findOneAndUpdate', setUpdateRules);

memorySchema.post('findOneAndUpdate', addStatus);

const Memory = model('Memory', memorySchema);
export default Memory;
