const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  quiz: {
    type: String,
    required: true,
  },
  hasImage:{
    type:Boolean,
  },
  imageUrl:{
    type:String,
  },
  hasExplanation:{
    type:Boolean,
  },
  explanation:{
    type:String,
  }
});

export default mongoose.models.Question || mongoose.model('Question', questionSchema);
