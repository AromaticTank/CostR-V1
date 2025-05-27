
import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { DocumentProvider, useDocuments } from './contexts/DocumentContext';
import Layout from './components/Layout'; // Main app layout
import DocumentListPage from './pages/DocumentListPage';
import DocumentFormPage from './pages/DocumentFormPage';
import DocumentViewPage from './pages/DocumentViewPage';
import SettingsPage from './pages/SettingsPage';
import SetupPage from './pages/SetupPage'; 
import DashboardPage from './pages/DashboardPage'; 
import CustomerListPage from './pages/CustomerListPage'; 
import CustomerFormPage from './pages/CustomerFormPage'; // New
import InventoryListPage from './pages/InventoryListPage'; 
import InventoryItemFormPage from './pages/InventoryItemFormPage'; // New
import QuoteListPage from './pages/QuoteListPage'; 
import InvoiceListPage from './pages/InvoiceListPage'; 
import PaymentsInPage from './pages/PaymentsInPage'; 
import PaymentsOutPage from './pages/PaymentsOutPage'; 
import PaymentFormPage from './pages/PaymentFormPage'; // New
import ReportsPage from './pages/ReportsPage'; 
import MyBusinessPage from './pages/MyBusinessPage'; 


const ProtectedRoute: React.FC = () => {
  const { settings } = useDocuments();
  if (!settings.isSetupComplete) {
    return <Navigate to="/setup" replace />;
  }
  return <Layout><Outlet /></Layout>;
};

const AppContent: React.FC = () => {
  const { settings } = useDocuments();

  const RootRedirect: React.FC = () => {
    if (settings.isSetupComplete) {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/setup" replace />;
  };

  return (
      <Routes>
        <Route path="/setup" element={<SetupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route path="/documents" element={<DocumentListPage />} />
          <Route path="/quotes" element={<QuoteListPage />} />
          <Route path="/invoices" element={<InvoiceListPage />} />
          
          <Route path="/new" element={<DocumentFormPage />} />
          <Route path="/new-invoice" element={<DocumentFormPage initialDocumentType="Invoice" />} />
          <Route path="/new-quotation" element={<DocumentFormPage initialDocumentType="Quotation" />} />
          
          <Route path="/edit/:id" element={<DocumentFormPage />} />
          <Route path="/view/:id" element={<DocumentViewPage />} />

          <Route path="/customers" element={<CustomerListPage />} />
          <Route path="/customers/new" element={<CustomerFormPage />} />
          <Route path="/customers/edit/:id" element={<CustomerFormPage />} />
          {/* Optional customer detail view: <Route path="/customers/view/:id" element={<CustomerViewPage />} /> */}

          <Route path="/inventory" element={<InventoryListPage />} />
          <Route path="/inventory/new" element={<InventoryItemFormPage />} />
          <Route path="/inventory/edit/:id" element={<InventoryItemFormPage />} />
           {/* Optional inventory detail view: <Route path="/inventory/view/:id" element={<InventoryItemViewPage />} /> */}


          <Route path="/payments-in" element={<PaymentsInPage />} />
          <Route path="/payments-out" element={<PaymentsOutPage />} />
          <Route path="/payments/new/in" element={<PaymentFormPage direction="In" />} />
          <Route path="/payments/new/out" element={<PaymentFormPage direction="Out" />} />
          <Route path="/payments/edit/:id" element={<PaymentFormPage />} />


          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/my-business" element={<MyBusinessPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
        <Route path="/" element={<RootRedirect />} />
        <Route path="*" element={settings.isSetupComplete ? <Navigate to="/dashboard" replace /> : <Navigate to="/setup" replace />} />
      </Routes>
  );
};


const App: React.FC = () => {
  return (
    <DocumentProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </DocumentProvider>
  );
};

export default App;
