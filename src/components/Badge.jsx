const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-200 text-gray-800',
    pending: 'bg-yellow-200 text-yellow-800',
    approved: 'bg-green-200 text-green-800',
    rejected: 'bg-red-200 text-red-800',
    issued: 'bg-blue-200 text-blue-800',
    closed: 'bg-gray-400 text-white',
    success: 'bg-green-200 text-green-800',
    danger: 'bg-red-200 text-red-800',
    warning: 'bg-yellow-200 text-yellow-800',
  };

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${variants[variant] || variants.default}`}>
      {children}
    </span>
  );
};

export default Badge;
