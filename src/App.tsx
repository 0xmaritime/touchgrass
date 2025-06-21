import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import { UserProvider } from './context/UserContext';
import { Header } from './components/layout/Header';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Leaderboards } from './pages/Leaderboards';
import { useWallet } from './context/WalletContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // This would be inside the providers, so we can't use the hook here
  // Instead, we'll handle the redirect in the component itself
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route 
          path="/app" 
          element={isConnected ? <Dashboard /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/dashboard" 
          element={isConnected ? <Dashboard /> : <Navigate to="/" replace />} 
        />
        <Route path="/leaderboards" element={<Leaderboards />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <WalletProvider>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </WalletProvider>
    </Router>
  );
}

export default App;