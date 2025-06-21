import React from 'react';
import { User } from '../../types';
import { Card } from '../ui/Card';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardProps {
  users: User[];
  title: string;
  metric: keyof User;
  limit?: number;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  users,
  title,
  metric,
  limit = 10,
}) => {
  const sortedUsers = [...users]
    .sort((a, b) => {
      const aValue = a[metric] as number;
      const bValue = b[metric] as number;
      return bValue - aValue;
    })
    .slice(0, limit);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-medium text-gray-500">#{rank}</span>;
    }
  };

  const formatMetricValue = (value: any, metricKey: string) => {
    if (metricKey === 'totalEarned') {
      return formatCurrency(value, 'USD');
    }
    if (metricKey === 'successRate') {
      return `${Math.round(value * 100)}%`;
    }
    return formatNumber(value);
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {sortedUsers.map((user, index) => (
          <div key={user.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
            <div className="flex-shrink-0">
              {getRankIcon(index + 1)}
            </div>
            <img
              src={user.avatar}
              alt={user.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="font-medium text-gray-900 truncate">{user.username}</p>
                {user.isVerified && (
                  <span className="text-blue-500">✓</span>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {user.completedChallenges} challenges completed
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                {formatMetricValue(user[metric], metric)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};