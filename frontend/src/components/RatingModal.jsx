import { Modal, Rate, Form, Input, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import { storeService } from '../services/storeService';

const RatingModal = ({ visible, store, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && store) {
      form.setFieldsValue({
        rating: store.userSubmittedRating || 0,
        // Optional comment field if needed, but per spec, just rating.
      });
    }
  }, [visible, store, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (store.userSubmittedRating) {
        // Update rating
        // Assuming userRatingId is available or we pass store.id
        const ratingId = store.ratingId || store.id; // Adjust based on actual backend response
        await storeService.updateRating(ratingId, {
          storeId: store.id,
          rating: values.rating,
        });
        message.success('Rating updated successfully');
      } else {
        // Submit new rating
        await storeService.submitRating({
          storeId: store.id || store.storeId, // Adjust based on actual backend response
          rating: values.rating,
        });
        message.success('Rating submitted successfully');
      }
      onSuccess();
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={`Rate ${store?.storeName}`}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="rating"
          label="Your Rating"
          rules={[{ required: true, message: 'Please provide a rating' }]}
        >
          <Rate />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Submit Rating
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RatingModal;
