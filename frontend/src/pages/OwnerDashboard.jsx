import { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, message, Button } from 'antd';
import { StarOutlined, KeyOutlined } from '@ant-design/icons';
import Navbar from '../components/Navbar';
import ChangePasswordModal from '../components/ChangePasswordModal';
import { ownerService } from '../services/ownerService';
import { mockOwnerRatings, mockOwnerStats } from '../mockData';

const OwnerDashboard = () => {
  const [stats, setStats] = useState({ storeName: '', averageRating: 0 });
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, ratingsData] = await Promise.all([
        ownerService.getDashboardStats().catch(() => null),
        ownerService.getRatings().catch(() => [])
      ]);
      setStats(statsData && statsData.storeName ? statsData : mockOwnerStats);
      setRatings(ratingsData?.length ? ratingsData : mockOwnerRatings);
    } catch (error) {
      message.error('Failed to load owner dashboard data');
      setStats(mockOwnerStats);
      setRatings(mockOwnerRatings);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      render: (text, record) => text || record.user?.name || 'Unknown',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => text || record.user?.email || 'Unknown',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Navbar title="Store Owner Dashboard" />
      <div className="dashboard-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0 }}>Welcome, {stats.storeName || 'Store Owner'}</h2>
          <Button type="default" icon={<KeyOutlined />} onClick={() => setPasswordModalVisible(true)}>
            Change Password
          </Button>
        </div>
        
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <Statistic
                title="Average Rating"
                value={stats.averageRating ? Number(stats.averageRating).toFixed(1) : 0}
                prefix={<StarOutlined style={{ color: '#faad14' }} />}
                suffix="/ 5"
              />
            </Card>
          </Col>
        </Row>

        <Card title="User Ratings">
          <Table
            columns={columns}
            dataSource={ratings}
            rowKey={(record) => record.id || Math.random()}
            loading={loading}
          />
        </Card>

        <ChangePasswordModal
          visible={passwordModalVisible}
          onCancel={() => setPasswordModalVisible(false)}
        />
      </div>
    </div>
  );
};

export default OwnerDashboard;
