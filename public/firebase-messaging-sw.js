// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBp6cpg0NZv-RAO5Pb-9b-0uBsOin7yEzk",
    authDomain: "aboutbits-pwa-boilerplate.firebaseapp.com",
    projectId: "aboutbits-pwa-boilerplate",
    storageBucket: "aboutbits-pwa-boilerplate.appspot.com",
    messagingSenderId: "70260471519",
    appId: "1:70260471519:web:0ee56272c625ec38891b6a"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
