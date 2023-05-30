import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
import Question from '../../models/Question';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    
      const distinctQuizzes = await Question.distinct('quiz');
      res.json(distinctQuizzes);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




export default handler;
