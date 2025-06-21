// Crypto staking and payout utilities
// In a real app, this would integrate with actual blockchain transactions

export interface StakeTransaction {
  id: string;
  amount: number;
  currency: 'SOL' | 'USDC' | 'ETH';
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface PayoutResult {
  success: boolean;
  amount: number;
  transactionId?: string;
  error?: string;
}

// Mock implementation - replace with real crypto logic
export class CryptoWallet {
  private static instance: CryptoWallet;
  private balance: number = 100; // Mock balance

  static getInstance(): CryptoWallet {
    if (!CryptoWallet.instance) {
      CryptoWallet.instance = new CryptoWallet();
    }
    return CryptoWallet.instance;
  }

  async getBalance(): Promise<number> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.balance;
  }

  async stakeTokens(amount: number, challengeId: string): Promise<StakeTransaction> {
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (amount > this.balance) {
      throw new Error('Insufficient balance');
    }

    this.balance -= amount;

    const transaction: StakeTransaction = {
      id: `stake_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount,
      currency: 'SOL',
      timestamp: Date.now(),
      status: 'confirmed'
    };

    // Store stake in localStorage for demo
    const stakes = this.getStoredStakes();
    stakes[challengeId] = transaction;
    localStorage.setItem('touchgrass_stakes', JSON.stringify(stakes));

    return transaction;
  }

  async processPayout(challengeId: string, success: boolean): Promise<PayoutResult> {
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 1000));

    const stakes = this.getStoredStakes();
    const stake = stakes[challengeId];

    if (!stake) {
      return {
        success: false,
        amount: 0,
        error: 'No stake found for challenge'
      };
    }

    if (success) {
      // Return stake + 20% bonus
      const payout = stake.amount * 1.2;
      this.balance += payout;

      return {
        success: true,
        amount: payout,
        transactionId: `payout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
    } else {
      // Stake is lost - goes to successful participants' bonus pool
      return {
        success: false,
        amount: 0,
        transactionId: `loss_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
    }
  }

  private getStoredStakes(): Record<string, StakeTransaction> {
    const stored = localStorage.getItem('touchgrass_stakes');
    return stored ? JSON.parse(stored) : {};
  }

  // Platform fee (5% of stakes)
  static calculatePlatformFee(stakeAmount: number): number {
    return stakeAmount * 0.05;
  }

  // Bonus calculation (from failed stakes)
  static calculateSuccessBonus(stakeAmount: number, failurePoolSize: number, successCount: number): number {
    if (successCount === 0) return 0;
    const bonusPerWinner = failurePoolSize / successCount;
    return Math.min(bonusPerWinner, stakeAmount * 0.5); // Cap bonus at 50% of stake
  }
}

// Global pool stats (mock data)
export const getPoolStats = () => ({
  totalActiveStakes: 2847,
  successRate: 0.73,
  averageStake: 12.50,
  totalBonusPaid: 15420,
  activeParticipants: 234
});

// Validation helpers
export const validateStakeAmount = (amount: number): { valid: boolean; error?: string } => {
  if (amount < 1) {
    return { valid: false, error: 'Minimum stake is $1' };
  }
  if (amount > 50) {
    return { valid: false, error: 'Maximum stake is $50' };
  }
  return { valid: true };
};

export const formatCrypto = (amount: number, currency: string = 'SOL'): string => {
  return `${amount.toFixed(2)} ${currency}`;
};