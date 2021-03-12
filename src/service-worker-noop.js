/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This line is required by Create React App Webpack configuration, but it has no effect in this case.
// eslint-disable-next-line no-unused-vars
const ignored = self.__WB_MANIFEST

self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil(burnDownTheHouse())
})

async function burnDownTheHouse() {
  // Unregister
  self.registration.unregister()
  // Delete all caches
  const keys = await self.caches.keys()
  await Promise.all(keys.map((key) => self.caches.delete(key)))
  // Force refresh all windows
  const clients = await self.clients.matchAll({ type: 'window' })
  clients.forEach((client) => {
    if ('navigate' in client) {
      client.navigate(client.url)
    }
  })
}
