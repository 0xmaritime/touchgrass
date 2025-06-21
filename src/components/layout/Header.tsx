import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Menu, X, Wallet, User, Settings, LogOut } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useUser } from '../../context/UserContext';
import { Button } from '../ui/Button';
import { WalletModal } from '../wallet/WalletModal';
import { formatAddress } from '../../utils/formatters';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { isConnected, address, disconnect } = useWallet();
  const { currentUser } = useUser();

  const navigationItems = [
    { name: 'Dashboard', href: '/app', requiresAuth: true },
    { name: 'Challenges', href: '/challenges', requiresAuth: true },
    { name: 'Leaderboards', href: '/leaderboards', requiresAuth: false },
    { name: 'Profile', href: '/profile', requiresAuth: true },
  ];

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xl font-bold text-gray-900">Touch Grass</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                (!item.requiresAuth || isConnected) && (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {isConnected && currentUser ? (
                <div className="flex items-center space-x-4">
                  {/* Balance Display */}
                  <div className="text-sm">
                    <span className="text-gray-600">Balance: </span>
                    <span className="font-semibold text-gray-900">$1,250.75</span>
                  </div>
                  
                  {/* Streak Counter */}
                  <div className="flex items-center space-x-1 px-3 py-1 bg-orange-100 rounded-full">
                    <span className="text-orange-600">🔥</span>
                    <span className="text-sm font-medium text-orange-700">{currentUser.currentStreak}</span>
                  </div>

                  {/* Profile Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-gray-700">{currentUser.username}</span>
                    </button>

                    {isProfileMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Link>
                        <div className="border-t border-gray-200 my-1"></div>
                        <button
                          onClick={() => {
                            disconnect();
                            setIsProfileMenuOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Disconnect
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => setIsWalletModalOpen(true)}
                  icon={Wallet}
                  variant="primary"
                >
                  Connect Wallet
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => (
                (!item.requiresAuth || isConnected) && (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              
              {!isConnected && (
                <div className="pt-2">
                  <Button
                    onClick={() => {
                      setIsWalletModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    icon={Wallet}
                    variant="primary"
                    fullWidth
                  >
                    Connect Wallet
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </>
  );
};