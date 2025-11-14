import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import api from '../config/api';
import toast from 'react-hot-toast';

const CreatePass = () => {
  const [formData, setFormData] = useState({
    passType: 'out',
    purpose: '',
    visitorName: '',
    itemDescription: '',
    expectedReturnTime: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = { ...formData };
      if (formData.passType !== 'visitor') {
        delete submitData.visitorName;
      }

      await api.post('/pass', submitData);
      toast.success('Gate pass created successfully!');
      navigate('/my-passes');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create pass. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Card title="Create New Gate Pass">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pass Type <span className="text-red-500">*</span>
            </label>
            <select
              name="passType"
              value={formData.passType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="in">Entry Pass</option>
              <option value="out">Exit Pass</option>
              <option value="visitor">Visitor Pass</option>
            </select>
          </div>

          <Input
            label="Purpose"
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            placeholder="Enter the purpose of this pass"
            required
          />

          {formData.passType === 'visitor' && (
            <Input
              label="Visitor Name"
              type="text"
              name="visitorName"
              value={formData.visitorName}
              onChange={handleChange}
              placeholder="Enter visitor's full name"
              required={formData.passType === 'visitor'}
            />
          )}

          <div className="mb-4">
            <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Item Description
            </label>
            <textarea
              id="itemDescription"
              name="itemDescription"
              value={formData.itemDescription}
              onChange={handleChange}
              placeholder="Describe items being carried (if any)"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <Input
            label="Expected Return Time"
            type="datetime-local"
            name="expectedReturnTime"
            value={formData.expectedReturnTime}
            onChange={handleChange}
          />

          <div className="flex gap-4 mt-6">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Pass'}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
};

export default CreatePass;
