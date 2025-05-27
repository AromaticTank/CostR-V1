import { AppSettings, CompanyInfo, DocumentType, PDFTemplate, UserSlot } from './types';

export const APP_NAME = "CostR"; // Updated App Name

export const DEFAULT_CURRENCY = "ZAR"; 
export const DEFAULT_TAX_RATE = 15; 
export const MAX_USER_SLOTS = 5;
export const WA_QR_SUPPORT_LINK = "https://wa.me/27820948977"; // For QR Code on PDFs

export const EMPTY_COMPANY_INFO: CompanyInfo = {
  name: '',
  address: '',
  email: '',
  phone: '',
  logoUrl: '',
  bankDetails: '',
  taxId: '',
};

export const DEFAULT_ADMIN_USER_SLOT: UserSlot = {
  id: crypto.randomUUID(), 
  name: 'Admin User',
  role: 'Administrator',
  isActive: true,
  isPrimaryAdmin: true,
};

export const DEFAULT_SETTINGS: AppSettings = {
  company: EMPTY_COMPANY_INFO,
  defaultCurrency: DEFAULT_CURRENCY,
  defaultTaxRate: DEFAULT_TAX_RATE,
  secondaryTaxRate: undefined, 
  selectedPdfTemplate: PDFTemplate.Template1, 
  isSetupComplete: false,
  primaryColor: '#A95DF9', // New Default Primary
  secondaryColor: '#5C75FA', // New Default Secondary
  userSlots: [DEFAULT_ADMIN_USER_SLOT],
  maxUserSlots: MAX_USER_SLOTS,
};

export const DOCUMENT_TYPES_OPTIONS = [
  { label: 'Invoice', value: DocumentType.Invoice },
  { label: 'Quotation', value: DocumentType.Quotation },
];

export const CURRENCIES = ['ZAR', 'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

export const PDF_TEMPLATE_OPTIONS = [
  { label: 'Standard Template', value: PDFTemplate.Template1 },
  { label: 'Modern Template', value: PDFTemplate.Template2 },
  { label: 'Receipt Style', value: PDFTemplate.Template3 },
];

// Palette for user color selection in settings
export const THEME_COLOR_PALETTE = [
  { name: 'Violet (Default)', value: '#A95DF9' },
  { name: 'Blue (Default Sec.)', value: '#5C75FA' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Rose', value: '#F43F5E' },
  { name: 'Amber', value: '#F59E0B' },
  { name: 'Lime', value: '#84CC16' },
  { name: 'Sky Blue', value: '#0EA5E9' },
  { name: 'Graphite', value: '#4B5563' },
];
