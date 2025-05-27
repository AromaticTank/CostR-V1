import React from 'react';
import {
  Plus, Trash2, Edit3, Eye, Printer, Settings, ArrowLeft, Menu, UserCircle2,
  LayoutDashboard, Users, Archive, FileText, Receipt, Briefcase, BarChart3,
  CreditCard, LogOut, Info, Palette, FilePlus2, DollarSign, Share2, Star, ShieldCheck,
  ImageUp, Mail, Phone, MessageSquare, QrCode, Search // Added Search for Inventory Modal
} from 'lucide-react';

export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => <Plus className={className || "w-6 h-6"} />;
export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => <Trash2 className={className || "w-6 h-6"} />;
export const PencilIcon: React.FC<{ className?: string }> = ({ className }) => <Edit3 className={className || "w-6 h-6"} />;
export const EyeIcon: React.FC<{ className?: string }> = ({ className }) => <Eye className={className || "w-6 h-6"} />;
export const PrinterIcon: React.FC<{ className?: string }> = ({ className }) => <Printer className={className || "w-6 h-6"} />;
export const CogIcon: React.FC<{ className?: string }> = ({ className }) => <Settings className={className || "w-6 h-6"} />;
export const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => <ArrowLeft className={className || "w-6 h-6"} />;
export const MenuBarIcon: React.FC<{ className?: string }> = ({ className }) => <Menu className={className || "w-6 h-6"} />;
export const UserProfileIcon: React.FC<{ className?: string }> = ({ className }) => <UserCircle2 className={className || "w-6 h-6"} />;

// Side Menu Icons
export const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => <LayoutDashboard className={className || "w-5 h-5"} />;
export const CustomersIcon: React.FC<{ className?: string }> = ({ className }) => <Users className={className || "w-5 h-5"} />;
export const InventoryIcon: React.FC<{ className?: string }> = ({ className }) => <Archive className={className || "w-5 h-5"} />;
export const QuotesIcon: React.FC<{ className?: string }> = ({ className }) => <FileText className={className || "w-5 h-5"} />;
export const InvoicesIcon: React.FC<{ className?: string }> = ({ className }) => <Receipt className={className || "w-5 h-5"} />;
export const PaymentsInIcon: React.FC<{ className?: string }> = ({ className }) => <DollarSign className={className || "w-5 h-5"} />;
export const PaymentsOutIcon: React.FC<{ className?: string }> = ({ className }) => <CreditCard className={className || "w-5 h-5"} />;
export const ReportsIcon: React.FC<{ className?: string }> = ({ className }) => <BarChart3 className={className || "w-5 h-5"} />;
export const MyBusinessIcon: React.FC<{ className?: string }> = ({ className }) => <Briefcase className={className || "w-5 h-5"} />;
export const SettingsMenuIcon: React.FC<{ className?: string }> = ({ className }) => <Settings className={className || "w-5 h-5"} />;
export const LogoutMenuIcon: React.FC<{ className?: string }> = ({ className }) => <LogOut className={className || "w-5 h-5"} />;

// Bottom Navbar Icons
export const CreateQuoteIcon: React.FC<{ className?: string }> = ({ className }) => <FilePlus2 className={className || "w-6 h-6"} />;
export const CreateInvoiceIcon: React.FC<{ className?: string }> = ({ className }) => <FilePlus2 className={className || "w-6 h-6"} />;

// Settings Page Icons
export const ThemeIcon: React.FC<{ className?: string }> = ({ className }) => <Palette className={className || "w-5 h-5"}/>;
export const UsersSettingsIcon: React.FC<{ className?: string }> = ({ className }) => <Users className={className || "w-5 h-5"}/>;
export const PreferencesIcon: React.FC<{ className?: string }> = ({ className }) => <Settings className={className || "w-5 h-5"}/>;
export const TaxIcon: React.FC<{ className?: string }> = ({ className }) => <DollarSign className={className || "w-5 h-5"}/>;
export const TemplatesIcon: React.FC<{ className?: string }> = ({ className }) => <FileText className={className || "w-5 h-5"}/>;
export const BankDetailsIcon: React.FC<{ className?: string }> = ({ className }) => <CreditCard className={className || "w-5 h-5"}/>;
export const PrivacyIcon: React.FC<{ className?: string }> = ({ className }) => <ShieldCheck className={className || "w-5 h-5"}/>;
export const ShareAppIcon: React.FC<{ className?: string }> = ({ className }) => <Share2 className={className || "w-5 h-5"}/>;
export const RateAppIcon: React.FC<{ className?: string }> = ({ className }) => <Star className={className || "w-5 h-5"}/>;
export const AboutIcon: React.FC<{ className?: string }> = ({ className }) => <Info className={className || "w-5 h-5"}/>;
export const ImageUpIcon: React.FC<{ className?: string }> = ({ className }) => <ImageUp className={className || "w-6 h-6"} />;

// New Sharing Icons
export const MailIcon: React.FC<{ className?: string }> = ({ className }) => <Mail className={className || "w-5 h-5"} />;
export const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => <Phone className={className || "w-5 h-5"} />;
export const MessageSquareIcon: React.FC<{ className?: string }> = ({ className }) => <MessageSquare className={className || "w-5 h-5"} />; // For WhatsApp

// Placeholder QR Code Icon
export const QrCodeIcon: React.FC<{ className?: string }> = ({ className }) => <QrCode className={className || "w-16 h-16"} />; // Using Lucide's QrCode icon

// Search Icon
export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => <Search className={className || "w-5 h-5"} />;
