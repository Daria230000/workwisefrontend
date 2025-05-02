
import React from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const PlaceholderPage: React.FC = () => {
  const location = useLocation();
  const pageName = location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.substring(2);

  return (
    <DashboardLayout>
      <div className="flex h-[80vh] flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-workwise-text mb-4">{pageName} Page</h1>
        <p className="text-workwise-darkGray max-w-md">
          This is a placeholder for the {pageName} page. It would include all the functionality described in the WorkWise MVP UI requirements.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default PlaceholderPage;
