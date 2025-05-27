
import React from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon } from './icons';

interface FloatingActionButtonProps {
  to: string;
  title?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ to, title = "Add New" }) => {
  return (
    <Link
      to={to}
      title={title}
      className="fixed bottom-6 right-6 bg-primary hover:bg-primary-dark text-onPrimary p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50"
    >
      <PlusIcon className="w-7 h-7" />
    </Link>
  );
};

export default FloatingActionButton;
