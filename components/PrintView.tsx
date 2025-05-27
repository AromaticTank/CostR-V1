
import React from 'react';
import { Document, DocumentType } from '../types';

interface PrintViewProps {
  doc: Document;
}

const PrintView: React.FC<PrintViewProps> = ({ doc }) => {
  const {
    docType, docNumber, company, client, issueDate, dueDate, items,
    notes, currency, subtotal, taxRate, taxAmount, total
  } = doc;

  const currencyFormat = new Intl.NumberFormat(undefined, { style: 'currency', currency: currency });

  return (
    <div className="bg-white p-8 md:p-12 shadow-lg print-friendly-page">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          {company.logoUrl && <img src={company.logoUrl} alt={`${company.name} Logo`} className="h-16 mb-4 object-contain" />}
          <h1 className="text-3xl font-bold text-primary-dark">{docType.toUpperCase()}</h1>
          <p className="text-gray-600"># {docNumber}</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-semibold text-gray-800">{company.name}</h2>
          <p className="text-sm text-gray-500">{company.address}</p>
          {company.email && <p className="text-sm text-gray-500">{company.email}</p>}
          {company.phone && <p className="text-sm text-gray-500">{company.phone}</p>}
          {company.taxId && <p className="text-sm text-gray-500">Tax ID: {company.taxId}</p>}
        </div>
      </div>

      {/* Client & Dates */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">Bill To</h3>
          <p className="text-lg font-medium text-gray-800">{client.name}</p>
          <p className="text-sm text-gray-500">{client.address}</p>
          {client.email && <p className="text-sm text-gray-500">{client.email}</p>}
          {client.phone && <p className="text-sm text-gray-500">{client.phone}</p>}
        </div>
        <div className="text-left md:text-right">
          <p className="text-sm text-gray-700"><span className="font-semibold">Issue Date:</span> {new Date(issueDate).toLocaleDateString()}</p>
          {dueDate && <p className="text-sm text-gray-700"><span className="font-semibold">Due Date:</span> {new Date(dueDate).toLocaleDateString()}</p>}
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="py-3 px-4 font-semibold">Description</th>
              <th className="py-3 px-4 font-semibold text-right">Qty</th>
              <th className="py-3 px-4 font-semibold text-right">Unit Price</th>
              <th className="py-3 px-4 font-semibold text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-3 px-4">{item.description}</td>
                <td className="py-3 px-4 text-right">{item.quantity}</td>
                <td className="py-3 px-4 text-right">{currencyFormat.format(item.unitPrice)}</td>
                <td className="py-3 px-4 text-right">{currencyFormat.format(item.quantity * item.unitPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium text-gray-800">{currencyFormat.format(subtotal)}</span>
          </div>
          {taxRate > 0 && (
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tax ({taxRate}%):</span>
              <span className="font-medium text-gray-800">{currencyFormat.format(taxAmount)}</span>
            </div>
          )}
          <div className="flex justify-between py-2 border-t-2 border-gray-300 mt-2">
            <span className="text-xl font-bold text-gray-800">Total:</span>
            <span className="text-xl font-bold text-gray-800">{currencyFormat.format(total)}</span>
          </div>
        </div>
      </div>

      {/* Notes & Bank Details */}
      {(notes || company.bankDetails) && (
        <div className="mt-8 pt-4 border-t border-gray-200">
          {notes && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-1">Notes:</h4>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{notes}</p>
            </div>
          )}
          {company.bankDetails && (
             <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-1">Payment Details:</h4>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{company.bankDetails}</p>
            </div>
          )}
        </div>
      )}
      
      <style>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print-hide { display: none; }
          .print-friendly-page {
             box-shadow: none !important;
             margin: 0 auto;
             padding: 0.5in; /* Standard A4 margins approximation */
             width: 210mm; /* A4 width */
             min-height: 297mm; /* A4 height */
          }
        }
      `}</style>
    </div>
  );
};

export default PrintView;
