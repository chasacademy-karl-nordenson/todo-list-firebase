import { initializeApp } from 'firebase/app';

import {
  getFirestore
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB6XsN-NZ7I9ZzV0loIn6zvcG-LT58q_HQ",
    authDomain: "todo-list-react-27399.firebaseapp.com",
    projectId: "todo-list-react-27399",
    storageBucket: "todo-list-react-27399.appspot.com",
    messagingSenderId: "982610664158",
    appId: "1:982610664158:web:965144bf7514782181404f",
    measurementId: "G-66HN8WBX43"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db