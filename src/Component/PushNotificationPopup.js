'use client';
import { useState } from 'react';
import usePushNotifications from './usePushNotifications';

export default function PushNotificationPopup() {
  const [showPopup, setShowPopup] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const registerPush = usePushNotifications();

  const handleAllow = async () => {
    await registerPush();
    setNotificationsEnabled(true);
    setShowPopup(false);
  };

  const handleDeny = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Push Notifications</h1>
      {notificationsEnabled && <p>Push notifications are enabled.</p>}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">Enable Notifications?</h2>
            <p className="mb-6 text-gray-600">
              Allow this app to send you push notifications.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={handleAllow}
              >
                Allow
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                onClick={handleDeny}
              >
                Deny
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
