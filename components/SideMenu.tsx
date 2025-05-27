
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  DashboardIcon, CustomersIcon, InventoryIcon, QuotesIcon, InvoicesIcon,
  PaymentsInIcon, PaymentsOutIcon, ReportsIcon, MyBusinessIcon, SettingsMenuIcon,
  // LogoutMenuIcon // Currently unused
} from './icons';
import AnimatedLogo from './AnimatedLogo'; // Corrected: Ensure this path is relative if it wasn't. Default import is correct.
import { useDocuments } from '../contexts/DocumentContext';


interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClose: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, onClose }) => {
  const location = useLocation();
  // Updated isActive logic for dashboard to be more specific and avoid conflict if other routes start with /dashboard
  const isActive = location.pathname === to || (label === "Dashboard" && location.pathname === "/dashboard");


  return (
    <Link
      to={to}
      onClick={onClose}
      className={`flex items-center px-4 py-3 text-base rounded-lg transition-colors duration-150 ease-in-out group
                  ${isActive ? 'bg-primary-light/20 text-primary-dark font-semibold' : 'text-onBackground hover:bg-gray-100 hover:text-primary-dark'}`}
    >
      <span className={`mr-4 ${isActive ? 'text-primary-dark' : 'text-gray-500 group-hover:text-primary-dark'}`}>{icon}</span>
      {label}
    </Link>
  );
};

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const { settings } = useDocuments();

  const menuItems = [
    { to: '/dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
    { to: '/customers', icon: <CustomersIcon />, label: 'Customers' },
    { to: '/inventory', icon: <InventoryIcon />, label: 'Inventory' },
    { to: '/quotes', icon: <QuotesIcon />, label: 'Quotes' },
    { to: '/invoices', icon: <InvoicesIcon />, label: 'Invoices' },
    { to: '/payments-in', icon: <PaymentsInIcon />, label: 'Payments In' },
    { to: '/payments-out', icon: <PaymentsOutIcon />, label: 'Payments Out' },
    { to: '/reports', icon: <ReportsIcon />, label: 'Reports' },
    { to: '/my-business', icon: <MyBusinessIcon />, label: 'My Business' },
    { to: '/settings', icon: <SettingsMenuIcon />, label: 'Settings' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 z-30 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* Side Menu Panel */}
      <aside
        className={`fixed top-0 left-0 w-72 h-full bg-surface shadow-xl z-40 transform transition-transform duration-300 ease-in-out print-hide ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Main navigation"
      >
        <div className="flex flex-col h-full">
          <div className="px-6 py-4 border-b border-gray-200">
            <Link to="/dashboard" onClick={onClose} className="block">
              <AnimatedLogo 
                className="items-start" 
                textClassName="text-3xl font-semibold" 
                sloganClassName="text-xs font-light text-gray-500"
                showSlogan={true} 
              />
            </Link>
          </div>

          <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
            {menuItems.map(item => (
              <NavItem key={item.to} {...item} onClose={onClose} />
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
             {settings.company.name && (
                <div className="text-xs text-gray-500 text-center">
                    <p className="font-medium">{settings.company.name}</p>
                    <p>{settings.company.email}</p>
                </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideMenu;
