import React, { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, Flame, DollarSign } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { mockUsers } from '../data/mockUsers';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { User } from '../types';

export const Leaderboards: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'earnings' | 'streaks' | 'success' | 'challenges'>('earnings');
  const [timeFilter, setTimeFilter] = useState<'daily' | 'weekly' | 'monthly' | 'all-time'>('all-time');

  const categories = [
    { id: 'earnings', name: 'Total Earnings', icon: DollarSign, metric: 'totalEarned' as keyof User },
    { id: 'streaks', name: 'Current Streaks', icon: Flame, metric: 'currentStreak' as keyof User },
    { id: 'success', name: 'Success Rate', icon: TrendingUp, metric: 'successRate' as keyof User },
    { id: 'challenges', name: 'Challenges Completed', icon: Trophy, metric: 'completedChallenges' as keyof User },
  ];

  const timeFilters = [
    { id: 'daily', name: 'Today' },
    { id: 'weekly', name: 'This Week' },
    { id: 'monthly', name: 'This Month' },
    { id: 'all-time', name: 'All Time' },
  ];

  const selectedCategoryData = categories.find(c => c.id === selectedCategory);
  const sortedUsers = [...mockUsers].sort((a, b) => {
    const aValue = a[selectedCategoryData?.metric || 'totalEarned'] as number;
    const bValue = b[selectedCategoryData?.metric || 'totalEarned'] as number;
    return bValue - aValue;
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <div className="w-6 h-6 flex items-center justify-center">
            <span className="text-sm font-bold text-gray-500">#{rank}</span>
          </div>
        );
    }
  };

  const formatMetricValue = (value: any, metric: string) => {
    switch (metric) {
      case 'totalEarned':
        return formatCurrency(value, 'USD');
      case 'successRate':
        return `${Math.round(value * 100)}%`;
      case 'currentStreak':
        return `${value} days`;
      case 'completedChallenges':
        return formatNumber(value);
      default:
        return value.toString();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Leaderboards</h1>
          <p className="text-gray-600">
            See how you stack up against the Touch Grass community
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'primary' : 'outline'}
                  size="sm"
                  icon={category.icon}
                  onClick={() => setSelectedCategory(category.id as any)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Time Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Time Period</h3>
            <div className="flex flex-wrap gap-2">
              {timeFilters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={timeFilter === filter.id ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setTimeFilter(filter.id as any)}
                >
                  {filter.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            <Card>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedCategoryData?.name} - {timeFilters.find(f => f.id === timeFilter)?.name}
                </h2>
              </div>

              <div className="space-y-4">
                {sortedUsers.slice(0, 50).map((user, index) => {
                  const rank = index + 1;
                  const isTopThree = rank <= 3;
                  
                  return (
                    <div
                      key={user.id}
                      className={`flex items-center space-x-4 p-4 rounded-lg ${
                        isTopThree ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {getRankIcon(rank)}
                      </div>
                      
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900 truncate">
                            {user.username}
                          </h3>
                          {user.isVerified && (
                            <span className="text-blue-500 text-sm">✓</span>
                          )}
                          {isTopThree && (
                            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                              Top {rank}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Rank #{user.rank}</span>
                          <span>{user.completedChallenges} challenges</span>
                          <span>{Math.round(user.successRate * 100)}% success</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          {formatMetricValue(user[selectedCategoryData?.metric || 'totalEarned'], selectedCategoryData?.metric || 'totalEarned')}
                        </p>
                        {selectedCategory === 'earnings' && (
                          <p className="text-sm text-gray-500">
                            {formatCurrency(user.totalStaked, 'USD')} staked
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top 3 Highlights */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hall of Fame</h3>
              <div className="space-y-4">
                {sortedUsers.slice(0, 3).map((user, index) => {
                  const rank = index + 1;
                  return (
                    <div key={user.id} className="flex items-center space-x-3">
                      {getRankIcon(rank)}
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{user.username}</p>
                        <p className="text-sm text-gray-500">
                          {formatMetricValue(user[selectedCategoryData?.metric || 'totalEarned'], selectedCategoryData?.metric || 'totalEarned')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Users</span>
                  <span className="font-medium">{formatNumber(mockUsers.length)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Success Rate</span>
                  <span className="font-medium">
                    {Math.round(mockUsers.reduce((sum, u) => sum + u.successRate, 0) / mockUsers.length * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Earned</span>
                  <span className="font-medium">
                    {formatCurrency(mockUsers.reduce((sum, u) => sum + u.totalEarned, 0), 'USD')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Longest Streak</span>
                  <span className="font-medium">
                    {Math.max(...mockUsers.map(u => u.longestStreak))} days
                  </span>
                </div>
              </div>
            </Card>

            {/* Achievement Showcase */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                {mockUsers.slice(0, 5).map((user, index) => (
                  <div key={user.id} className="flex items-center space-x-3">
                    <span className="text-2xl">🏆</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{user.username}</p>
                      <p className="text-xs text-gray-500">
                        Unlocked {user.achievements.length} achievements
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};