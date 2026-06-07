import { Layout, Menu, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const role = authService.getCurrentRole();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '0 24px', boxShadow: '0 2px 8px #f0f1f2' }}>
      <div className="logo" style={{ fontSize: '20px', fontWeight: 'bold', color: '#1890ff' }}>
        {title || 'Store Rating App'}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {role && <span style={{ fontWeight: 500 }}>Role: {role}</span>}
        <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Header>
  );
};

export default Navbar;
