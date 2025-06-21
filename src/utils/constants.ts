export const CURRENCIES = {
  ETH: { symbol: 'ETH', name: 'Ethereum', usdRate: 2400 },
  USDC: { symbol: 'USDC', name: 'USD Coin', usdRate: 1 },
  USDT: { symbol: 'USDT', name: 'Tether', usdRate: 1 },
  BTC: { symbol: 'BTC', name: 'Bitcoin', usdRate: 65000 },
};

export const ACHIEVEMENTS = [
  { id: 'first_touch', title: 'First Touch', description: 'Complete your first challenge', icon: '🌱', rarity: 'common' as const },
  { id: 'grass_whale', title: 'Grass Whale', description: 'Stake over $100', icon: '🐋', rarity: 'rare' as const },
  { id: 'streak_warrior', title: 'Streak Warrior', description: 'Maintain a 10-day streak', icon: '🔥', rarity: 'epic' as const },
  { id: 'nature_photographer', title: 'Nature Photographer', description: 'Upload 25 photos', icon: '📸', rarity: 'rare' as const },
  { id: 'community_champion', title: 'Community Champion', description: 'Get 100 photo votes', icon: '👑', rarity: 'legendary' as const },
  { id: 'early_adopter', title: 'Early Adopter', description: 'Join in the first month', icon: '🚀', rarity: 'epic' as const },
  { id: 'consistent_challenger', title: 'Consistent Challenger', description: 'Complete 50 challenges', icon: '💪', rarity: 'epic' as const },
  { id: 'social_butterfly', title: 'Social Butterfly', description: 'Follow 20 users', icon: '🦋', rarity: 'common' as const },
  { id: 'mentor', title: 'Mentor', description: 'Create 10 challenges', icon: '🎓', rarity: 'rare' as const },
  { id: 'perfectionist', title: 'Perfectionist', description: '100% success rate with 10+ challenges', icon: '✨', rarity: 'legendary' as const },
];

export const CHALLENGE_CATEGORIES = [
  { id: 'outdoor', name: 'Outdoor Adventure', icon: '🏔️', color: 'bg-green-500' },
  { id: 'fitness', name: 'Fitness & Health', icon: '💪', color: 'bg-red-500' },
  { id: 'detox', name: 'Digital Detox', icon: '📱', color: 'bg-purple-500' },
  { id: 'social', name: 'Social Connection', icon: '👥', color: 'bg-blue-500' },
  { id: 'mindfulness', name: 'Mindfulness', icon: '🧘', color: 'bg-indigo-500' },
  { id: 'adventure', name: 'Adventure Sports', icon: '🏄', color: 'bg-orange-500' },
];

export const SAMPLE_PHOTOS = [
  'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1450361/pexels-photo-1450361.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1679618/pexels-photo-1679618.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?auto=compress&cs=tinysrgb&w=800',
];

export const AVATAR_URLS = [
  'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
];