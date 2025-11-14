import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import Button from '../components/Button';
import api from '../config/api';
import toast from 'react-hot-toast';

const MyPasses = () => {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPass, setSelectedPass] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPasses();
  }, []);

  const fetchPasses = async () => {
    try {
      const response = await api.get('/pass');
      setPasses(response.data);
    } catch (error) {
      toast.error('Failed to fetch passes');
    } finally {
      setLoading(false);
    }
  };

  const viewPass = (pass) => {
    setSelectedPass(pass);
    setShowModal(true);
  };

  const getStatusVariant = (status) => {
    const variants = {
      pending: 'pending',
      approved: 'approved',
      rejected: 'rejected',
      issued: 'issued',
      closed: 'closed',
    };
    return variants[status] || 'default';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  return (
    <Layout>
      <Card title="My Gate Passes">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : passes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No gate passes found
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
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Purpose
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {pass.passType}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {pass.purpose}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusVariant(pass.status)}>
                        {pass.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(pass.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Button
                        variant="outline"
                        onClick={() => viewPass(pass)}
                        className="text-xs"
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Pass Details"
        footer={
          <Button variant="outline" onClick={() => setShowModal(false)}>
            Close
          </Button>
        }
      >
        {selectedPass && (
          <div className="space-y-4">
            <div>
              <label className="font-semibold text-gray-700">Pass Code:</label>
              <p className="text-gray-900">{selectedPass.passCode}</p>
            </div>
            <div>
              <label className="font-semibold text-gray-700">Status:</label>
              <div className="mt-1">
                <Badge variant={getStatusVariant(selectedPass.status)}>
                  {selectedPass.status}
                </Badge>
              </div>
            </div>
            <div>
              <label className="font-semibold text-gray-700">Type:</label>
              <p className="text-gray-900 capitalize">{selectedPass.passType}</p>
            </div>
            <div>
              <label className="font-semibold text-gray-700">Purpose:</label>
              <p className="text-gray-900">{selectedPass.purpose}</p>
            </div>
            {selectedPass.visitorName && (
              <div>
                <label className="font-semibold text-gray-700">Visitor Name:</label>
                <p className="text-gray-900">{selectedPass.visitorName}</p>
              </div>
            )}
            {selectedPass.itemDescription && (
              <div>
                <label className="font-semibold text-gray-700">Items:</label>
                <p className="text-gray-900">{selectedPass.itemDescription}</p>
              </div>
            )}
            {selectedPass.expectedReturnTime && (
              <div>
                <label className="font-semibold text-gray-700">Expected Return:</label>
                <p className="text-gray-900">{formatDate(selectedPass.expectedReturnTime)}</p>
              </div>
            )}
            <div>
              <label className="font-semibold text-gray-700">Created:</label>
              <p className="text-gray-900">{formatDate(selectedPass.createdAt)}</p>
            </div>
            {selectedPass.qrCode && (
              <div className="text-center">
                <label className="font-semibold text-gray-700 block mb-2">QR Code:</label>
                <img
                  src={selectedPass.qrCode}
                  alt="QR Code"
                  className="mx-auto border-2 border-gray-300 p-2"
                />
              </div>
            )}
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default MyPasses;
