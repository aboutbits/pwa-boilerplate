/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as WorkboxCore from 'workbox-core';

declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil(burnDownTheHouse());
});

async function burnDownTheHouse() {
  // Unregister
  self.registration.unregister();
  // Delete all caches
  const keys = await self.caches.keys();
  await Promise.all(keys.map(key => self.caches.delete(key)));
  // Force refresh all windows
  const clients = await self.clients.matchAll({ type: 'window' });
  clients.forEach((client) => {

    if ('navigate' in client) {
      (client as WindowClient).navigate((client as Client).url)
    }
  })
}
