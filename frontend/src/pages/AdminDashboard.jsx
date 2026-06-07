import { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, message, Button, Space } from 'antd';
import { UserOutlined, ShopOutlined, StarOutlined, PlusOutlined } from '@ant-design/icons';
import Navbar from '../components/Navbar';
import UserTable from '../components/UserTable';
import AdminStoreTable from '../components/AdminStoreTable';
import AddUserModal from '../components/AddUserModal';
import AddStoreModal from '../components/AddStoreModal';
import { adminService } from '../services/adminService';
import { mockUsers, mockStores, mockAdminStats } from '../mockData';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addUserVisible, setAddUserVisible] = useState(false);
  const [addStoreVisible, setAddStoreVisible] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, usersData, storesData] = await Promise.all([
        adminService.getDashboardStats().catch(() => null),
        adminService.getUsers().catch(() => []),
        adminService.getStores().catch(() => [])
      ]);
      
      // Fallback to mock data if the database is currently empty so the UI can be tested
      setStats(statsData && statsData.totalUsers ? statsData : mockAdminStats);
      setUsers(usersData?.length ? usersData : mockUsers);
      setStores(storesData?.length ? storesData : mockStores);
    } catch (error) {
      message.error('Failed to load dashboard data');
      setStats(mockAdminStats);
      setUsers(mockUsers);
      setStores(mockStores);
    } finally {
      setLoading(false);
    }
  };

  const refreshUsers = async () => {
    try {
      const usersData = await adminService.getUsers();
      if(usersData?.length) setUsers(usersData);
    } catch (error) {}
  };

  const refreshStores = async () => {
    try {
      const storesData = await adminService.getStores();
      if(storesData?.length) setStores(storesData);
    } catch (error) {}
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Navbar title="Admin Dashboard" />
      <div className="dashboard-container">
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={8}>
            <Card hoverable>
              <Statistic
                title="Total Users"
                value={stats.totalUsers}
                prefix={<UserOutlined style={{ color: '#1890ff' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card hoverable>
              <Statistic
                title="Total Stores"
                value={stats.totalStores}
                prefix={<ShopOutlined style={{ color: '#52c41a' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card hoverable>
              <Statistic
                title="Total Ratings"
                value={stats.totalRatings}
                prefix={<StarOutlined style={{ color: '#faad14' }} />}
              />
            </Card>
          </Col>
        </Row>

        <Card 
          title="System Users" 
          style={{ marginBottom: '24px' }}
          extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setAddUserVisible(true)}>Add User</Button>}
        >
          <UserTable users={users} loading={loading} />
        </Card>

        <Card 
          title="All Stores"
          extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setAddStoreVisible(true)}>Add Store</Button>}
        >
          <AdminStoreTable stores={stores} loading={loading} />
        </Card>

        <AddUserModal 
          visible={addUserVisible} 
          onCancel={() => setAddUserVisible(false)} 
          onSuccess={() => { setAddUserVisible(false); refreshUsers(); }} 
        />
        
        <AddStoreModal 
          visible={addStoreVisible} 
          onCancel={() => setAddStoreVisible(false)} 
          onSuccess={() => { setAddStoreVisible(false); refreshStores(); }} 
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
