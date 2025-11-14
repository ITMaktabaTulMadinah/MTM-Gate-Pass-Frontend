import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const roleCards = {
    employee: [
      {
        title: 'Create Pass',
        description: 'Request a new gate pass for entry, exit, or visitor',
        icon: '📝',
        action: () => navigate('/create-pass'),
        buttonText: 'Create New Pass'
      },
      {
        title: 'My Passes',
        description: 'View all your gate pass requests and their status',
        icon: '📋',
        action: () => navigate('/my-passes'),
        buttonText: 'View My Passes'
      }
    ],
    supervisor: [
      {
        title: 'Pending Approvals',
        description: 'Review and approve pending gate pass requests',
        icon: '✅',
        action: () => navigate('/approvals'),
        buttonText: 'View Approvals'
      },
      {
        title: 'My Passes',
        description: 'View all gate pass requests',
        icon: '📋',
        action: () => navigate('/my-passes'),
        buttonText: 'View Passes'
      }
    ],
    admin: [
      {
        title: 'Pending Approvals',
        description: 'Review and approve pending gate pass requests',
        icon: '✅',
        action: () => navigate('/approvals'),
        buttonText: 'View Approvals'
      },
      {
        title: 'My Passes',
        description: 'View all gate pass requests in the system',
        icon: '📋',
        action: () => navigate('/my-passes'),
        buttonText: 'View All Passes'
      }
    ],
    guard: [
      {
        title: 'Scan QR Code',
        description: 'Scan gate pass QR codes to verify and process',
        icon: '📷',
        action: () => navigate('/scan'),
        buttonText: 'Open Scanner'
      }
    ]
  };

  const cards = roleCards[user?.role] || [];

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome, {user?.username}!
        </h1>
        <p className="text-gray-600 mb-8">
          Role: <span className="font-semibold capitalize">{user?.role}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="text-6xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 mb-6">{card.description}</p>
                <Button onClick={card.action} variant="primary" className="w-full">
                  {card.buttonText}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
