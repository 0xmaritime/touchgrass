import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ChallengeCategory } from '../../types';

import { Challenge } from '../../types';

interface ChallengeCreationFormProps {
  onChallengeCreate: (challengeData: Challenge) => void;
}

const ChallengeCreationForm: React.FC<ChallengeCreationFormProps> = ({ onChallengeCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
  const [stakeCurrency, setStakeCurrency] = useState('XP');
  const [durationHours, setDurationHours] = useState('');
  const [category, setCategory] = useState<ChallengeCategory>('outdoor');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [rules, setRules] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newChallenge = {
      id: `challenge-${Date.now()}`, // Simple unique ID
      title,
      description,
      stakeAmount: parseFloat(stakeAmount),
      stakeCurrency,
      duration: `${durationHours} hours`,
      durationHours: parseInt(durationHours),
      participants: 0,
      completed: 0,
      totalPot: 0,
      createdBy: 'currentUser', // This would be dynamic in a real app
      endsAt: new Date(Date.now() + parseInt(durationHours) * 60 * 60 * 1000),
      startedAt: new Date(),
      category,
      difficulty,
      isActive: true,
      rules: rules.split('\n').filter(rule => rule.trim() !== ''),
      photos: [],
      maxParticipants: maxParticipants ? parseInt(maxParticipants) : undefined,
      tags: [],
    };
    onChallengeCreate(newChallenge);
    // Reset form
    setTitle('');
    setDescription('');
    setStakeAmount('');
    setDurationHours('');
    setRules('');
    setMaxParticipants('');
  };

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Challenge</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="stakeAmount" className="block text-sm font-medium text-gray-700">Stake Amount</label>
            <input
              type="number"
              id="stakeAmount"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="stakeCurrency" className="block text-sm font-medium text-gray-700">Currency</label>
            <select
              id="stakeCurrency"
              value={stakeCurrency}
              onChange={(e) => setStakeCurrency(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="XP">XP</option>
              <option value="SOL">SOL</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="durationHours" className="block text-sm font-medium text-gray-700">Duration (Hours)</label>
          <input
            type="number"
            id="durationHours"
            value={durationHours}
            onChange={(e) => setDurationHours(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ChallengeCategory)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="outdoor">Outdoor</option>
            <option value="fitness">Fitness</option>
            <option value="detox">Detox</option>
            <option value="social">Social</option>
            <option value="mindfulness">Mindfulness</option>
            <option value="adventure">Adventure</option>
          </select>
        </div>
        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <label htmlFor="rules" className="block text-sm font-medium text-gray-700">Rules (one per line)</label>
          <textarea
            id="rules"
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          ></textarea>
        </div>
        <div>
          <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700">Max Participants (optional)</label>
          <input
            type="number"
            id="maxParticipants"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <Button type="submit" className="w-full">Create Challenge</Button>
      </form>
    </Card>
  );
};

export default ChallengeCreationForm;
