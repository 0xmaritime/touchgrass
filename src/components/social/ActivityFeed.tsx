import React from 'react';
import { Activity } from '../../types';
import { formatRelativeTime, formatCurrency } from '../../utils/formatters';
import { Card } from '../ui/Card';

interface ActivityFeedProps {
  activities: Activity[];
  limit?: number;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, limit }) => {
  const displayActivities = limit ? activities.slice(0, limit) : activities;

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'challenge_created':
        return '🎯';
      case 'challenge_joined':
        return '🤝';
      case 'challenge_completed':
        return '✅';
      case 'payout_received':
        return '💰';
      case 'achievement_unlocked':
        return '🏆';
      default:
        return '📱';
    }
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {displayActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <img
              src={activity.userAvatar}
              alt={activity.user}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getActivityIcon(activity.type)}</span>
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span>{' '}
                  {activity.description}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {formatRelativeTime(activity.timestamp)}
              </p>
            </div>
            {activity.amount && (
              <div className="text-sm font-medium text-green-600">
                +{formatCurrency(activity.amount, 'USDC')}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};