import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
import Question from '../../models/Question';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    const quiz=req.query;
      const questions = await Question.find(quiz);
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
