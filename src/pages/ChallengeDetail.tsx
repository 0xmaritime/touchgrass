import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Challenge } from '../types';
import { mockChallenges } from '../data/mockChallenges';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Loading } from '../components/ui/Loading';

const ChallengeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        const foundChallenge = mockChallenges.find(c => c.id === id);
        if (foundChallenge) {
          setChallenge(foundChallenge);
        } else {
          setError('Challenge not found');
        }
      } catch (err) {
        // Log the error for debugging, but don't use the variable directly if not needed
        console.error(err);
        setError('Failed to load challenge');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

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

  if (!challenge) {
    return (
      <div className="text-center text-gray-500 mt-8">
        <p>No challenge data available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{challenge.title}</h1>
        <p className="text-gray-600 mb-4">{challenge.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Stake: {challenge.stakeAmount} {challenge.stakeCurrency}</span>
          <span className="text-sm text-gray-500">Difficulty: {challenge.difficulty}</span>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Participants</h2>
          <p className="text-gray-700">{challenge.participants} participants</p>
        </div>
        <Button className="w-full">Join Challenge</Button>
      </Card>
    </div>
  );
};

export default ChallengeDetail;
