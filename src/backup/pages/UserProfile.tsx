import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, Challenge, Activity } from '../types';
import { mockUsers } from '../data/mockUsers';
import { mockChallenges } from '../data/mockChallenges';
import { mockActivities } from '../data/mockActivities';
import { Card } from '../components/ui/Card';
import { Loading } from '../components/ui/Loading';
import { Button } from '../components/ui/Button';

const UserProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [userChallenges, setUserChallenges] = useState<Challenge[]>([]);
  const [userActivities, setUserActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        const foundUser = mockUsers.find(u => u.username === username);
        if (foundUser) {
          setUser(foundUser);
          // Filter challenges and activities for the user
          const challenges = mockChallenges.filter(c => c.createdBy === foundUser.username);
          setUserChallenges(challenges);
          const activities = mockActivities.filter(a => a.user === foundUser.username);
          setUserActivities(activities);
        } else {
          setError('User not found');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-gray-500 mt-8">
        <p>No user data available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <img src={user.avatar} alt={user.username} className="w-24 h-24 rounded-full mr-6" />
          <div>
            <h1 className="text-4xl font-bold">{user.username}</h1>
            <p className="text-gray-600">{user.address}</p>
            {user.isVerified && (
              <span className="text-blue-500 text-sm font-semibold">Verified Account</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
          <div>
            <p className="text-2xl font-bold">{user.totalEarned} XP</p>
            <p className="text-gray-500">Earned</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{user.completedChallenges}</p>
            <p className="text-gray-500">Challenges Completed</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{user.currentStreak}</p>
            <p className="text-gray-500">Current Streak</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{user.successRate}%</p>
            <p className="text-gray-500">Success Rate</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Created Challenges</h2>
          {userChallenges.length > 0 ? (
            <ul>
              {userChallenges.map(challenge => (
                <li key={challenge.id} className="mb-2">
                  <a href={`/challenge/${challenge.id}`} className="text-blue-600 hover:underline">
                    {challenge.title}
                  </a>
                  <span className="text-gray-500 text-sm ml-2">({challenge.difficulty})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No challenges created yet.</p>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Recent Activity</h2>
          {userActivities.length > 0 ? (
            <ul>
              {userActivities.map(activity => (
                <li key={activity.id} className="mb-2 text-gray-700">
                  {activity.description} - {new Date(activity.timestamp).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent activity.</p>
          )}
        </div>

        <Button className="w-full">Follow User</Button>
      </Card>
    </div>
  );
};

export default UserProfile;
