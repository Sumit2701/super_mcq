import { Form, Input, Button, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../styles/add-question-page.module.css';

const AddQuestionPage = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Question added successfully
        form.resetFields();
        // Show success message or redirect
        // ...
      } else {
        // Failed to add question
        // Handle error response
        // ...
      }
    } catch (error) {
      console.error(error);
      // Handle error during the request
      // ...
    }
  };

  return (
    <div className={styles['add-question-container']}>
      <h1>Add Question</h1>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="quiz"
          label="Quiz"
          rules={[{ required: true, message: 'Please enter the quiz' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="question"
          label="Question"
          rules={[{ required: true, message: 'Please enter the question' }]}
        >
          <Input />
        </Form.Item>
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  key={field.key}
                  label={`Option ${index + 1}`}
                  required={false}
                  rules={[{ required: true, message: 'Please enter the option' }]}
                  {...field}
                >
                  <Input />
                </Form.Item>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Option
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item
          name="correctAnswer"
          label="Correct Answer"
          rules={[{ required: true, message: 'Please enter the correct answer' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Please select the date' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddQuestionPage;
