import { Form, Input, Button, message, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { authService } from '../services/authService';
import '../premium.css';

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Assuming the backend accepts email, oldPassword, and newPassword for unauthenticated password updates
      await authService.changePassword(values);
      message.success('Password updated successfully. Please log in with your new password.');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to update password. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-layout">
      {/* Left side banner (reusing the split layout from Login) */}
      <div className="split-left">
        <Title level={1} style={{ color: 'white', margin: 0, fontWeight: 700, letterSpacing: '-0.5px' }}>Store Rating</Title>
        <Title level={2} style={{ color: 'rgba(255,255,255,0.9)', marginTop: '8px', fontWeight: 300 }}>Secure Your Account</Title>
      </div>

      <div className="split-right">
        <div className="form-wrapper">
          <Title level={2} style={{ marginBottom: '8px', fontWeight: 700 }}>Update Password</Title>
          <Text type="secondary" style={{ display: 'block', marginBottom: '40px', fontSize: '16px' }}>
            Enter your email, current password, and new password.
          </Text>

          <Form
            name="forgot_password"
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
              <Input prefix={<MailOutlined style={{ color: '#bfbfbf' }} />} placeholder="Enter your email" style={{ borderRadius: '8px' }} />
            </Form.Item>

            <Form.Item
              name="oldPassword"
              label={<span style={{ fontWeight: 500 }}>Old Password</span>}
              rules={[{ required: true, message: 'Please input your old password!' }]}
            >
              <Input.Password prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} placeholder="Old Password" style={{ borderRadius: '8px' }} />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label={<span style={{ fontWeight: 500 }}>New Password</span>}
              rules={[{ required: true, min: 8, message: 'New password must be at least 8 characters!' }]}
              style={{ marginBottom: '32px' }}
            >
              <Input.Password prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} placeholder="New Password" style={{ borderRadius: '8px' }} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="premium-btn" loading={loading} block>
                Update Password
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <Text type="secondary" style={{ fontSize: '15px' }}>Remembered your password? </Text>
              <Link to="/" style={{ color: '#4f46e5', fontWeight: 600, fontSize: '15px' }}>Log in</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
