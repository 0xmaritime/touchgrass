import React, { createContext, useContext, useState, useCallback } from 'react';
import { WalletState } from '../types';

interface WalletContextType extends WalletState {
  connect: (provider: string) => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: {
      ETH: 0,
      USDC: 0,
      USDT: 0,
      BTC: 0,
    },
    isConnecting: false,
  });

  const connect = useCallback(async (provider: string) => {
    setWallet(prev => ({ ...prev, isConnecting: true }));
    
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock successful connection
    setWallet({
      isConnected: true,
      address: '0x1234567890123456789012345678901234567890',
      balance: {
        ETH: 2.5643,
        USDC: 1250.75,
        USDT: 800.00,
        BTC: 0.0234,
      },
      isConnecting: false,
    });
  }, []);

  const disconnect = useCallback(() => {
    setWallet({
      isConnected: false,
      address: null,
      balance: {
        ETH: 0,
        USDC: 0,
        USDT: 0,
        BTC: 0,
      },
      isConnecting: false,
    });
  }, []);

  return (
    <WalletContext.Provider value={{ ...wallet, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};