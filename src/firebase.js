import firebase from 'firebase/app';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyD_Z3YNjp8SAnWhnGsyANOQ6XoYqB4T6_U',
	authDomain: 'kikibbtea.firebaseapp.com',
	projectId: 'kikibbtea',
	storageBucket: 'kikibbtea.appspot.com',
	messagingSenderId: '483012984943',
	appId: '1:483012984943:web:b9916cb9d80171a7218d9a',
	measurementId: 'G-N3H5JM2KEN',
};
firebase.initializeApp(firebaseConfig);

export default firebase;
