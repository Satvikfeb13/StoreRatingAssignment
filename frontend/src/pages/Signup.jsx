import { Form, Input, Button, message, Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { authService } from '../services/authService';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await authService.signup(values);
      message.success('Signup successful! Please log in.');
      navigate('/');
    } catch (error) {
      // Show validation errors from backend
      const errorMsg = error.response?.data?.message || 'Signup failed. Please try again.';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card" variant="borderless">
        <div className="auth-title">Create an Account</div>
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          scrollToFirstError
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your Name!', whitespace: true }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { type: 'email', message: 'The input is not valid E-mail!' },
              { required: true, message: 'Please input your E-mail!' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="address"
            rules={[{ required: true, message: 'Please input your Address!', whitespace: true }]}
          >
            <Input prefix={<HomeOutlined />} placeholder="Address (Min 20 characters)" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password must be at least 8 characters long!' },
              {
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                message: 'Password must contain at least one uppercase letter and one special character!',
              }
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Register
            </Button>
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              Already have an account? <Link to="/">Log in</Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
