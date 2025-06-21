import { User, UserChallenge } from '../types';

export interface UserContextType {
  currentUser: User | null;
  userChallenges: UserChallenge[];
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  joinChallenge: (challengeId: string, stakeAmount: number, stakeCurrency: string) => void;
  completeChallenge: (challengeId: string) => void;
  updateUserSettings: (settings: Partial<User>) => void;
}
