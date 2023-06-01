import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
import Question from '../../models/Question';

const handler = nextConnect();

handler.use(middleware);

// handler.get(async (req, res) => {
//   try {
//   const quiz = req.query.quiz;
//   const numQuestions = req.query.numQuestions;
//       const questions = await Question.find({quiz});
//       res.json(questions);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// const randomSample = (array, size) => {
//   const shuffled = array.sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, size);
// };

// handler.get(async (req, res) => {
//   try {
//     const quiz = req.query.quiz;
//     const numQuestions = parseInt(req.query.numQuestions);
//     console.log(quiz,numQuestions)
//     // Get the total count of questions for the specified quiz
//     const totalCount = await Question.countDocuments({ quiz });
    
//     // Generate a random set of indices to retrieve questions
//     const randomIndices = new Set();
//     console.log(totalCount,randomIndices)
//     while (randomIndices.size < numQuestions) {
//       randomIndices.add(Math.floor(Math.random() * totalCount));
//     }
    
//     // Fetch questions with the generated indices
//     const questions = await Question.aggregate([
//       { $match: { quiz } },
//       { $sample: { size: numQuestions + randomIndices.size } },
//       { $match: { $expr: { $in: ["$_id", Array.from(randomIndices)] } } }
//     ]);
//      console.log(questions)
//     // Randomly select the desired number of questions
//     const randomQuestions = randomSample(questions, numQuestions);
//     console.log(randomQuestions)
//     res.json(randomQuestions);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
handler.get(async (req, res) => {
  try {
    const quiz = req.query.quiz;
    const numQuestions = parseInt(req.query.numQuestions);

    // Fetch random questions from the database
    const questions = await Question.aggregate([
      { $match: { quiz } },
      { $sample: { size: numQuestions } }
    ]);

    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






handler.post(async (req, res) => {
  try {
    const { question, options, correctAnswer, date, quiz } = req.body;
    const newQuestion = new Question({
      question,
      options,
      correctAnswer,
      date,
      quiz,
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add question' });
  }
});

export default handler;
