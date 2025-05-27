
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { InventoryIcon, CustomersIcon, CreateQuoteIcon, CreateInvoiceIcon } from './icons';

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label }) => {
  const location = useLocation();
  // Active state could be path-based or more complex if needed
  const isActive = location.pathname.startsWith(to) || (label === 'New' && (location.pathname === '/new-invoice' || location.pathname === '/new-quotation'));


  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center flex-1 p-2 rounded-md
                  transition-colors duration-150 ease-in-out group
                  ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary-dark'}`}
    >
      <span className={`transform transition-transform duration-150 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
        {icon}
      </span>
      <span className={`mt-1 text-xs font-medium ${isActive ? 'text-primary' : 'text-gray-500 group-hover:text-primary-dark'}`}>
        {label}
      </span>
    </Link>
  );
};


const BottomNavbar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-200 shadow-top p-2 z-20 print-hide md:hidden">
      <div className="container mx-auto flex justify-around items-center max-w-md">
        <NavLink to="/inventory" icon={<InventoryIcon className="w-6 h-6" />} label="Inventory" />
        <NavLink to="/customers" icon={<CustomersIcon className="w-6 h-6" />} label="Customers" />
        {/* Using a more generic "New" approach. Could also be two separate icons. */}
        {/* For simplicity, one "Create Quotation" icon for now, can make it lead to a choice or default to quotes */}
        <NavLink to="/new-quotation" icon={<CreateQuoteIcon className="w-7 h-7 text-primary" />} label="New Quote" />
        <NavLink to="/new-invoice" icon={<CreateInvoiceIcon className="w-7 h-7 text-primary" />} label="New Invoice" />
      </div>
       <style>{`
        .shadow-top {
          box-shadow: 0 -2px 4px -1px rgba(0, 0, 0, 0.06), 0 -4px 5px -2px rgba(0, 0, 0, 0.04);
        }
      `}</style>
    </nav>
  );
};

export default BottomNavbar;
