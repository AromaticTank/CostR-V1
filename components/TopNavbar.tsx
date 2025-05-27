import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuBarIcon, UserProfileIcon } from './icons';
import { APP_NAME } from '../constants'; // APP_NAME is now "CostR"

interface TopNavbarProps {
  onMenuClick: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ onMenuClick }) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname.toLowerCase();
    if (path === '/dashboard') return 'Dashboard';
    if (path.startsWith('/quotes')) return 'Quotations';
    if (path.startsWith('/invoices')) return 'Invoices';
    if (path.startsWith('/documents')) return 'All Documents';
    if (path.startsWith('/new-quotation')) return 'New Quotation';
    if (path.startsWith('/new-invoice')) return 'New Invoice';
    if (path.startsWith('/edit/')) return 'Edit Document';
    if (path.startsWith('/view/')) return 'View Document';
    if (path.startsWith('/customers/new')) return 'New Customer';
    if (path.startsWith('/customers/edit')) return 'Edit Customer';
    if (path.startsWith('/customers')) return 'Customers';
    if (path.startsWith('/inventory/new')) return 'New Inventory Item';
    if (path.startsWith('/inventory/edit')) return 'Edit Inventory Item';
    if (path.startsWith('/inventory')) return 'Inventory';
    if (path.startsWith('/payments/new')) return 'New Payment';
    if (path.startsWith('/payments/edit')) return 'Edit Payment';
    if (path.startsWith('/payments-in')) return 'Payments In';
    if (path.startsWith('/payments-out')) return 'Expenses';
    if (path.startsWith('/reports')) return 'Reports';
    if (path.startsWith('/my-business')) return 'My Business';
    if (path.startsWith('/settings')) return 'Settings';
    if (path.startsWith('/setup')) return 'Setup Your Business';
    return APP_NAME; // Default title "CostR"
  };

  return (
    <header className="bg-surface shadow-md sticky top-0 z-20 print-hide">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="text-onSurface hover:text-primary p-2 rounded-full mr-2 md:mr-4 focus:outline-none focus:ring-2 focus:ring-primary-light"
              aria-label="Open menu"
            >
              <MenuBarIcon className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-onSurface whitespace-nowrap overflow-hidden overflow-ellipsis">
              {getPageTitle()}
            </h1>
          </div>
          <div className="flex items-center">
            <Link
              to="/settings" 
              className="text-onSurface hover:text-primary p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-light"
              aria-label="User Profile and Settings"
            >
              <UserProfileIcon className="w-7 h-7" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;