import React from 'react';

interface ResultScreenProps {
  result: {
    success: boolean;
    payout: number;
  };
  stakeAmount: number;
  onNewChallenge: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ 
  result, 
  stakeAmount, 
  onNewChallenge 
}) => {
  const { success, payout } = result;

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        {/* Success/Failure Header */}
        <div className="mb-8">
          {success ? (
            <>
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-green-400 mb-2">
                Challenge Complete!
              </h2>
              <p className="text-gray-400">
                You touched grass and earned your reward
              </p>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">😔</div>
              <h2 className="text-3xl font-bold text-red-400 mb-2">
                Challenge Failed
              </h2>
              <p className="text-gray-400">
                Better luck next time, crypto degen
              </p>
            </>
          )}
        </div>

        {/* Payout Details */}
        <div className="bg-gray-700 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-400 mb-1">Staked</div>
              <div className="text-xl font-bold text-red-400">
                -${stakeAmount.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">
                {success ? 'Earned' : 'Lost'}
              </div>
              <div className={`text-xl font-bold ${
                success ? 'text-green-400' : 'text-red-400'
              }`}>
                {success ? `+$${payout.toFixed(2)}` : '$0.00'}
              </div>
            </div>
          </div>
          
          <hr className="border-gray-600 my-4" />
          
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">Net Result</div>
            <div className={`text-2xl font-bold ${
              success ? 'text-green-400' : 'text-red-400'
            }`}>
              {success 
                ? `+$${(payout - stakeAmount).toFixed(2)}`
                : `-$${stakeAmount.toFixed(2)}`
              }
            </div>
          </div>
        </div>

        {/* Success Details */}
        {success && (
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-8">
            <h3 className="text-green-400 font-medium mb-2">How You Earned</h3>
            <div className="text-sm text-gray-300 space-y-1">
              <div>• Stake refund: ${stakeAmount.toFixed(2)}</div>
              <div>• Success bonus: ${(payout - stakeAmount).toFixed(2)}</div>
              <div className="text-xs text-gray-500 mt-2">
                Bonus comes from failed challenges in the pool
              </div>
            </div>
          </div>
        )}

        {/* Failure Details */}
        {!success && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-8">
            <h3 className="text-red-400 font-medium mb-2">What Happened</h3>
            <div className="text-sm text-gray-300 space-y-1">
              <div>• Your ${stakeAmount} stake goes to successful participants</div>
              <div>• They get bonus rewards from your failure</div>
              <div className="text-xs text-gray-500 mt-2">
                Money talks. Next time, actually go outside.
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-700 rounded-lg p-3">
            <div className="text-xs text-gray-400">Success Rate</div>
            <div className="text-lg font-bold">73%</div>
            <div className="text-xs text-gray-500">Global average</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <div className="text-xs text-gray-400">Pool Size</div>
            <div className="text-lg font-bold">$2,847</div>
            <div className="text-xs text-gray-500">Active stakes</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onNewChallenge}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg"
          >
            {success ? 'Take Another Challenge' : 'Try Again (And Actually Do It)'}
          </button>
          
          <div className="flex gap-3">
            <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg">
              Share Result
            </button>
            <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg">
              View Stats
            </button>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-6 text-xs text-gray-500">
          {success 
            ? "Proof that financial incentives work. Keep it up!"
            : "Your screen addiction cost you money. Time to touch grass for real."
          }
        </div>
      </div>
    </div>
  );
};