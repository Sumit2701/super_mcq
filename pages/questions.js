import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Radio, Button, Card } from 'antd';
import { CSSTransition } from 'react-transition-group';
import styles from '../styles/Questions.module.css';
import { Navbar } from "../components/Layouts";

const { Header, Content, Footer } = Layout;

 const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResults, setShowResults] = useState({});
  const [timer, setTimer] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const router = useRouter();
  const quiz = router.query.quiz;
  useEffect(() => {
    const quiz = router.query.quiz; // Get the selected quiz name from the query parameter
    if (quiz) {
      fetchQuestions(quiz);
      console.log()
    }
  }, [router.query.quiz]);

  // useEffect(() => {
  //   setTotalTime(questions.length * 60); // Assuming 60 seconds per question

  //   const interval = setInterval(() => {
  //     setTimer((prevTimer) => prevTimer + 1);
  //   }, 1000);

  //   if (timer >totalTime) {
  //     clearInterval(interval);
  //     navigateToResults(); // Navigate to the results page
  //   }
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [questions, timer, totalTime]);


  const navigateToResults = () => {
    const score = calculateScore(); // Implement your own logic to calculate the score
    const href = `/Result?score=${score}`;
    router.push(href); // Navigate to the results page with the score as a query parameter
  };
  
  const calculateScore = () => {
    let score = 0;

    // Iterate over each question
    questions.forEach((question, questionIndex) => {
      const selectedOptionIndex = selectedOptions[questionIndex];
      const correctOptionIndex = question.correctAnswer;

      if (selectedOptionIndex === correctOptionIndex) {
        score++; // Increment the score if the selected option is correct
      }
    });

    return score;
  };

  const fetchQuestions = async (quiz) => {
    try {
      const response = await fetch(`/api/questions?quiz=${quiz}`);
      const data = await response.json();
      setQuestions(data);
      console.log("this is data"+data)
      // if(data.length<=0){ const href = `/`;
      // router.push(href);}
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (questionIndex) => {
    setShowResults((prevResults) => ({
      ...prevResults,
      [questionIndex]: true,
    }));
  };

  const handleOptionChange = (questionIndex, optionIndex) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [questionIndex]: optionIndex,
    }));
  };

  const getOptionResultText = (questionIndex, optionIndex) => {
    if (showResults[questionIndex] && selectedOptions[questionIndex] === optionIndex) {
      const selectedOption = questions[questionIndex].options[selectedOptions[questionIndex]];
      const correctAnswer = questions[questionIndex].correctAnswer;
      return selectedOption === correctAnswer ? 'Right' : 'Wrong';
    }
    return '';
  };

  const getOptionColor = (questionIndex, optionIndex) => {
    if (showResults[questionIndex] && selectedOptions[questionIndex] === optionIndex) {
      const selectedOption = questions[questionIndex].options[selectedOptions[questionIndex]];
      const correctAnswer = questions[questionIndex].correctAnswer;
      return selectedOption === correctAnswer ? styles.optionCorrect : styles.optionWrong;
    }
    return '';
  };

  const getQuestionCardStyle = (questionIndex) => {
    if (showResults[questionIndex]) {
      const selectedOption = questions[questionIndex].options[selectedOptions[questionIndex]];
      const correctAnswer = questions[questionIndex].correctAnswer;
      return selectedOption === correctAnswer ? styles.optionCorrect : styles.optionWrong;
    }

    return {};
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return ( <Navbar>
    <div>
      
      <Layout style={{ backgroundColor: '#F9F9F9' }}>
      <Header style={{ backgroundColor: '#22333B', textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '28px' }}>{quiz}</h1>
        </Header>
        <Content className={styles.content}>
          <div className={styles.timer}>{formatTime(totalTime - timer)}</div>
          {questions.map((question, questionIndex) => (
            <Card
              key={questionIndex}
              className={`${styles.card} ${getQuestionCardStyle(questionIndex)}`}
              title={question.question}
            >
              <Radio.Group
                onChange={(e) => handleOptionChange(questionIndex, e.target.value)}
                value={selectedOptions[questionIndex]}
              >
                {question.options.map((option, optionIndex) => (
                  <CSSTransition
                    key={optionIndex}
                    classNames="option"
                    timeout={300}
                    in={showResults[questionIndex] && selectedOptions[questionIndex] === optionIndex}
                  >
                    <Radio
                      className={`${styles.option} ${getOptionColor(questionIndex, optionIndex)}`}
                      key={optionIndex}
                      value={optionIndex}
                    >
                      {option}
                    </Radio>
                  </CSSTransition>
                ))}
              </Radio.Group>
              {showResults[questionIndex] && (
                <div className={styles.resultText}>
                  {getOptionResultText(questionIndex, selectedOptions[questionIndex])}
                </div>
              )}
              <Button onClick={() => handleSubmit(questionIndex)} className={styles.submitButton}>
                Submit
              </Button>
            </Card>
          ))}
        </Content>
        <Footer className={styles.footer}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </div></Navbar>
  );
};
const QuestionsPage = () => {
  return <Questions />;
};
export default QuestionsPage;