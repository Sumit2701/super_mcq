
// import { useEffect, useState } from 'react';
// import { Breadcrumb, Layout, Radio, Button, Card, Space } from 'antd';
// import { CSSTransition } from 'react-transition-group';
// import styles from '../styles/Questions.module.css';

// const { Header, Content, Footer } = Layout;

// export const Questions = () => {
//   const [questions, setQuestions] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [showResults, setShowResults] = useState({});

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   const fetchQuestions = async () => {
//     try {
//       const response = await fetch('/api/questions');
//       const data = await response.json();
//       setQuestions(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleSubmit = (questionIndex) => {
//     setShowResults((prevResults) => ({
//       ...prevResults,
//       [questionIndex]: true,
//     }));
//   };

//   const handleOptionChange = (questionIndex, optionIndex) => {
//     setSelectedOptions((prevState) => ({
//       ...prevState,
//       [questionIndex]: optionIndex,
//     }));
//   };

//   const getOptionResultText = (questionIndex, optionIndex) => {
//     if (showResults[questionIndex] && selectedOptions[questionIndex] === optionIndex) {
//       const selectedOption = questions[questionIndex].options[selectedOptions[questionIndex]];
//       const correctAnswer = questions[questionIndex].correctAnswer;
//       return selectedOption === correctAnswer ? 'Right' : 'Wrong';
//     }
//     return '';
//   };

//   const getOptionColor = (questionIndex, optionIndex) => {
//     if (showResults[questionIndex]) {
//       const selectedOption = selectedOptions[questionIndex];
//       const correctAnswer = questions[questionIndex].correctAnswer;
  
//       if (selectedOption !== undefined) {
//         if (selectedOption.toString() === correctAnswer && optionIndex.toString() === correctAnswer) {
//           return styles.optionCorrect;
//         } else if (selectedOption.toString() !== correctAnswer && optionIndex.toString() === selectedOption.toString()) {
//           return styles.optionWrong;
//         }
//       }
//     }
  
//     return '';
//   };
  

//   const getQuestionCardStyle = (questionIndex) => {
//     if (showResults && selectedOptions[questionIndex] !== undefined) {
//       const selectedOption = selectedOptions[questionIndex];
//       const correctAnswer = questions[questionIndex].correctAnswer;
  
//       if (selectedOption.toString() === correctAnswer) {
//         return { backgroundColor: 'lightgreen' };
//       } else {
//         return { backgroundColor: 'lightcoral' };
//       }
//     }
  
//     return {};
//   };
  

//   return (
//     <div>
//       <Layout style={{ backgroundColor: '#F9F9F9' }}>
//         <h1 className={styles.header}>Current Affairs</h1>
//         <Content className={styles.content}>
//           {questions.map((question, questionIndex) => (
//             <Card
//               key={questionIndex}
//               className={`${styles.card} ${getQuestionCardStyle(questionIndex)}`}
//               title={question.question}
//             >
//               <Radio.Group
//                 onChange={(e) => handleOptionChange(questionIndex, e.target.value)}
//                 value={selectedOptions[questionIndex]}
//               >
//                 {question.options.map((option, optionIndex) => (
//                   <CSSTransition
//                     key={optionIndex}
//                     classNames="option"
//                     timeout={300}
//                     in={showResults[questionIndex] && selectedOptions[questionIndex] === optionIndex}
//                   >
//                     <Radio
//                       className={`${styles.option} ${getOptionColor(questionIndex, optionIndex)}`}
//                       key={optionIndex}
//                       value={optionIndex}
//                     >
//                       {option}
//                     </Radio>
//                   </CSSTransition>
//                 ))}
//               </Radio.Group>
//               {showResults[questionIndex] && (
//                 <div className={styles.resultText}>
//                   {getOptionResultText(questionIndex, selectedOptions[questionIndex])}
//                 </div>
//               )}
//               <Button onClick={() => handleSubmit(questionIndex)} className={styles.submitButton}>
//                 Submit
//               </Button>
//             </Card>
//           ))}
//         </Content>
//         <Footer className={styles.footer}>Ant Design ©2023 Created by Ant UED</Footer>
//       </Layout>
//     </div>
//   );
// // };
// import { useEffect, useState } from 'react';
// import { Breadcrumb, Layout, Radio, Button, Card } from 'antd';
// import { CSSTransition } from 'react-transition-group';
// import styles from '../styles/Questions.module.css';

// const { Header, Content, Footer } = Layout;

// export const Questions = () => {
//   const [questions, setQuestions] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [showResults, setShowResults] = useState({});

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   const fetchQuestions = async () => {
//     try {
//       const response = await fetch('/api/questions');
//       const data = await response.json();
//       setQuestions(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleSubmit = (questionIndex) => {
//     setShowResults((prevResults) => ({
//       ...prevResults,
//       [questionIndex]: true,
//     }));
//   };

//   const handleOptionChange = (questionIndex, optionIndex) => {
//     setSelectedOptions((prevState) => ({
//       ...prevState,
//       [questionIndex]: optionIndex,
//     }));
//   };

//   const getOptionResultText = (questionIndex, optionIndex) => {
//     if (showResults[questionIndex] && selectedOptions[questionIndex] === optionIndex) {
//       const selectedOption = questions[questionIndex].options[selectedOptions[questionIndex]];
//       const correctAnswer = questions[questionIndex].correctAnswer;
//       return selectedOption === correctAnswer ? 'Right' : 'Wrong';
//     }
//     return '';
//   };

//   const getOptionColor = (questionIndex, optionIndex) => {
//     if (showResults[questionIndex] && selectedOptions[questionIndex] === optionIndex) {
//       const selectedOption = questions[questionIndex].options[selectedOptions[questionIndex]];
//       const correctAnswer = questions[questionIndex].correctAnswer;
//       return selectedOption === correctAnswer ? styles.optionCorrect : styles.optionWrong;
//     }
//     return '';
    
//   };
//   const getQuestionCardStyle = (questionIndex) => {
//     if (showResults[questionIndex] ) {
//       const selectedOption = questions[questionIndex].options[selectedOptions[questionIndex]];
//       const correctAnswer = questions[questionIndex].correctAnswer;
//       return selectedOption === correctAnswer ? styles.optionCorrect : styles.optionWrong;
//     }
    

//     return {};
//   };

//   return (
//     <div>
//       <Layout style={{ backgroundColor: '#F9F9F9' }}>
//         <h1 className={styles.header}>Current Affairs</h1>
//         <Content className={styles.content}>
//           {questions.map((question, questionIndex) => (
//             <Card
//               key={questionIndex}
//               className={`${styles.card} ${getQuestionCardStyle(questionIndex)}`}
//               title={question.question}
//             >
//               <Radio.Group
//                 onChange={(e) => handleOptionChange(questionIndex, e.target.value)}
//                 value={selectedOptions[questionIndex]}
//               >
//                 {question.options.map((option, optionIndex) => (
//                   <CSSTransition
//                     key={optionIndex}
//                     classNames="option"
//                     timeout={300}
//                     in={showResults[questionIndex] && selectedOptions[questionIndex] === optionIndex}
//                   >
//                     <Radio
//                       className={`${styles.option} ${getOptionColor(questionIndex, optionIndex)}`}
//                       key={optionIndex}
//                       value={optionIndex}
//                     >
//                       {option}
//                     </Radio>
//                   </CSSTransition>
//                 ))}
//               </Radio.Group>
//               {showResults[questionIndex] && (
//                 <div className={styles.resultText}>
//                   {getOptionResultText(questionIndex, selectedOptions[questionIndex])}
//                 </div>
//               )}
//               <Button onClick={() => handleSubmit(questionIndex)} className={styles.submitButton}>
//                 Submit
//               </Button>
//             </Card>
//           ))}
//         </Content>
//         <Footer className={styles.footer}>Ant Design ©2023 Created by Ant UED</Footer>
//       </Layout>
//     </div>
//   );
// };

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Radio, Button, Card } from 'antd';
import { CSSTransition } from 'react-transition-group';
import styles from '../styles/Questions.module.css';

const { Header, Content, Footer } = Layout;

export const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResults, setShowResults] = useState({});
  const [timer, setTimer] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const router = useRouter();
  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    setTotalTime(questions.length * 60); // Assuming 60 seconds per question

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    if (timer === totalTime) {
      clearInterval(interval);
      navigateToResults(); // Navigate to the results page
    }
    return () => {
      clearInterval(interval);
    };
  }, [questions, timer, totalTime]);


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
  
  
  
  
  
  
  
  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions');
      const data = await response.json();
      setQuestions(data);
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


  return (
    <div>
      
      <Layout style={{ backgroundColor: '#F9F9F9' }}>
        <h1 className={styles.header}>Current Affairs</h1>
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
    </div>
  );
};
