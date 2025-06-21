import React from 'react';
import { Wallet, Smartphone, Globe } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useWallet } from '../../context/WalletContext';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { connect, isConnecting } = useWallet();

  const walletProviders = [
    {
      name: 'MetaMask',
      icon: Wallet,
      description: 'Connect using MetaMask wallet',
      id: 'metamask',
    },
    {
      name: 'WalletConnect',
      icon: Smartphone,
      description: 'Scan with mobile wallet',
      id: 'walletconnect',
    },
    {
      name: 'Coinbase Wallet',
      icon: Globe,
      description: 'Connect with Coinbase Wallet',
      id: 'coinbase',
    },
  ];

  const handleConnect = async (providerId: string) => {
    try {
      await connect(providerId);
      onClose();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Connect Your Wallet">
      <div className="space-y-4">
        <p className="text-gray-600 text-center mb-6">
          Choose your preferred wallet to get started with Touch Grass Crypto
        </p>
        
        {walletProviders.map((provider) => (
          <button
            key={provider.id}
            onClick={() => handleConnect(provider.id)}
            disabled={isConnecting}
            className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="p-2 bg-gray-100 rounded-lg mr-4">
              <provider.icon className="w-6 h-6 text-gray-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium text-gray-900">{provider.name}</h3>
              <p className="text-sm text-gray-500">{provider.description}</p>
            </div>
            {isConnecting && (
              <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            )}
          </button>
        ))}

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            By connecting a wallet, you agree to our Terms of Service and Privacy Policy.
            Make sure you trust this site before connecting your wallet.
          </p>
        </div>
      </div>
    </Modal>
  );
};