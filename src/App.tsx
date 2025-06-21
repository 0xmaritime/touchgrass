import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import { UserProvider } from './context/UserContext';
import { Header } from './components/layout/Header';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Leaderboards } from './pages/Leaderboards';
import ChallengeDetail from './pages/ChallengeDetail';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';
import { useWallet } from './context/WalletContext';


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
        <Route
          path="/challenge/:id"
          element={isConnected ? <ChallengeDetail /> : <Navigate to="/" replace />}
        />
        <Route
          path="/profile/:username"
          element={isConnected ? <UserProfile /> : <Navigate to="/" replace />}
        />
        <Route
          path="/settings"
          element={isConnected ? <Settings /> : <Navigate to="/" replace />}
        />
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
