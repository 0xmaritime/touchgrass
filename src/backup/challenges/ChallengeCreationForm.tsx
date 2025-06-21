import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Challenge, ChallengeCategory } from '../../types';

interface ChallengeCreationFormProps {
  onChallengeCreate: (challengeData: Challenge) => void;
}

const TEMPLATES = [
  {
    title: 'Touch Grass',
    durationHours: '2',
    stakeAmount: '5',
    category: 'outdoor' as ChallengeCategory,
    difficulty: 'easy' as const,
    description: 'Spend time outdoors connecting with nature'
  },
  {
    title: 'Morning Run',
    durationHours: '1',
    stakeAmount: '10',
    category: 'fitness' as ChallengeCategory,
    difficulty: 'medium' as const,
    description: 'Start your day with an energizing run'
  },
  {
    title: 'Digital Detox',
    durationHours: '4',
    stakeAmount: '15',
    category: 'detox' as ChallengeCategory,
    difficulty: 'hard' as const,
    description: 'Disconnect from digital devices for a set period'
  }
];

const ChallengeCreationForm: React.FC<ChallengeCreationFormProps> = ({ onChallengeCreate }) => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
  const [stakeCurrency, setStakeCurrency] = useState('XP');
  const [durationHours, setDurationHours] = useState('');
  const [category, setCategory] = useState<ChallengeCategory>('outdoor');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [rules, setRules] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');

  // Auto-suggest based on title
  useEffect(() => {
    if (title.toLowerCase().includes('walk') || title.toLowerCase().includes('park')) {
      setCategory('outdoor');
      setDurationHours('0.5');
      setStakeAmount('5');
    }
  }, [title]);

  const handleTemplateSelect = (template: typeof TEMPLATES[0]) => {
    setTitle(template.title);
    setDescription(template.description);
    setDurationHours(template.durationHours);
    setStakeAmount(template.stakeAmount);
    setCategory(template.category);
    setDifficulty(template.difficulty);
    setStep(2); // Jump to step 2
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newChallenge = {
      id: `challenge-${Date.now()}`,
      title,
      description,
      stakeAmount: parseFloat(stakeAmount),
      stakeCurrency,
      duration: `${durationHours} hours`,
      durationHours: parseFloat(durationHours),
      participants: 0,
      completed: 0,
      totalPot: 0,
      createdBy: 'currentUser',
      endsAt: new Date(Date.now() + parseFloat(durationHours) * 60 * 60 * 1000),
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
    setStep(1);
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">What's your challenge?</h3>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-lg"
          placeholder="e.g. 30 minute walk"
          required
        />
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Or choose a template:</h4>
        <div className="grid grid-cols-1 gap-3">
          {TEMPLATES.map((template, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleTemplateSelect(template)}
              className="border rounded-lg p-3 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium">{template.title}</div>
              <div className="text-sm text-gray-500">{template.description}</div>
              <div className="text-xs mt-1">
                <span className="inline-block bg-gray-100 rounded-full px-2 py-1 mr-2">
                  {template.durationHours}h
                </span>
                <span className="inline-block bg-gray-100 rounded-full px-2 py-1">
                  ${template.stakeAmount}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Button 
        type="button" 
        onClick={() => setStep(2)} 
        disabled={!title}
        className="w-full"
      >
        Continue
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Set the details</h3>
      
      <div>
        <label htmlFor="durationHours" className="block text-sm font-medium text-gray-700">Duration</label>
        <div className="flex gap-2 mt-2">
          {['0.5', '1', '2', '4', '8', '24'].map((hours) => (
            <button
              key={hours}
              type="button"
              onClick={() => setDurationHours(hours)}
              className={`px-4 py-2 rounded-md ${durationHours === hours ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            >
              {hours === '0.5' ? '30m' : hours === '24' ? '1d' : `${hours}h`}
            </button>
          ))}
        </div>
        <input
          type="number"
          id="durationHours"
          value={durationHours}
          onChange={(e) => setDurationHours(e.target.value)}
          className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="stakeAmount" className="block text-sm font-medium text-gray-700">
            Stake Amount (${stakeAmount ? (parseFloat(stakeAmount) * 1.0).toFixed(2) : '0.00'} USD)
          </label>
          <input
            type="range"
            id="stakeAmount"
            min="1"
            max="100"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            className="mt-1 block w-full"
          />
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
            <option value="USD">USD</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
      </div>

      <div className="flex justify-between">
        <Button type="button" onClick={() => setStep(1)} variant="outline">
          Back
        </Button>
        <Button type="button" onClick={() => setStep(3)}>
          Continue
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Review & Launch</h3>
      
      <div className="border rounded-lg p-4">
        <h4 className="font-bold text-lg">{title}</h4>
        <p className="text-gray-600">{description}</p>
        <div className="flex gap-2 mt-2">
          <span className="inline-block bg-gray-100 rounded-full px-2 py-1 text-sm">
            {durationHours === '0.5' ? '30m' : durationHours === '24' ? '1d' : `${durationHours}h`}
          </span>
          <span className="inline-block bg-gray-100 rounded-full px-2 py-1 text-sm">
            {category}
          </span>
          <span className="inline-block bg-gray-100 rounded-full px-2 py-1 text-sm">
            ${stakeAmount} {stakeCurrency}
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="rules" className="block text-sm font-medium text-gray-700">Rules (one per line)</label>
        <textarea
          id="rules"
          value={rules}
          onChange={(e) => setRules(e.target.value)}
          rows={4}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="Example: Must take photo as proof\nMust complete between 7-9am"
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

      <div className="flex justify-between">
        <Button type="button" onClick={() => setStep(2)} variant="outline">
          Back
        </Button>
        <Button type="submit" className="bg-green-500 hover:bg-green-600">
          Launch Challenge
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <div className="flex justify-center mb-6">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${step === stepNumber ? 'bg-blue-500 text-white' : 
                  step > stepNumber ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}
            >
              {stepNumber}
            </div>
            {stepNumber < 3 && (
              <div className={`w-8 h-1 ${step > stepNumber ? 'bg-green-100' : 'bg-gray-100'}`}></div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </form>
    </Card>
  );
};

export default ChallengeCreationForm;
