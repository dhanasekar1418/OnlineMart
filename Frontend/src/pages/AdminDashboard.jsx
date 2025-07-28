import React from 'react';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.user);

  if (!user || !user.isAdmin) {
    return <p className="text-center mt-10 text-red-500">Access denied</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <p>Manage products, orders, users here.</p>
    </div>
  );
};

export default AdminDashboard;
