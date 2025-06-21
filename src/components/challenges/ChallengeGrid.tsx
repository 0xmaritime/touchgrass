import React from 'react';
import { Challenge } from '../../types';
import { ChallengeCard } from './ChallengeCard';

interface ChallengeGridProps {
  challenges: Challenge[];
  onJoinChallenge?: (challenge: Challenge) => void;
  onViewChallenge?: (challenge: Challenge) => void;
  loading?: boolean;
}

export const ChallengeGrid: React.FC<ChallengeGridProps> = ({
  challenges,
  onJoinChallenge,
  onViewChallenge,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-80"></div>
        ))}
      </div>
    );
  }

  if (challenges.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🌱</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No challenges found</h3>
        <p className="text-gray-600">Try adjusting your filters or create a new challenge</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          onJoin={onJoinChallenge}
          onView={onViewChallenge}
        />
      ))}
    </div>
  );
};