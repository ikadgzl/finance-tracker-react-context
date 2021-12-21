import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDXZ370RFdSPnzjZuCv1LFtvvmZCRXICP4',
  authDomain: 'finance-tracker-58962.firebaseapp.com',
  projectId: 'finance-tracker-58962',
  storageBucket: 'finance-tracker-58962.appspot.com',
  messagingSenderId: '922206485921',
  appId: '1:922206485921:web:4d95a1968520be3687dfe0'
};

firebase.initializeApp(firebaseConfig);

const projectFireStore = firebase.firestore();
const projectAuth = firebase.auth();

const timeStamp = firebase.firestore.Timestamp;

export { projectFireStore, projectAuth, timeStamp };
