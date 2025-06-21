import React, { useState } from 'react';

interface StakeChallengeProps {
  onStake: (stakeAmount: number, duration: number) => void;
}

export const StakeChallenge: React.FC<StakeChallengeProps> = ({ onStake }) => {
  const [stakeAmount, setStakeAmount] = useState(5);
  const [duration, setDuration] = useState(60); // minutes

  const handleStake = () => {
    onStake(stakeAmount, duration);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Time to Bet Against Your Screen Addiction</h2>
        <p className="text-gray-400 mb-8">
          Your portfolio is down 80% anyway. At least make losing money productive.
        </p>

        {/* Stake Amount */}
        <div className="mb-8">
          <label className="block text-lg font-medium mb-4">
            Stake Amount: ${stakeAmount}
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>$1</span>
            <span>$50</span>
          </div>
        </div>

        {/* Duration */}
        <div className="mb-8">
          <label className="block text-lg font-medium mb-4">
            Time Outside: {formatDuration(duration)}
          </label>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[30, 60, 120, 240].map((mins) => (
              <button
                key={mins}
                onClick={() => setDuration(mins)}
                className={`p-3 rounded-lg font-medium ${
                  duration === mins
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {formatDuration(mins)}
              </button>
            ))}
          </div>
          <input
            type="range"
            min="15"
            max="480"
            step="15"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>15m</span>
            <span>8h</span>
          </div>
        </div>

        {/* Potential Payout */}
        <div className="bg-gray-700 rounded-lg p-4 mb-8">
          <div className="text-sm text-gray-400 mb-1">Potential Payout</div>
          <div className="text-2xl font-bold text-green-400">
            ${(stakeAmount * 1.2).toFixed(2)}
          </div>
          <div className="text-xs text-gray-500">
            (Your ${stakeAmount} + 20% bonus from quitters)
          </div>
        </div>

        {/* Stake Button */}
        <button
          onClick={handleStake}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
        >
          Stake ${stakeAmount} - Start Challenge
        </button>

        <div className="text-xs text-gray-500 mt-4">
          Honor system for now. Don't be that guy who cheats at touching grass.
        </div>
      </div>
    </div>
  );
};