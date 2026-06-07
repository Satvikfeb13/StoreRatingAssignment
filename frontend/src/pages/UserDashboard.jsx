import { useEffect, useState } from 'react';
import { Card, message, Button } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import Navbar from '../components/Navbar';
import StoreTable from '../components/StoreTable';
import RatingModal from '../components/RatingModal';
import ChangePasswordModal from '../components/ChangePasswordModal';
import { storeService } from '../services/storeService';
import { mockStores } from '../mockData';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const data = await storeService.getStores();
      setStores(data?.length ? data : mockStores);
    } catch (error) {
      message.error('Failed to load stores');
      setStores(mockStores);
    } finally {
      setLoading(false);
    }
  };

  const handleRateStore = (store) => {
    setSelectedStore(store);
    setModalVisible(true);
  };

  const handleModalSuccess = () => {
    setModalVisible(false);
    fetchStores(); // Refresh store list to get updated ratings
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Navbar title="User Dashboard" />
      <div className="dashboard-container">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <Button type="default" icon={<KeyOutlined />} onClick={() => setPasswordModalVisible(true)}>
            Change Password
          </Button>
        </div>
        <Card title="Stores List">
          <StoreTable 
            stores={stores} 
            loading={loading} 
            onRateStore={handleRateStore} 
          />
        </Card>

        <RatingModal
          visible={modalVisible}
          store={selectedStore}
          onCancel={() => setModalVisible(false)}
          onSuccess={handleModalSuccess}
        />

        <ChangePasswordModal
          visible={passwordModalVisible}
          onCancel={() => setPasswordModalVisible(false)}
        />
      </div>
    </div>
  );
};

export default UserDashboard;
