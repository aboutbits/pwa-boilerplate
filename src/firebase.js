import firebase from 'firebase/app';
import 'firebase/messaging';

var firebaseConfig = {
  apiKey: "AIzaSyBp6cpg0NZv-RAO5Pb-9b-0uBsOin7yEzk",
  authDomain: "aboutbits-pwa-boilerplate.firebaseapp.com",
  projectId: "aboutbits-pwa-boilerplate",
  storageBucket: "aboutbits-pwa-boilerplate.appspot.com",
  messagingSenderId: "70260471519",
  appId: "1:70260471519:web:0ee56272c625ec38891b6a"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

export const getToken = () => {
  return messaging.getToken().then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});

