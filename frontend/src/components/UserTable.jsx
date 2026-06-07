import { Table, Input } from 'antd';
import { useState } from 'react';

const { Search } = Input;

const UserTable = ({ users, loading }) => {
  const [searchText, setSearchText] = useState('');

  const filteredUsers = users.filter((user) => 
    user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
    user.address?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
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
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Admin', value: 'ADMIN' },
        { text: 'User', value: 'USER' },
        { text: 'Store Owner', value: 'STORE_OWNER' },
      ],
      onFilter: (value, record) => record.role === value,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search user by name, email or address"
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey={(record) => record.id || record.email}
        loading={loading}
      />
    </div>
  );
};

export default UserTable;
