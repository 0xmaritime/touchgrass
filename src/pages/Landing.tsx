import React, { useState } from 'react';
import { ArrowRight, Play, Users, DollarSign, TrendingUp, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { WalletModal } from '../components/wallet/WalletModal';
import { ActivityFeed } from '../components/social/ActivityFeed';
import { mockActivities } from '../data/mockActivities';
import { formatNumber } from '../utils/formatters';

export const Landing: React.FC = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Connect Wallet",
      description: "Link your crypto wallet to stake on challenges",
      icon: "🔗",
    },
    {
      title: "Choose Challenge", 
      description: "Pick from outdoor activities, fitness goals, or digital detox",
      icon: "🎯",
    },
    {
      title: "Stake & Go Outside",
      description: "Put your money where your mouth is and touch grass",
      icon: "🌱",
    },
    {
      title: "Prove & Earn",
      description: "Upload photo proof and win from those who didn't complete",
      icon: "💰",
    },
  ];

  const stats = [
    { label: "Total Staked", value: "$" + formatNumber(2450000), icon: DollarSign },
    { label: "Active Users", value: formatNumber(12500), icon: Users },
    { label: "Success Rate", value: "73%", icon: TrendingUp },
    { label: "Avg. Payout", value: "$15.40", icon: Star },
  ];

  const faqs = [
    {
      question: "How does the payout system work?",
      answer: "When you complete a challenge successfully, you get your stake back plus a share of the pot from those who failed. The more people who fail, the bigger your reward!"
    },
    {
      question: "What counts as valid proof?",
      answer: "You need to upload a timestamped photo that clearly shows you completing the challenge. The community votes on whether submissions are valid."
    },
    {
      question: "What happens if I don't complete a challenge?",
      answer: "Your stake goes into the pot that gets distributed to successful participants. This creates accountability and makes the rewards meaningful."
    },
    {
      question: "Is this gambling?",
      answer: "No - this is skill and commitment based. You have full control over whether you complete the challenge. It's more like a fitness accountability app with financial incentives."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Bet on Going
              <span className="text-green-600"> Outside</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Stake crypto on outdoor challenges, upload photo proof, and win from those who stay glued to their screens. 
              The ultimate accountability app for crypto degens who need to touch grass.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <Button
                size="lg"
                onClick={() => setIsWalletModalOpen(true)}
                icon={ArrowRight}
                className="text-lg px-8 py-4"
              >
                Start Your First Challenge
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                icon={Play}
                className="text-lg px-8 py-4"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                    <stat.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Four simple steps to better health and potential profits</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative cursor-pointer transition-all duration-300 ${
                  activeStep === index ? 'transform scale-105' : ''
                }`}
                onMouseEnter={() => setActiveStep(index)}
              >
                <Card className={`text-center h-full ${activeStep === index ? 'ring-2 ring-green-500' : ''}`}>
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </Card>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Activity Feed */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Live Activity</h2>
            <p className="text-lg text-gray-600">See what the community is up to right now</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <ActivityFeed activities={mockActivities} limit={8} />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Touch Grass Works</h2>
            <p className="text-lg text-gray-600">The psychology of accountability meets crypto incentives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="text-3xl mb-4">💪</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real Accountability</h3>
              <p className="text-gray-600">Your money is on the line. No excuses, no bailouts. Complete the challenge or lose your stake.</p>
            </Card>

            <Card className="text-center">
              <div className="text-3xl mb-4">🏆</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Win Big</h3>
              <p className="text-gray-600">The more people who fail, the bigger your reward. Success pays, literally.</p>
            </Card>

            <Card className="text-center">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Community</h3>
              <p className="text-gray-600">Join thousands of crypto users who are choosing health over charts. Build streaks, earn respect.</p>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Touch Some Grass?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join the movement. Connect your wallet and start your first challenge today.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => setIsWalletModalOpen(true)}
            icon={ArrowRight}
            className="text-lg px-8 py-4"
          >
            Connect Wallet & Start
          </Button>
        </div>
      </div>

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </div>
  );
};
