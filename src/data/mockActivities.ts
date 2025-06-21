import { Activity } from '../types';
import { mockUsers } from './mockUsers';
import { mockChallenges } from './mockChallenges';

const activityTypes = [
  'challenge_created',
  'challenge_joined', 
  'challenge_completed',
  'payout_received',
  'achievement_unlocked'
] as const;

const generateActivity = (id: number): Activity => {
  const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
  const user = mockUsers[Math.floor(Math.random() * Math.min(mockUsers.length, 20))];
  const challenge = mockChallenges[Math.floor(Math.random() * Math.min(mockChallenges.length, 10))];
  
  let description = '';
  let amount: number | undefined;
  
  switch (type) {
    case 'challenge_created':
      description = `created "${challenge.title}"`;
      break;
    case 'challenge_joined':
      description = `joined "${challenge.title}"`;
      break;
    case 'challenge_completed':
      description = `completed "${challenge.title}"`;
      break;
    case 'payout_received':
      amount = Math.random() * 100 + 10;
      description = `received ${amount.toFixed(2)} USDC from "${challenge.title}"`;
      break;
    case 'achievement_unlocked':
      const achievements = ['First Touch', 'Streak Warrior', 'Nature Photographer', 'Grass Whale'];
      const achievement = achievements[Math.floor(Math.random() * achievements.length)];
      description = `unlocked "${achievement}" achievement`;
      break;
  }
  
  return {
    id: id.toString(),
    type,
    user: user.username,
    userAvatar: user.avatar,
    challenge: challenge.id,
    challengeTitle: challenge.title,
    amount,
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    description,
  };
};

export const mockActivities: Activity[] = [];

for (let i = 1; i <= 100; i++) {
  mockActivities.push(generateActivity(i));
}

// Sort by timestamp descending
mockActivities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());