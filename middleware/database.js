import mongoose from 'mongoose';

const middleware = async (req, res, next) => {
  if (mongoose.connections[0].readyState !== 1) {
    await mongoose.connect('mongodb+srv://sumit:sumit@cluster0.enrbqt5.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
  return next();
};

export default middleware;
