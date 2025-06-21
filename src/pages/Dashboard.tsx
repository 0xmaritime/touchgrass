import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Target, Trophy, Flame, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ChallengeGrid } from '../components/challenges/ChallengeGrid';
import { ActivityFeed } from '../components/social/ActivityFeed';
import { Leaderboard } from '../components/social/Leaderboard';
import { useUser } from '../context/UserContext';
import { mockChallenges } from '../data/mockChallenges';
import { mockActivities } from '../data/mockActivities';
import { mockUsers } from '../data/mockUsers';
import { formatCurrency } from '../utils/formatters';
import { Challenge } from '../types';
import ChallengeCreationForm from '../components/challenges/ChallengeCreationForm';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, userChallenges } = useUser();
  const [selectedTab, setSelectedTab] = useState<'active' | 'completed' | 'all'>('active');
  const [showCreateChallengeModal, setShowCreateChallengeModal] = useState(false);

  const handleChallengeCreate = (newChallenge: Challenge) => {
    // In a real app, you would send this to your backend
    console.log('New Challenge Created:', newChallenge);
    // For now, we'll just close the modal
    setShowCreateChallengeModal(false);
    // Optionally, refresh challenges or add to a local state
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please connect your wallet</h2>
          <p className="text-gray-600">You need to connect your wallet to access the dashboard</p>
        </div>
      </div>
    );
  }

  const activeChallenges = mockChallenges.filter(c => c.isActive).slice(0, 6);
  const userActiveChallenges = userChallenges.filter(uc => uc.status === 'active');
  const userCompletedChallenges = userChallenges.filter(uc => uc.status === 'completed');

  const handleJoinChallenge = (challenge: Challenge) => {
    navigate(`/challenge/${challenge.id}`);
  };

  const handleViewChallenge = (challenge: Challenge) => {
    navigate(`/challenge/${challenge.id}`);
  };

  const totalActiveStake = userActiveChallenges.reduce((sum, uc) => sum + uc.stakeAmount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {currentUser.username}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Ready to take on some challenges and earn rewards?
              </p>
            </div>
            <Button
              icon={Plus}
              onClick={() => setShowCreateChallengeModal(true)}
              className="hidden sm:flex"
            >
              Create Challenge
            </Button>
          </div>
        </div>

        {showCreateChallengeModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative p-8 bg-white w-full max-w-2xl mx-auto rounded-lg shadow-lg">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setShowCreateChallengeModal(false)}
              >
                &times;
              </button>
              <ChallengeCreationForm onChallengeCreate={handleChallengeCreate} />
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Stakes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalActiveStake, 'USDC')}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900">{currentUser.currentStreak} days</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Earned</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(currentUser.totalEarned, 'USD')}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(currentUser.successRate * 100)}%
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* My Challenges */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Challenges</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedTab('active')}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                      selectedTab === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Active ({userActiveChallenges.length})
                  </button>
                  <button
                    onClick={() => setSelectedTab('completed')}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                      selectedTab === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Completed ({userCompletedChallenges.length})
                  </button>
                </div>
              </div>

              {userActiveChallenges.length === 0 && selectedTab === 'active' ? (
                <Card className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🎯</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Challenges</h3>
                  <p className="text-gray-600 mb-4">Join a challenge below to start earning!</p>
                  <Button onClick={() => navigate('/challenges')}>Browse Challenges</Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(selectedTab === 'active' ? userActiveChallenges : userCompletedChallenges)
                    .slice(0, 4)
                    .map((userChallenge) => {
                      const challenge = mockChallenges.find(c => c.id === userChallenge.challengeId);
                      if (!challenge) return null;
                      
                      return (
                        <Card key={userChallenge.challengeId} className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900 line-clamp-2">{challenge.title}</h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              userChallenge.status === 'active' 
                                ? 'bg-blue-100 text-blue-700'
                                : userChallenge.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {userChallenge.status}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>Stake: {formatCurrency(userChallenge.stakeAmount, userChallenge.stakeCurrency)}</p>
                            {userChallenge.payout && (
                              <p className="text-green-600 font-medium">
                                Earned: {formatCurrency(userChallenge.payout, userChallenge.stakeCurrency)}
                              </p>
                            )}
                          </div>
                        </Card>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Popular Challenges */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Popular Challenges</h2>
                <Button
                  variant="outline"
                  onClick={() => navigate('/challenges')}
                >
                  View All
                </Button>
              </div>
              <ChallengeGrid
                challenges={activeChallenges}
                onJoinChallenge={handleJoinChallenge}
                onViewChallenge={handleViewChallenge}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ActivityFeed activities={mockActivities} limit={5} />
            <Leaderboard
              users={mockUsers}
              title="Top Earners"
              metric="totalEarned"
              limit={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
