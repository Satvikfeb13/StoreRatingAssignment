import { Table, Input } from 'antd';
import { useState } from 'react';

const { Search } = Input;

const AdminStoreTable = ({ stores, loading }) => {
  const [searchText, setSearchText] = useState('');

  const filteredStores = stores.filter((store) =>
    store.storeName?.toLowerCase().includes(searchText.toLowerCase()) ||
    store.address?.toLowerCase().includes(searchText.toLowerCase()) ||
    store.email?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Store Name',
      dataIndex: 'storeName',
      key: 'storeName',
      sorter: (a, b) => a.storeName.localeCompare(b.storeName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search stores by name, email or address"
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredStores}
        rowKey={(record) => record.id || record.storeId || Math.random()}
        loading={loading}
      />
    </div>
  );
};

export default AdminStoreTable;
