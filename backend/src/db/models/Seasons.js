import { Schema, model } from 'mongoose';
import { addStatus, setUpdateRules } from '../hooks.js';

const seasonSchema = new Schema(
  {
    season: {
      type: String,
      enum: ['spring', 'summer', 'autumn', 'winter'],
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

seasonSchema.post('save', addStatus);

seasonSchema.pre('findOneAndUpdate', setUpdateRules);

seasonSchema.post('findOneAndUpdate', addStatus);

const Season = model('Season', seasonSchema);

export default Season;
