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
  const [submitted, setSubmitted] = useState(Array(questions.length).fill(false));

  const quiz = router.query.quiz;
  useEffect(() => {
    const quiz = router.query.quiz;
    const numQuestions=router.query.numQuestions // Get the selected quiz name from the query parameter
    console.log(quiz,numQuestions)
    if (quiz && numQuestions) {
      fetchQuestions(quiz,numQuestions);
    }
  }, [router.query.quiz]);

  useEffect(() => {
    setTotalTime(questions.length * 6); // Assuming 60 seconds per question

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    if (timer >totalTime) {
      clearInterval(interval);
      navigateToResults(); // Navigate to the results page
    }
    return () => {
      clearInterval(interval);
    };
  }, [questions, timer, totalTime]);


  const navigateToResults = () => {
    const score = calculateScore();
    console.log(score) // Implement your own logic to calculate the score
    const href = `/Result?score=${score}/${questions.length}`;
    router.push(href); // Navigate to the results page with the score as a query parameter
  };
  
  const calculateScore = () => {
    let score = 0;
  
    questions.forEach((question, questionIndex) => {
      const selectedOptionIndex = selectedOptions[questionIndex];
      const selectedOptionValue = question.options[selectedOptionIndex];
      const correctAnswer = question.correctAnswer;
  
      if (showResults[questionIndex] && selectedOptionValue === correctAnswer) {
        score++;
      }
    });
   console.log(score)
    return score;
  };
  

  const fetchQuestions = async (quiz,numQuestions) => {
    try {
      const response = await fetch(`/api/questions?quiz=${quiz}&numQuestions=${numQuestions}`);
      const data = await response.json();
      setQuestions(data);
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
    const newSubmitted = [...submitted];
    newSubmitted[questionIndex] = true;
    setSubmitted(newSubmitted);
  };

  const handleOptionChange = (questionIndex, optionIndex) => {
    if( !submitted[questionIndex]){
    setSelectedOptions((prevState) => ({
      ...prevState,
      [questionIndex]: optionIndex,

    }));}

  };

  const getOptionResultText = (questionIndex, optionIndex) => {
    if (showResults[questionIndex] && selectedOptions[questionIndex] === optionIndex) {
      const selectedOption = questions[questionIndex].options[selectedOptions[questionIndex]];
      const correctAnswer = questions[questionIndex].correctAnswer;
      return selectedOption === correctAnswer ? `Right : ${questions[questionIndex].correctAnswer}` : `Wrong, Correct Answer: ${questions[questionIndex].correctAnswer}`;
    }
    return '';
  };
//  const getOptionStyle=(question, option,questionIndex)=>{
//   if(submitted[questionIndex]){
//  return (option==question.correctAnswer)?"":""
// } }
const getOptionStyle = (question, option, questionIndex) => {
  if (submitted[questionIndex]) {
    return option === question.correctAnswer ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 24 24"><path d="M21.856 10.303c.086.554.144 1.118.144 1.697 0 6.075-4.925 11-11 11s-11-4.925-11-11 4.925-11 11-11c2.347 0 4.518.741 6.304 1.993l-1.422 1.457c-1.408-.913-3.082-1.45-4.882-1.45-4.962 0-9 4.038-9 9s4.038 9 9 9c4.894 0 8.879-3.928 8.99-8.795l1.866-1.902zm-.952-8.136l-9.404 9.639-3.843-3.614-3.095 3.098 6.938 6.71 12.5-12.737-3.096-3.096z"/></svg>  
    ) : null;
  }
};
const getCorrectOptionStyle=(question, option,questionIndex)=> {
  if (submitted[questionIndex]) {
    return option === question.correctAnswer ? (
     styles.optionCorrect
    ) : '';
  }
};
  const getQuestionCardStyle = (questionIndex) => {
    if (showResults[questionIndex]) {
      const selectedOption = questions[questionIndex].options[selectedOptions[questionIndex]];
      const correctAnswer = questions[questionIndex].correctAnswer;
      return selectedOption === correctAnswer ? styles.cardCorrect : styles.cardWrong;
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
                   className={`${styles.option}`}
                    key={optionIndex}
                      value={optionIndex}
                    
                    >
                    <p className={`${getCorrectOptionStyle(question, option,questionIndex)}`} style={{ display: 'inline' }}>  {option} {getOptionStyle(question, option,questionIndex)}</p>
                    </Radio>
                  </CSSTransition>
                ))}
              </Radio.Group>
              {showResults[questionIndex] && (
                <div className={styles.resultText}>
                  {getOptionResultText(questionIndex, selectedOptions[questionIndex])}
                </div>
              )}
             <Button
  onClick={() => handleSubmit(questionIndex)}
  className={styles.submitButton}
  disabled={submitted[questionIndex]} // Disable if the question is already submitted
>
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



// return ( <Navbar>
//   <div>
    
//     <Layout style={{ backgroundColor: '#F9F9F9' }}>
//     <Header style={{ backgroundColor: '#F9F9F9', textAlign: 'center' }}>
//         <h1 style={{ color: 'Black', fontSize: '28px' }}>{quiz}</h1>
//       </Header>
//       <Content className={styles.content}>
//       <div className={`${styles.timer} ${styles.mobileTimer}`}>
// {formatTime(totalTime - timer)}
// </div>
// {questions.map((question, questionIndex) => (
// <Card
// key={questionIndex}
// className={`${styles.card} ${getQuestionCardStyle(questionIndex)}`}
// title={<div className={styles.questionTitle}>{question.question}</div>}
// >
//     <Radio.Group
//       onChange={(e) => handleOptionChange(questionIndex, e.target.value)}
//       value={selectedOptions[questionIndex]}
//     >
//       {question.options.map((option, optionIndex) => (
//         <CSSTransition
//           key={optionIndex}
//           classNames="option"
//           timeout={300}
//           in={showResults[questionIndex] && selectedOptions[questionIndex] === optionIndex}
//         >
//           <Radio
//             className={`${styles.option} ${getOptionColor(questionIndex, optionIndex)}`}
//             key={optionIndex}
//             value={optionIndex}
//           >
//             {option}
//           </Radio>
//         </CSSTransition>
//       ))}
//     </Radio.Group>
//     {showResults[questionIndex] && (
//       <div className={styles.resultText}>
//         {getOptionResultText(questionIndex, selectedOptions[questionIndex])}
//       </div>
//     )}
//     <Button onClick={() => handleSubmit(questionIndex)} className={styles.submitButton}>
//       Submit
//     </Button>
//   </Card>
// ))}
// </Content>

//       {/* <Content className={styles.content}>
//         <div className={styles.timer}>{formatTime(totalTime - timer)}</div>
//         {questions.map((question, questionIndex) => (
//           <Card
//             key={questionIndex}
//             className={`${styles.card} ${getQuestionCardStyle(questionIndex)}`}
//             title={question.question}
//           >
//             <Radio.Group
//               onChange={(e) => handleOptionChange(questionIndex, e.target.value)}
//               value={selectedOptions[questionIndex]}
//             >
//               {question.options.map((option, optionIndex) => (
//                 <CSSTransition
//                   key={optionIndex}
//                   classNames="option"
//                   timeout={300}
//                   in={showResults[questionIndex] && selectedOptions[questionIndex] === optionIndex}
//                 >
//                   <Radio
//                     className={`${styles.option} ${getOptionColor(questionIndex, optionIndex)}`}
//                     key={optionIndex}
//                     value={optionIndex}
//                   >
//                     {option}
//                   </Radio>
//                 </CSSTransition>
//               ))}
//             </Radio.Group>
//             {showResults[questionIndex] && (
//               <div className={styles.resultText}>
//                 {getOptionResultText(questionIndex, selectedOptions[questionIndex])}
//               </div>
//             )}
//             <Button onClick={() => handleSubmit(questionIndex)} className={styles.submitButton}>
//               Submit
//             </Button>
//           </Card>
//         ))}
//       </Content> */}
//       <Footer className={styles.footer}>Supper quizer</Footer>
//     </Layout>
//   </div></Navbar>
// );
// };