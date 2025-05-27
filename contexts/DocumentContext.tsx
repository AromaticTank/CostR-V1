
import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { 
    Document, AppSettings, DocumentContextType, DocumentType, CompanyInfo, 
    Customer, InventoryItem, PaymentTransaction, UserSlot, PDFTemplate
} from '../types';
import { DEFAULT_SETTINGS, EMPTY_COMPANY_INFO, DEFAULT_ADMIN_USER_SLOT, MAX_USER_SLOTS } from '../constants';

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useLocalStorage<Document[]>('documents', []);
  const [settings, setSettings] = useLocalStorage<AppSettings>('appSettings', DEFAULT_SETTINGS);
  const [customers, setCustomers] = useLocalStorage<Customer[]>('customers', []);
  const [inventoryItems, setInventoryItems] = useLocalStorage<InventoryItem[]>('inventoryItems', []);
  const [paymentTransactions, setPaymentTransactions] = useLocalStorage<PaymentTransaction[]>('paymentTransactions', []);

  const lightenDarkenColor = (col: string, amt: number): string => {
    let usePound = false;
    if (col.startsWith("#")) {
        col = col.slice(1);
        usePound = true;
    }
    const num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    if (r > 255) r = 255; else if (r < 0) r = 0;
    let g = ((num >> 8) & 0x00FF) + amt; // Corrected from b to g
    if (g > 255) g = 255; else if (g < 0) g = 0;
    let b = (num & 0x0000FF) + amt; // Corrected from g to b
    if (b > 255) b = 255; else if (b < 0) b = 0;
    
    const hex = (r << 16 | g << 8 | b).toString(16).padStart(6, '0'); // Reordered r,g,b for correct hex
    return (usePound ? "#" : "") + hex;
  };
  
  const applyTheme = (primaryColor: string, secondaryColor: string) => {
    document.documentElement.style.setProperty('--color-primary-DEFAULT', primaryColor);
    document.documentElement.style.setProperty('--color-primary-light', lightenDarkenColor(primaryColor, 40)); // Adjusted amount for more noticeable lightness
    document.documentElement.style.setProperty('--color-primary-dark', lightenDarkenColor(primaryColor, -30)); // Adjusted amount
    document.documentElement.style.setProperty('--color-secondary-DEFAULT', secondaryColor);
    document.documentElement.style.setProperty('--color-secondary-light', lightenDarkenColor(secondaryColor, 40));
    document.documentElement.style.setProperty('--color-secondary-dark', lightenDarkenColor(secondaryColor, -30));
  };


  useEffect(() => {
    if (settings.isSetupComplete) {
      applyTheme(settings.primaryColor, settings.secondaryColor);
    } else {
      // Apply default theme from constants if not setup
      applyTheme(DEFAULT_SETTINGS.primaryColor, DEFAULT_SETTINGS.secondaryColor);
    }
  }, [settings.primaryColor, settings.secondaryColor, settings.isSetupComplete]);

  // Document CRUD
  const addDocument = (doc: Document) => setDocuments((prevDocs: Document[]) => [...prevDocs, doc]);
  const updateDocument = (updatedDoc: Document) => setDocuments((prevDocs: Document[]) => prevDocs.map(doc => (doc.id === updatedDoc.id ? updatedDoc : doc)));
  const deleteDocument = (id: string) => setDocuments((prevDocs: Document[]) => prevDocs.filter(doc => doc.id !== id));
  const getDocumentById = (id: string): Document | undefined => documents.find(doc => doc.id === id);
  const generateDocumentNumber = (docType: DocumentType): string => {
    const prefix = docType === DocumentType.Invoice ? 'INV' : 'QT';
    const relevantDocs = documents.filter(d => d.docType === docType);
    const lastNum = relevantDocs.reduce((max, doc) => {
        const numPart = doc.docNumber.split('-').pop();
        const currentNum = numPart ? parseInt(numPart, 10) : 0;
        return Math.max(max, currentNum);
    }, 0);
    return `${prefix}-${String(lastNum + 1).padStart(4, '0')}`;
  };

  // Settings
  const updateSettingsContext = (newPartialSettings: Partial<AppSettings>) => { // Renamed to avoid conflict
    setSettings(prev => {
      const updatedSettings = {...prev, ...newPartialSettings};
      // Ensure primaryColor and secondaryColor exist before trying to apply theme
      if (updatedSettings.primaryColor && updatedSettings.secondaryColor) {
         applyTheme(updatedSettings.primaryColor, updatedSettings.secondaryColor);
      }
      return updatedSettings;
    });
  };

  const completeSetup = (companyName: string, companyEmail: string, currency: string, pColor: string, sColor: string) => {
    const newCompanyInfo: CompanyInfo = { ...EMPTY_COMPANY_INFO, name: companyName, email: companyEmail };
    const adminUserSlot: UserSlot = {
        ...DEFAULT_ADMIN_USER_SLOT,
        name: `${companyName} Admin`, 
        id: crypto.randomUUID(), 
    };
    const newSettings: AppSettings = {
      ...DEFAULT_SETTINGS, 
      company: newCompanyInfo,
      defaultCurrency: currency,
      primaryColor: pColor,
      secondaryColor: sColor,
      selectedPdfTemplate: settings.selectedPdfTemplate || PDFTemplate.Template1,
      userSlots: [adminUserSlot], 
      maxUserSlots: MAX_USER_SLOTS,
      isSetupComplete: true,
    };
    setSettings(newSettings); // setSettings will trigger useEffect for applyTheme
  };

  // Customer CRUD
  const addCustomer = (customer: Customer) => setCustomers(prev => [...prev, customer]);
  const updateCustomer = (updatedCustomer: Customer) => setCustomers(prev => prev.map(c => (c.id === updatedCustomer.id ? updatedCustomer : c)));
  const deleteCustomer = (id: string) => setCustomers(prev => prev.filter(c => c.id !== id));
  const getCustomerById = (id: string): Customer | undefined => customers.find(c => c.id === id);

  // InventoryItem CRUD
  const addInventoryItem = (item: InventoryItem) => setInventoryItems(prev => [...prev, item]);
  const updateInventoryItem = (updatedItem: InventoryItem) => setInventoryItems(prev => prev.map(i => (i.id === updatedItem.id ? updatedItem : i)));
  const deleteInventoryItem = (id: string) => setInventoryItems(prev => prev.filter(i => i.id !== id));
  const getInventoryItemById = (id: string): InventoryItem | undefined => inventoryItems.find(i => i.id === id);
  const adjustInventoryStock = (itemId: string, quantityChange: number) => {
    setInventoryItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId 
        ? { ...item, quantityOnHand: Math.max(0, item.quantityOnHand + quantityChange) }
        : item
      )
    );
  };

  // PaymentTransaction CRUD
  const addPaymentTransaction = (transaction: PaymentTransaction) => setPaymentTransactions(prev => [...prev, transaction]);
  const updatePaymentTransaction = (updatedTransaction: PaymentTransaction) => setPaymentTransactions(prev => prev.map(t => (t.id === updatedTransaction.id ? updatedTransaction : t)));
  const deletePaymentTransaction = (id: string) => setPaymentTransactions(prev => prev.filter(t => t.id !== id));
  const getPaymentTransactionById = (id: string): PaymentTransaction | undefined => paymentTransactions.find(t => t.id === id);

  // User Slot Management
  const addUserSlot = (name: string, role: string): string | null => {
    if (settings.userSlots.length >= settings.maxUserSlots) {
      alert(`You can only add up to ${settings.maxUserSlots} users.`);
      return null;
    }
    const newSlot: UserSlot = {
      id: crypto.randomUUID(),
      name,
      role,
      isActive: true,
      isPrimaryAdmin: false,
    };
    updateSettingsContext({ userSlots: [...settings.userSlots, newSlot] });
    return newSlot.id;
  };

  const updateUserSlot = (slotId: string, name: string, role: string) => {
    const updatedSlots = settings.userSlots.map(slot =>
      slot.id === slotId ? { ...slot, name, role } : slot
    );
    updateSettingsContext({ userSlots: updatedSlots });
  };

  const deleteUserSlot = (slotId: string) => {
    const slotToDelete = settings.userSlots.find(slot => slot.id === slotId);
    if (slotToDelete && slotToDelete.isPrimaryAdmin) {
      alert("The primary admin user slot cannot be deleted.");
      return;
    }
    if (settings.userSlots.length <= 1) {
        alert("You must have at least one user slot.");
        return;
    }
    const updatedSlots = settings.userSlots.filter(slot => slot.id !== slotId);
    updateSettingsContext({ userSlots: updatedSlots });
  };

  return (
    <DocumentContext.Provider value={{ 
        documents, settings, customers, inventoryItems, paymentTransactions,
        addDocument, updateDocument, deleteDocument, getDocumentById, generateDocumentNumber,
        updateSettings: updateSettingsContext, // Use renamed function
        completeSetup,
        addCustomer, updateCustomer, deleteCustomer, getCustomerById,
        addInventoryItem, updateInventoryItem, deleteInventoryItem, getInventoryItemById, adjustInventoryStock,
        addPaymentTransaction, updatePaymentTransaction, deletePaymentTransaction, getPaymentTransactionById,
        addUserSlot, updateUserSlot, deleteUserSlot
    }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = (): DocumentContextType => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
};