import { Modal, Form, Input, Button, message } from 'antd';
import { useState } from 'react';
import { adminService } from '../services/adminService';

const AddStoreModal = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await adminService.addStore(values);
      message.success('Store added successfully');
      form.resetFields();
      onSuccess();
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to add store');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add New Store"
      open={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="storeName" label="Store Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="storeOwnerId" label="Store Owner ID" rules={[{ required: true }]}>
          <Input placeholder="Enter the Owner's User ID" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Add Store
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddStoreModal;
