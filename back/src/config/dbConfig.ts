const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://mateogarzon1002:DTZrdT61QfMKSIMC@products.llamkwf.mongodb.net/'
    );
    console.log('MongoDB Connected...'); // Check connection state
  } catch (err: typeof mongoose.MongooseError) {
    console.error('MongoDB Connection Error:', err.message);
  }
};

module.exports = connectDB;
