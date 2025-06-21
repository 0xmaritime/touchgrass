import React, { useState, useEffect } from 'react';
import { PhotoUpload } from './ui/PhotoUpload';

interface ChallengeData {
  stakeAmount: number;
  duration: number;
  startTime: number;
}

interface ActiveChallengeProps {
  challengeData: ChallengeData;
  onComplete: (success: boolean, photoProof?: string) => void;
}

export const ActiveChallenge: React.FC<ActiveChallengeProps> = ({ 
  challengeData, 
  onComplete 
}) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);

  useEffect(() => {
    const endTime = challengeData.startTime + (challengeData.duration * 60 * 1000);
    
    const interval = setInterval(() => {
      const remaining = endTime - Date.now();
      if (remaining <= 0) {
        setTimeRemaining(0);
        setIsTimeUp(true);
        clearInterval(interval);
      } else {
        setTimeRemaining(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [challengeData]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePhotoUpload = (photoUrl: string) => {
    setUploadedPhoto(photoUrl);
  };

  const handleSubmitProof = () => {
    if (!uploadedPhoto) return;
    
    // Success if they uploaded a photo (trust system for MVP)
    onComplete(true, uploadedPhoto);
  };

  const handleQuit = () => {
    onComplete(false);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Challenge Active</h2>
        <p className="text-gray-400 mb-8">
          Go outside for {Math.floor(challengeData.duration / 60)}h {challengeData.duration % 60}m
        </p>

        {/* Timer */}
        <div className="mb-8">
          <div className={`text-6xl font-mono font-bold mb-2 ${
            isTimeUp ? 'text-red-400' : timeRemaining < 300000 ? 'text-yellow-400' : 'text-green-400'
          }`}>
            {formatTime(timeRemaining)}
          </div>
          <div className="text-gray-400">
            {isTimeUp ? 'Time to submit proof!' : 'Time remaining'}
          </div>
        </div>

        {/* Challenge Status */}
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-400 mb-1">Challenge Status</div>
          <div className="text-green-400 font-medium">
            {isTimeUp ? '✓ Time to submit proof!' : '⏳ Challenge in progress...'}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {isTimeUp ? 'Upload your outdoor photo below' : 'Go outside and stay there until time runs out'}
          </div>
        </div>

        {/* Photo Upload (only when time is up) */}
        {isTimeUp ? (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Upload Proof Photo</h3>
            <div className="bg-gray-700 rounded-lg p-4 mb-4">
              <div className="text-sm text-gray-400 mb-2">Requirements:</div>
              <ul className="text-xs text-gray-300 text-left">
                <li>• Photo must show you outside (we trust you... for now)</li>
                <li>• No screenshots of Google Earth</li>
                <li>• Houseplants don't count as "nature"</li>
              </ul>
            </div>
            
            <PhotoUpload
              onUpload={handlePhotoUpload}
              className="mb-4"
            />

            {uploadedPhoto && (
              <div className="mb-4">
                <img 
                  src={uploadedPhoto} 
                  alt="Proof" 
                  className="w-full max-w-xs mx-auto rounded-lg"
                />
              </div>
            )}

            <button
              onClick={handleSubmitProof}
              disabled={!uploadedPhoto}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg mb-4"
            >
              Submit Proof & Claim Reward
            </button>
          </div>
        ) : (
          <div className="text-gray-400 mb-6">
            Upload your proof photo when the timer reaches zero
          </div>
        )}

        {/* Stake Info */}
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-400 mb-1">Your Stake</div>
          <div className="text-xl font-bold">${challengeData.stakeAmount}</div>
          <div className="text-xs text-gray-500">
            Win: ${(challengeData.stakeAmount * 1.2).toFixed(2)} | Lose: $0
          </div>
        </div>

        {/* Quit Button */}
        <button
          onClick={handleQuit}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg"
        >
          Quit Challenge (Lose Stake)
        </button>
      </div>
    </div>
  );
};