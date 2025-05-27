import React, { useState, useMemo } from 'react';
import { InventoryItem } from '../types';
import { useDocuments } from '../contexts/DocumentContext';
// fix: Remove comment from import statement to fix "String literal expected" and subsequent parsing errors
import { SearchIcon, PlusIcon } from './icons';

interface InventorySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: InventoryItem) => void;
}

const InventorySelectionModal: React.FC<InventorySelectionModalProps> = ({ isOpen, onClose, onSelectItem }) => {
  const { inventoryItems, settings } = useDocuments();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm) return inventoryItems;
    return inventoryItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.sku && item.sku.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [inventoryItems, searchTerm]);

  const currencyFormat = (amount: number) => new Intl.NumberFormat(undefined, { style: 'currency', currency: settings.defaultCurrency }).format(amount);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-surface p-5 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-onSurface">Select Inventory Item</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        <div className="overflow-y-auto flex-grow pr-2 scrollbar-thin space-y-2">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectItem(item);
                  onClose();
                }}
                className="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-primary-light/20 rounded-md text-left transition-colors"
                disabled={item.quantityOnHand <= 0} // Optionally disable if out of stock
              >
                <div>
                  <p className="font-medium text-onSurface">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    SKU: {item.sku || 'N/A'} | Stock: {item.quantityOnHand}
                    {item.quantityOnHand <= 0 && <span className="text-danger ml-2">(Out of stock)</span>}
                  </p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-semibold text-primary-dark">{currencyFormat(item.unitPrice)}</p>
                    <PlusIcon className="w-5 h-5 text-primary group-hover:text-primary-dark mt-1 ml-auto"/>
                </div>
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No items match your search, or inventory is empty.</p>
          )}
        </div>

        <button 
            onClick={onClose} 
            className="mt-6 w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default InventorySelectionModal;