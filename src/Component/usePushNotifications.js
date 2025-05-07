'use client';

import { useCallback } from 'react';

export default function usePushNotifications() {
  const registerPush = useCallback(async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;

    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;

      const reg = await navigator.serviceWorker.register('/sw.js');

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        ),
      });

      await fetch('http://localhost:5000/subscribe', {
        method: 'POST',
        body: JSON.stringify(sub),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error('Push registration failed:', err);
    }
  }, []);

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
  }

  return registerPush;
}
