import mongoose from 'mongoose';

const connectDB = async () => {


  try {

    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined');
    }

    mongoose.set('strictQuery', true);
    await mongoose.connect(mongoUri);
    console.log("database is connected successfully")
  } catch (error) {
    throw new Error(error)
  }
};

export default connectDB;
