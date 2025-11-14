import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import api from '../config/api';
import toast from 'react-hot-toast';

const SecurityScan = () => {
  const [scanning, setScanning] = useState(false);
  const [passData, setPassData] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleScan = async (detectedCodes) => {
    if (!detectedCodes || !Array.isArray(detectedCodes) || detectedCodes.length === 0 || processing) {
      return;
    }

    try {
      setProcessing(true);
      setScanning(false);

      const code = detectedCodes[0]?.rawValue;
      if (!code) {
        toast.error('Invalid QR code');
        setProcessing(false);
        return;
      }

      const response = await api.post(`/pass/${code}/scan`);
      setPassData(response.data);
      toast.success('Pass scanned successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to scan pass');
      setPassData(null);
    } finally {
      setProcessing(false);
    }
  };

  const handleIssue = async () => {
    if (!passData) return;

    try {
      await api.put(`/pass/${passData._id}/issue`);
      toast.success('Pass issued successfully!');
      setPassData({ ...passData, status: 'issued' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to issue pass');
    }
  };

  const handleClose = async () => {
    if (!passData) return;

    try {
      await api.put(`/pass/${passData._id}/close`);
      toast.success('Pass closed successfully!');
      setPassData({ ...passData, status: 'closed' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to close pass');
    }
  };

  const startScanning = () => {
    setScanning(true);
    setPassData(null);
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="QR Code Scanner">
          {!scanning && !passData && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-gray-600 mb-6">
                Click the button below to start scanning
              </p>
              <Button onClick={startScanning} variant="primary">
                Start Scanning
              </Button>
            </div>
          )}

          {scanning && (
            <div>
              <Scanner
                onScan={handleScan}
                onError={(error) => console.error(error)}
                constraints={{ facingMode: 'environment' }}
              />
              <div className="mt-4 text-center">
                <Button
                  onClick={() => setScanning(false)}
                  variant="outline"
                >
                  Cancel Scanning
                </Button>
              </div>
            </div>
          )}

          {processing && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Processing...</p>
            </div>
          )}
        </Card>

        <Card title="Pass Details">
          {!passData ? (
            <div className="text-center py-12 text-gray-500">
              Scan a QR code to view pass details
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="font-semibold text-gray-700">Pass Code:</label>
                <p className="text-gray-900 text-lg">{passData.passCode}</p>
              </div>

              <div>
                <label className="font-semibold text-gray-700">Status:</label>
                <div className="mt-1">
                  <Badge variant={getStatusVariant(passData.status)}>
                    {passData.status}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700">Employee:</label>
                <p className="text-gray-900">{passData.employee?.username || 'N/A'}</p>
              </div>

              <div>
                <label className="font-semibold text-gray-700">Type:</label>
                <p className="text-gray-900 capitalize">{passData.passType}</p>
              </div>

              <div>
                <label className="font-semibold text-gray-700">Purpose:</label>
                <p className="text-gray-900">{passData.purpose}</p>
              </div>

              {passData.visitorName && (
                <div>
                  <label className="font-semibold text-gray-700">Visitor Name:</label>
                  <p className="text-gray-900">{passData.visitorName}</p>
                </div>
              )}

              {passData.itemDescription && (
                <div>
                  <label className="font-semibold text-gray-700">Items:</label>
                  <p className="text-gray-900">{passData.itemDescription}</p>
                </div>
              )}

              {passData.expectedReturnTime && (
                <div>
                  <label className="font-semibold text-gray-700">Expected Return:</label>
                  <p className="text-gray-900">{formatDate(passData.expectedReturnTime)}</p>
                </div>
              )}

              <div className="pt-4 space-y-2">
                {passData.status === 'approved' && (
                  <Button
                    onClick={handleIssue}
                    variant="success"
                    className="w-full"
                  >
                    Issue Pass
                  </Button>
                )}

                {passData.status === 'issued' && (
                  <Button
                    onClick={handleClose}
                    variant="primary"
                    className="w-full"
                  >
                    Close Pass
                  </Button>
                )}

                {passData.status === 'pending' && (
                  <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                    This pass is pending approval
                  </div>
                )}

                {passData.status === 'rejected' && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    This pass has been rejected
                  </div>
                )}

                {passData.status === 'closed' && (
                  <div className="bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded">
                    This pass has been closed
                  </div>
                )}

                <Button
                  onClick={startScanning}
                  variant="outline"
                  className="w-full"
                >
                  Scan Another Pass
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default SecurityScan;
