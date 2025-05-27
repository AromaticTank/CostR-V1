
import React from 'react';
import { LineItem } from '../types';
import { TrashIcon } from './icons';

interface LineItemRowProps {
  item: LineItem;
  index: number;
  onChange: (index: number, field: keyof LineItem, value: string | number) => void;
  onRemove: (index: number) => void;
  currency: string;
}

const LineItemRow: React.FC<LineItemRowProps> = ({ item, index, onChange, onRemove, currency }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange(index, name as keyof LineItem, name === 'quantity' || name === 'unitPrice' ? parseFloat(value) || 0 : value);
  };

  const total = item.quantity * item.unitPrice;
  const currencyFormat = new Intl.NumberFormat(undefined, { style: 'currency', currency: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 });


  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start p-3 bg-gray-50 rounded-lg mb-3">
      <div className="md:col-span-4">
        <label htmlFor={`item-desc-${index}`} className="block text-sm font-medium text-gray-700 sr-only">Description</label>
        <textarea
          id={`item-desc-${index}`}
          name="description"
          value={item.description}
          onChange={handleInputChange}
          placeholder="Item Description"
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
        />
      </div>
      <div className="md:col-span-2">
        <label htmlFor={`item-qty-${index}`} className="block text-sm font-medium text-gray-700 sr-only">Quantity</label>
        <input
          type="number"
          id={`item-qty-${index}`}
          name="quantity"
          value={item.quantity}
          onChange={handleInputChange}
          placeholder="Qty"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
        />
      </div>
      <div className="md:col-span-2">
        <label htmlFor={`item-price-${index}`} className="block text-sm font-medium text-gray-700 sr-only">Unit Price</label>
        <input
          type="number"
          id={`item-price-${index}`}
          name="unitPrice"
          value={item.unitPrice}
          onChange={handleInputChange}
          placeholder="Price"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
        />
      </div>
      <div className="md:col-span-3 flex items-center justify-end pt-1 md:pt-3">
        <span className="text-gray-800 font-medium sm:text-sm">
          {currencyFormat.format(total)}
        </span>
      </div>
      <div className="md:col-span-1 flex items-center justify-end md:justify-center pt-1 md:pt-2">
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-danger hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
          title="Remove item"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default LineItemRow;
