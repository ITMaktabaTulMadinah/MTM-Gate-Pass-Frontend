import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import api from '../config/api';
import toast from 'react-hot-toast';

const Approvals = () => {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingPasses();
  }, []);

  const fetchPendingPasses = async () => {
    try {
      const response = await api.get('/pass/pending');
      setPasses(response.data);
    } catch (error) {
      toast.error('Failed to fetch pending passes');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (passId) => {
    try {
      await api.put(`/pass/${passId}/approve`);
      toast.success('Pass approved successfully!');
      fetchPendingPasses();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to approve pass');
    }
  };

  const handleReject = async (passId) => {
    try {
      await api.put(`/pass/${passId}/reject`);
      toast.success('Pass rejected successfully!');
      fetchPendingPasses();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reject pass');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  return (
    <Layout>
      <Card title="Pending Approvals">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : passes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No pending approvals
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Pass Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Purpose
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Visitor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {passes.map((pass) => (
                  <tr key={pass._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {pass.passCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {pass.employee?.username || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {pass.passType}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {pass.purpose}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {pass.visitorName || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {pass.itemDescription || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="pending">
                        {pass.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(pass.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <Button
                          variant="success"
                          onClick={() => handleApprove(pass._id)}
                          className="text-xs"
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleReject(pass._id)}
                          className="text-xs"
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </Layout>
  );
};

export default Approvals;
