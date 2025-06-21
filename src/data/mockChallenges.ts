import { Challenge, ChallengePhoto } from '../types';
import { SAMPLE_PHOTOS, AVATAR_URLS } from '../utils/constants';

const challengeTemplates = [
  {
    title: "Touch Grass - 2 Hour Digital Detox",
    description: "Put your phone in airplane mode and spend 2 hours outside without any digital devices. Take a photo of yourself in nature to prove completion.",
    category: "detox",
    difficulty: "easy" as const,
    rules: [
      "Phone must be in airplane mode or turned off",
      "Stay outside for the full 2 hours",
      "Take a photo with timestamp to verify",
      "No smartwatches or digital devices allowed"
    ],
    tags: ["beginner", "detox", "nature", "quick"],
  },
  {
    title: "5K Morning Run Challenge",
    description: "Complete a 5K run before 9 AM and upload GPS tracking proof. Must be completed outdoors, not on a treadmill.",
    category: "fitness",
    difficulty: "medium" as const,
    rules: [
      "Must be completed before 9 AM",
      "Outdoor run only - no treadmills",
      "Upload GPS tracking screenshot",
      "Photo at start and finish location"
    ],
    tags: ["fitness", "morning", "running", "cardio"],
  },
  {
    title: "Sunrise Photography Mission",
    description: "Wake up early to capture and share a sunrise photo from an outdoor location. Photo must show clear sunrise with landscape.",
    category: "outdoor",
    difficulty: "easy" as const,
    rules: [
      "Photo must be taken during actual sunrise",
      "Must include landscape/horizon",
      "Location tag required",
      "Original photo only - no filters"
    ],
    tags: ["photography", "sunrise", "early", "artistic"],
  },
  {
    title: "24-Hour Social Media Fast",
    description: "Complete 24 hours without checking any social media platforms. Submit proof of screen time settings showing zero usage.",
    category: "detox",
    difficulty: "hard" as const,
    rules: [
      "No social media for 24 hours straight",
      "Screenshot screen time at start and end",
      "Delete apps or use app blockers",
      "Photo of yourself outdoors during the fast"
    ],
    tags: ["detox", "willpower", "mental-health", "digital"],
  },
  {
    title: "Forest Bathing Session",
    description: "Spend 1 hour in a forest or wooded area practicing mindfulness. No phones, just you and nature.",
    category: "mindfulness",
    difficulty: "easy" as const,
    rules: [
      "Find a forest or wooded area",
      "Spend minimum 1 hour in quiet reflection",
      "No devices during the session",
      "Photo before and after for verification"
    ],
    tags: ["mindfulness", "forest", "relaxation", "zen"],
  },
  {
    title: "Cold Water Swimming Challenge",
    description: "Take a dip in natural cold water (lake, ocean, river). Water temperature must be below 60°F/15°C.",
    category: "adventure",
    difficulty: "hard" as const,
    rules: [
      "Natural body of water only",
      "Water temp below 60°F/15°C",
      "Stay in water for at least 2 minutes",
      "Video proof of entry and exit"
    ],
    tags: ["extreme", "cold", "swimming", "brave"],
  },
];

const generateChallenge = (id: number, template: typeof challengeTemplates[0]): Challenge => {
  const now = new Date();
  const startedAt = new Date(now.getTime() - Math.random() * 48 * 60 * 60 * 1000);
  const durationHours = [2, 4, 8, 12, 24, 48][Math.floor(Math.random() * 6)];
  const endsAt = new Date(startedAt.getTime() + durationHours * 60 * 60 * 1000);
  const participants = Math.floor(Math.random() * 50) + 5;
  const completed = Math.floor(participants * (0.3 + Math.random() * 0.5));
  const stakeAmount = [1, 5, 10, 25, 50, 100][Math.floor(Math.random() * 6)];
  
  return {
    id: id.toString(),
    title: template.title,
    description: template.description,
    stakeAmount,
    stakeCurrency: ['USDC', 'ETH', 'USDT'][Math.floor(Math.random() * 3)],
    duration: `${durationHours}h`,
    durationHours,
    participants,
    completed,
    totalPot: stakeAmount * participants,
    createdBy: `User${Math.floor(Math.random() * 10) + 1}`,
    endsAt,
    startedAt,
    category: template.category,
    difficulty: template.difficulty,
    isActive: endsAt > now,
    rules: template.rules,
    photos: [],
    maxParticipants: participants + Math.floor(Math.random() * 20),
    tags: template.tags,
  };
};

export const mockChallenges: Challenge[] = [];

// Generate challenges from templates
challengeTemplates.forEach((template, index) => {
  // Create 3-5 variations of each template
  const variations = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < variations; i++) {
    mockChallenges.push(generateChallenge(mockChallenges.length + 1, template));
  }
});

// Generate challenge photos
export const mockChallengePhotos: ChallengePhoto[] = [];

mockChallenges.forEach(challenge => {
  const photoCount = Math.floor(Math.random() * 5) + 1;
  for (let i = 0; i < photoCount; i++) {
    mockChallengePhotos.push({
      id: `photo_${challenge.id}_${i}`,
      challengeId: challenge.id,
      userId: `User${Math.floor(Math.random() * 20) + 1}`,
      username: `User${Math.floor(Math.random() * 20) + 1}`,
      imageUrl: SAMPLE_PHOTOS[Math.floor(Math.random() * SAMPLE_PHOTOS.length)],
      description: [
        "Beautiful morning in nature!",
        "Challenge completed successfully 💪",
        "Nothing beats fresh air and exercise",
        "Feeling refreshed and energized",
        "Touch grass mission accomplished!",
      ][Math.floor(Math.random() * 5)],
      uploadedAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
      votes: Math.floor(Math.random() * 50),
      isVerified: Math.random() > 0.3,
    });
  }
  
  // Add photos to challenge
  challenge.photos = mockChallengePhotos.filter(photo => photo.challengeId === challenge.id);
});