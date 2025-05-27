
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Document, DocumentType } from '../types';
import { useDocuments } from '../contexts/DocumentContext';
import { TrashIcon, PencilIcon, EyeIcon } from './icons';

interface DocumentCardProps {
  doc: Document;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ doc }) => {
  const { deleteDocument, settings } = useDocuments();
  const navigate = useNavigate();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation
    if (window.confirm(`Are you sure you want to delete ${doc.docType} ${doc.docNumber}?`)) {
      deleteDocument(doc.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit/${doc.id}`);
  };
  
  const handleView = () => {
    navigate(`/view/${doc.id}`);
  };
  
  const badgeColor = doc.docType === DocumentType.Invoice ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  const currencyFormat = new Intl.NumberFormat(undefined, { style: 'currency', currency: doc.currency || settings.defaultCurrency });

  return (
    <div 
        className="bg-surface shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow cursor-pointer flex flex-col justify-between"
        onClick={handleView}
    >
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-primary-dark">{doc.docNumber}</h3>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeColor}`}>{doc.docType}</span>
        </div>
        <p className="text-gray-700 text-sm mb-1">
          <span className="font-medium">Client:</span> {doc.client.name || 'N/A'}
        </p>
        <p className="text-gray-700 text-sm mb-1">
          <span className="font-medium">Date:</span> {new Date(doc.issueDate).toLocaleDateString()}
        </p>
        <p className="text-xl font-bold text-onSurface mt-3 mb-4">
          {currencyFormat.format(doc.total)}
        </p>
      </div>
      <div className="mt-auto flex justify-end space-x-2 pt-4 border-t border-gray-200">
        <button
            onClick={handleView}
            className="p-2 text-gray-500 hover:text-primary transition-colors rounded-full hover:bg-primary-light/20"
            title="View"
        >
            <EyeIcon className="w-5 h-5" />
        </button>
        <button
          onClick={handleEdit}
          className="p-2 text-gray-500 hover:text-secondary transition-colors rounded-full hover:bg-secondary/20"
          title="Edit"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 text-gray-500 hover:text-danger transition-colors rounded-full hover:bg-danger/20"
          title="Delete"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default DocumentCard;
