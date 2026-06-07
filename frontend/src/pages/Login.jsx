import { Form, Input, Button, message, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined, ShopOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { authService } from '../services/authService';
import '../premium.css';

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await authService.login(values);
      const role = response.role;
      
      message.success('Login successful!');
      
      if (role === 'ADMIN') {
        navigate('/admin');
      } else if (role === 'USER') {
        navigate('/user');
      } else if (role === 'STORE_OWNER') {
        navigate('/owner');
      } else {
        navigate('/'); // fallback
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-layout">
      {/* Left side banner */}
      <div className="split-left">
        <ShopOutlined style={{ fontSize: '80px', marginBottom: '32px', color: '#a855f7' }} />
        <Title level={1} style={{ color: 'white', margin: 0, fontWeight: 700, letterSpacing: '-0.5px' }}>Store Rating</Title>
        <Title level={2} style={{ color: 'rgba(255,255,255,0.9)', marginTop: '8px', fontWeight: 300 }}>Experience Excellence</Title>
        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginTop: '24px', textAlign: 'center', maxWidth: '400px', lineHeight: '1.6' }}>
          Discover the best stores, share your honest experiences, and manage your business all in one beautifully designed place.
        </Text>
      </div>

      {/* Right side form */}
      <div className="split-right">
        <div className="form-wrapper">
          <Title level={2} style={{ marginBottom: '8px', fontWeight: 700 }}>Welcome back</Title>
          <Text type="secondary" style={{ display: 'block', marginBottom: '40px', fontSize: '16px' }}>
            Please enter your details to sign in securely.
          </Text>

          <Form
            name="normal_login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            requiredMark={false}
          >
            <Form.Item
              name="email"
              label={<span style={{ fontWeight: 500 }}>Email Address</span>}
              rules={[
                { required: true, message: 'Please input your Email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} placeholder="Enter your email" style={{ borderRadius: '8px' }} />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span style={{ fontWeight: 500 }}>Password</span>}
              rules={[{ required: true, message: 'Please input your Password!' }]}
              style={{ marginBottom: '12px' }}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="Enter your password"
                style={{ borderRadius: '8px' }}
              />
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
              <Link to="/forgot-password" style={{ color: '#4f46e5', fontWeight: 500 }}>Forgot password?</Link>
            </div>

            <Form.Item style={{ marginBottom: '24px' }}>
              <Button type="primary" htmlType="submit" className="premium-btn" loading={loading} block>
                Sign In
              </Button>
            </Form.Item>

            <Divider plain style={{ color: '#9ca3af', borderColor: '#e5e7eb' }}>Or continue with</Divider>

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <Text type="secondary" style={{ fontSize: '15px' }}>Don't have an account? </Text>
              <Link to="/signup" style={{ color: '#4f46e5', fontWeight: 600, fontSize: '15px' }}>Create an account</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
