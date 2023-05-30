import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Layout, Button, Space, Row, Col } from 'antd';
import { Navbar } from "../components/Layouts";
import axios from 'axios';

const { Header, Content, Footer } = Layout;



export default function Home() {
  const [quizOptions, setQuizOptions] = useState([]);
  const router = useRouter();

  const handleQuizSelection = (quiz) => {
    router.push({
      pathname: '/questions',
      query: { quiz },
    });
  };
  useEffect(() => {
    fetchQuizOptions();
  }, []);
  const fetchQuizOptions = async () => {
    try {
      const response = await axios.get('/api/quiz');
      const distinctQuizzes = [...new Set(response.data.map(question => question))];
      const updatedQuizOptions = distinctQuizzes.map((quiz, index) => ({
        id: index + 1,
        name: quiz,
      }));
      setQuizOptions(updatedQuizOptions);
    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <Navbar>
      <Layout>
        <Header style={{ backgroundColor: '#22333B', textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '28px' }}>Select a Quiz</h1>
        </Header>
        <Content style={{ padding: '50px' }}>
          <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
            <Row gutter={[8, 8]} justify="center">
              {quizOptions.map(quiz => (
                <Col key={quiz.id} xs={24} sm={12} md={8} lg={6}>
                  <Button
                    onClick={() => handleQuizSelection(quiz.name)}
                    style={{
                      backgroundColor: '#BEAEE2',
                      color: 'black',
                      height: '80px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      borderRadius: '5px',
                      border: 'none',
                      width: '100%',
                    }}
                  >
                    {quiz.name}
                  </Button>
                </Col>
              ))}
            </Row>
          </Space>
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: '#22333B', color: 'white' }}>
          Sumit Ahire
        </Footer>
      </Layout>
    </Navbar>
  );
}