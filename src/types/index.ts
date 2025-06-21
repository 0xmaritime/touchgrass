export interface User {
  id: string;
  username: string;
  address: string;
  avatar: string;
  totalEarned: number;
  totalStaked: number;
  currentStreak: number;
  longestStreak: number;
  successRate: number;
  rank: number;
  achievements: string[];
  followers: number;
  following: number;
  isVerified: boolean;
  joinedAt: Date;
  completedChallenges: number;
  isFollowing?: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  stakeAmount: number;
  stakeCurrency: string;
  duration: string;
  durationHours: number;
  participants: number;
  completed: number;
  totalPot: number;
  createdBy: string;
  endsAt: Date;
  startedAt: Date;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isActive: boolean;
  rules: string[];
  photos: ChallengePhoto[];
  maxParticipants?: number;
  tags: string[];
}

export interface ChallengePhoto {
  id: string;
  challengeId: string;
  userId: string;
  username: string;
  imageUrl: string;
  description: string;
  uploadedAt: Date;
  votes: number;
  userVote?: 'up' | 'down';
  isVerified: boolean;
}

export interface Activity {
  id: string;
  type: 'challenge_created' | 'challenge_joined' | 'challenge_completed' | 'payout_received' | 'achievement_unlocked';
  user: string;
  userAvatar: string;
  challenge?: string;
  challengeTitle?: string;
  amount?: number;
  timestamp: Date;
  description: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: Record<string, number>;
  isConnecting: boolean;
}

export interface UserChallenge {
  challengeId: string;
  status: 'active' | 'completed' | 'failed' | 'pending_verification';
  joinedAt: Date;
  completedAt?: Date;
  stakeAmount: number;
  stakeCurrency: string;
  photoSubmitted: boolean;
  photoId?: string;
  payout?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
}

export interface Comment {
  id: string;
  challengeId: string;
  userId: string;
  username: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
}

export type ChallengeCategory = 'outdoor' | 'fitness' | 'detox' | 'social' | 'mindfulness' | 'adventure';