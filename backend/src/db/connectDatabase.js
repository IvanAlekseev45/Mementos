import mongoose from 'mongoose';

export const connectDatabase = async () => {
  const { CONNECT_STRING } = process.env;
  try {
    await mongoose.connect(CONNECT_STRING);
    console.log('Success connect!');
  } catch (error) {
    console.log('Failed connect database', error);
    throw error;
  }
};
