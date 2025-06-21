import React, { useState } from 'react';
import { WalletProvider } from './context/WalletContext';
import { useWallet } from './context/WalletContext';
import { StakeChallenge } from './components/StakeChallenge';
import { ActiveChallenge } from './components/ActiveChallenge';
import { ResultScreen } from './components/ResultScreen';

type AppState = 'landing' | 'active' | 'result';

interface ChallengeData {
  stakeAmount: number;
  duration: number;
  startTime: number;
}

const AppContent: React.FC = () => {
  const { isConnected, connect } = useWallet();
  const [appState, setAppState] = useState<AppState>('landing');
  const [challengeData, setChallengeData] = useState<ChallengeData | null>(null);
  const [result, setResult] = useState<{ success: boolean; payout: number } | null>(null);

  const handleStakeChallenge = (stakeAmount: number, duration: number) => {
    const challenge = {
      stakeAmount,
      duration,
      startTime: Date.now()
    };
    setChallengeData(challenge);
    setAppState('active');
  };

  const handleChallengeComplete = (success: boolean, photoProof?: string) => {
    if (!challengeData) return;
    
    const payout = success 
      ? challengeData.stakeAmount * 1.2 // 20% bonus for success
      : 0;
    
    setResult({ success, payout });
    setAppState('result');
  };

  const handleNewChallenge = () => {
    setChallengeData(null);
    setResult(null);
    setAppState('landing');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">TouchGrass</h1>
          <p className="text-gray-400">Bet crypto you'll go outside</p>
        </header>

        {!isConnected ? (
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="bg-gray-800 rounded-lg p-8 mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Put Your Money Where Your Mouth Is
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  Bet crypto you'll actually touch grass instead of staring at charts all day
                </p>
                <p className="text-gray-400 mb-8">
                  Finally, a way to use your gambling addiction for good. Your wallet won't thank you, but your vitamin D levels will.
                </p>
                <button
                  onClick={() => connect('phantom')}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl"
                >
                  Connect Wallet & Touch Grass
                </button>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-gray-800 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-center mb-8">How It Works (It's Stupidly Simple)</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">💰</div>
                  <h4 className="font-bold mb-2">1. Stake Crypto</h4>
                  <p className="text-sm text-gray-400">
                    Bet $1-50 that you'll go outside. No, your balcony doesn't count.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🚶</div>
                  <h4 className="font-bold mb-2">2. Touch Grass</h4>
                  <p className="text-sm text-gray-400">
                    Actually go outside for the time you committed. Revolutionary concept, we know.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">📸</div>
                  <h4 className="font-bold mb-2">3. Prove It</h4>
                  <p className="text-sm text-gray-400">
                    Upload a photo. Selfies with houseplants will be rejected.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🎉</div>
                  <h4 className="font-bold mb-2">4. Get Paid</h4>
                  <p className="text-sm text-gray-400">
                    Get your money back + bonus from the quitters. Stonks! 📈
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ/Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="font-bold mb-3">Why This Actually Works</h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Your crypto addiction finally serves a purpose</li>
                  <li>• Financial pain &gt; fear of sunlight</li>
                  <li>• Public shame when you lose money to grass-touchers</li>
                  <li>• Actually get vitamin D (probably)</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="font-bold mb-3">Perfect For</h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Crypto degens who forgot what sunlight feels like</li>
                  <li>• People who check charts more than text messages</li>
                  <li>• Anyone whose skin has achieved translucent status</li>
                  <li>• Reformed apes who sold at the top (unlikely)</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <>
            {appState === 'landing' && (
              <StakeChallenge onStake={handleStakeChallenge} />
            )}
            {appState === 'active' && challengeData && (
              <ActiveChallenge
                challengeData={challengeData}
                onComplete={handleChallengeComplete}
              />
            )}
            {appState === 'result' && result && challengeData && (
              <ResultScreen
                result={result}
                stakeAmount={challengeData.stakeAmount}
                onNewChallenge={handleNewChallenge}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  );
}

export default App;
