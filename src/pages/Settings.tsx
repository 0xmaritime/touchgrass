import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useUser } from '../context/UserContext';

const Settings: React.FC = () => {
  const { currentUser, updateUserSettings } = useUser();
  const [username, setUsername] = useState(currentUser?.username || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // Placeholder

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      // Simulate API call to update settings
      console.log('Saving settings:', { username, avatar, notificationsEnabled });
      updateUserSettings({ username, avatar }); // Assuming updateUserSettings only handles these for now
      alert('Settings saved successfully!');
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please connect your wallet</h2>
          <p className="text-gray-600">You need to connect your wallet to access settings</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Avatar URL</label>
            <input
              type="text"
              id="avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {avatar && (
              <img src={avatar} alt="Avatar Preview" className="mt-2 w-20 h-20 rounded-full object-cover" />
            )}
          </div>

          <div className="flex items-center">
            <input
              id="notifications"
              name="notifications"
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="notifications" className="ml-2 block text-sm text-gray-900">Enable Notifications</label>
          </div>

          <Button type="submit" className="w-full">Save Settings</Button>
        </form>
      </Card>
    </div>
  );
};

export default Settings;
