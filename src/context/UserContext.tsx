import React, { createContext, useContext, useState } from 'react';
import { User, UserChallenge } from '../types';
import { mockUsers } from '../data/mockUsers';

import { UserContextType } from '../types/UserContextTypes';

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]); // Mock logged-in user
  const [userChallenges, setUserChallenges] = useState<UserChallenge[]>([
    {
      challengeId: '1',
      status: 'active',
      joinedAt: new Date(),
      stakeAmount: 10,
      stakeCurrency: 'USDC',
      photoSubmitted: false,
    },
    {
      challengeId: '2', 
      status: 'completed',
      joinedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      completedAt: new Date(),
      stakeAmount: 5,
      stakeCurrency: 'USDC',
      photoSubmitted: true,
      photoId: 'photo_2_1',
      payout: 12.5,
    },
  ]);

  const followUser = (userId: string) => {
    // Mock follow functionality
    console.log(`Following user ${userId}`);
  };

  const unfollowUser = (userId: string) => {
    // Mock unfollow functionality
    console.log(`Unfollowing user ${userId}`);
  };

  const joinChallenge = (challengeId: string, stakeAmount: number, stakeCurrency: string) => {
    const newChallenge: UserChallenge = {
      challengeId,
      status: 'active',
      joinedAt: new Date(),
      stakeAmount,
      stakeCurrency,
      photoSubmitted: false,
    };
    
    setUserChallenges(prev => [...prev, newChallenge]);
  };

  const completeChallenge = (challengeId: string) => {
    setUserChallenges(prev => 
      prev.map(uc => 
        uc.challengeId === challengeId 
          ? { ...uc, status: 'pending_verification' as const, photoSubmitted: true }
          : uc
      )
    );
  };

  const updateUserSettings = (settings: Partial<User>) => {
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, ...settings } : null);
    }
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      userChallenges,
      followUser,
      unfollowUser,
      joinChallenge,
      completeChallenge,
      updateUserSettings,
    }}>
      {children}
    </UserContext.Provider>
  );
};
