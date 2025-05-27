export enum DocumentType {
  Invoice = 'Invoice',
  Quotation = 'Quotation',
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  inventoryItemId?: string; // Optional: to link to an inventory item
}

export interface ClientInfo {
  name: string;
  email: string;
  address: string;
  phone?: string;
}

export interface CompanyInfo {
  name: string;
  address: string;
  email?: string;
  phone?: string;
  logoUrl?: string;
  bankDetails?: string;
  taxId?: string;
}

export enum PDFTemplate {
  Template1 = "Template1", // Standard
  Template2 = "Template2", // Modern
  Template3 = "Template3", // Receipt
}

export interface UserSlot {
  id: string;
  name: string;
  role: string; // e.g., 'Admin', 'Sales User'
  isActive: boolean; // Not directly used for login, but for admin to manage
  isPrimaryAdmin: boolean; // Identifies the initial/main admin account
}

export interface AppSettings {
  company: CompanyInfo;
  defaultCurrency: string;
  defaultTaxRate: number; // Percentage
  secondaryTaxRate?: number; // Optional secondary tax rate
  selectedPdfTemplate: PDFTemplate;
  isSetupComplete: boolean;
  primaryColor: string;
  secondaryColor: string;
  userSlots: UserSlot[];
  maxUserSlots: number;
}

export interface Document {
  id:string;
  docType: DocumentType;
  docNumber: string;
  client: ClientInfo; // Could be linked to a Customer ID
  customerId?: string; // Optional: Link to a full customer record
  company: CompanyInfo;
  issueDate: string; // ISO date string YYYY-MM-DD
  dueDate?: string; // ISO date string YYYY-MM-DD
  items: LineItem[];
  notes?: string;
  currency: string;
  taxRate: number; // Percentage
  // secondaryTaxAmount?: number; // If using secondary tax
  subtotal: number;
  taxAmount: number;
  total: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  status?: 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Void'; // For invoices
  // createdByUserId?: string; // Optional: To link to a UserSlot
}

// Customer Management Types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Inventory Management Types
export interface InventoryItem {
  id: string;
  name: string;
  sku?: string; // Stock Keeping Unit
  description?: string;
  quantityOnHand: number; // Changed from 'quantity' to be more specific
  unitPrice: number;
  costPrice?: number; // Optional: for profit calculation
  supplier?: string;
  lastReorderDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Payment Transaction Types
export enum PaymentDirection {
  In = 'In',
  Out = 'Out',
}

export interface PaymentTransaction {
  id: string;
  direction: PaymentDirection;
  date: string; // ISO YYYY-MM-DD
  amount: number;
  currency: string;
  description: string;
  category?: string; 
  relatedDocumentId?: string; // Link to Invoice or Bill
  paymentMethod?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}


export interface DocumentContextType {
  documents: Document[];
  settings: AppSettings;
  customers: Customer[];
  inventoryItems: InventoryItem[];
  paymentTransactions: PaymentTransaction[];

  addDocument: (doc: Document) => void;
  updateDocument: (doc: Document) => void;
  deleteDocument: (id: string) => void;
  getDocumentById: (id: string) => Document | undefined;
  generateDocumentNumber: (docType: DocumentType) => string;
  
  updateSettings: (settings: Partial<AppSettings>) => void; // Changed to Partial for easier updates
  completeSetup: (companyName: string, companyEmail: string, currency: string, pColor: string, sColor: string) => void;

  addCustomer: (customer: Customer) => void;
  updateCustomer: (customer: Customer) => void;
  deleteCustomer: (id: string) => void;
  getCustomerById: (id: string) => Customer | undefined;

  addInventoryItem: (item: InventoryItem) => void;
  updateInventoryItem: (item: InventoryItem) => void;
  deleteInventoryItem: (id: string) => void;
  getInventoryItemById: (id: string) => InventoryItem | undefined;
  adjustInventoryStock: (itemId: string, quantityChange: number) => void;


  addPaymentTransaction: (transaction: PaymentTransaction) => void;
  updatePaymentTransaction: (transaction: PaymentTransaction) => void;
  deletePaymentTransaction: (id: string) => void;
  getPaymentTransactionById: (id: string) => PaymentTransaction | undefined;

  // User Slot Management
  addUserSlot: (name: string, role: string) => string | null; // Returns new slot ID or null if max reached
  updateUserSlot: (slotId: string, name: string, role: string) => void;
  deleteUserSlot: (slotId: string) => void;
  // toggleUserSlotActiveState: (slotId: string) => void; // If we need to deactivate
}