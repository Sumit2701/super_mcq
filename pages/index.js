// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { Layout, Button, Space, Row, Col } from 'antd';
// import { Navbar } from "../components/Layouts";
// import axios from 'axios';

// const { Header, Content, Footer } = Layout;

// export default function Home() {
//   const [quizOptions, setQuizOptions] = useState([]);
//   const router = useRouter();

//   const handleQuizSelection = (quiz) => {
//     router.push({
//       pathname: '/questions',
//       query: { quiz },
//     });
//   };
//   useEffect(() => {
//     fetchQuizOptions();
//   }, []);
//   const fetchQuizOptions = async () => {
//     try {
//       const response = await axios.get('/api/quiz');
//       const distinctQuizzes = [...new Set(response.data.map(question => question))];
//       const updatedQuizOptions = distinctQuizzes.map((quiz, index) => ({
//         id: index + 1,
//         name: quiz,
//       }));
//       setQuizOptions(updatedQuizOptions);
//     } catch (error) {
//       console.error(error);
//     }
//   };
 
//   return (
//     <Navbar>
//       <Layout>
//         <Header style={{ backgroundColor: '#22333B', textAlign: 'center' }}>
//           <h1 style={{ color: 'white', fontSize: '28px' }}>Select a Quiz</h1>
//         </Header>
//         <Content style={{ padding: '50px' }}>
//           <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
//             <Row gutter={[8, 8]} justify="center">
//               {quizOptions.map(quiz => (
//                 <Col key={quiz.id} xs={24} sm={12} md={8} lg={6}>
//                   <Button
//                     onClick={() => handleQuizSelection(quiz.name)}
//                     style={{
//                       backgroundColor: '#BEAEE2',
//                       color: 'black',
//                       height: '80px',
//                       fontSize: '18px',
//                       fontWeight: 'bold',
//                       borderRadius: '5px',
//                       border: 'none',
//                       width: '100%',
//                     }}
//                   >
//                     {quiz.name}
//                   </Button>
//                 </Col>
//               ))}
//             </Row>
//           </Space>
//         </Content>
//         <Footer style={{ textAlign: 'center', backgroundColor: '#22333B', color: 'white' }}>
//           Sumit Ahire
//         </Footer>
//       </Layout>
//     </Navbar>
//   );
// }
import React from 'react';
import { useRouter } from 'next/router';
import { Layout, Card, Row, Col } from 'antd';
import { Navbar } from "../components/Layouts";
import { Image } from 'next/image';
const { Header, Content, Footer } = Layout;

const quizOptions = [
  {
    id: 1,
    name: 'UPSC Prelims 2023',
    description: 'Description of Quiz 1',
    image: 'data:image/jpeg;base64,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',
  },
  {
    id: 2,
    name: 'JEE Physics',
    description: 'Description of Quiz 2',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfpJPdefYn6wGzWo6nIQIHVdLudlunXO4YjQ&usqp=CAU',
  },
  // Add more quiz options as needed
];

export default function Home() {
  const router = useRouter();

  const handleQuizSelection = (quiz) => {
    router.push({
      pathname: '/questions',
      query: { quiz },
    });
  };

  return (
    <Navbar>
      <Layout>
        <Header style={{ backgroundColor: '#22333B', textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '28px' }}>Select a Quiz</h1>
        </Header>
        <Content style={{ padding: '50px' }}>
          <Row gutter={[16, 16]} justify="center">
            {quizOptions.map(quiz => (
              <Col key={quiz.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  onClick={() => handleQuizSelection(quiz.name)}
                  style={{ width: '100%' }}
                  cover={<img alt={quiz.name} src={quiz.image} width={100} height={200} />}
                >
                  <Card.Meta title={quiz.name} description={quiz.description} />
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: '#22333B', color: 'white' }}>
          Sumit Ahire
        </Footer>
      </Layout>
    </Navbar>
  );
}
