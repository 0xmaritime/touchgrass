import React from 'react';
import { Clock, Users, Trophy, Target } from 'lucide-react';
import { Challenge } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatCurrency, formatUSD, formatTimeRemaining } from '../../utils/formatters';
import { CHALLENGE_CATEGORIES } from '../../utils/constants';

interface ChallengeCardProps {
  challenge: Challenge;
  onJoin?: (challenge: Challenge) => void;
  onView?: (challenge: Challenge) => void;
  showActions?: boolean;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  onJoin,
  onView,
  showActions = true,
}) => {
  const category = CHALLENGE_CATEGORIES.find(c => c.id === challenge.category);
  const progressPercentage = (challenge.completed / challenge.participants) * 100;

  return (
    <Card hover className="h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          {category && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${category.color}`}>
              {category.icon} {category.name}
            </span>
          )}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            challenge.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
            challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {challenge.difficulty}
          </span>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900">
            {formatCurrency(challenge.stakeAmount, challenge.stakeCurrency)}
          </div>
          <div className="text-xs text-gray-500">
            {formatUSD(challenge.stakeAmount, challenge.stakeCurrency)}
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {challenge.title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
        {challenge.description}
      </p>

      <div className="space-y-3">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>{formatTimeRemaining(challenge.endsAt)}</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center text-sm text-gray-500">
              <Users className="w-4 h-4 mr-1" />
              <span>{challenge.participants}</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center text-sm text-gray-500">
              <Trophy className="w-4 h-4 mr-1" />
              <span>{formatUSD(challenge.totalPot, challenge.stakeCurrency)}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{challenge.completed}/{challenge.participants}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onView?.(challenge)}
            >
              View Details
            </Button>
            {challenge.isActive && (
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                onClick={() => onJoin?.(challenge)}
                icon={Target}
              >
                Join
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};