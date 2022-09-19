import React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function Profile() {
	const [data, setData] = React.useState({});
	const [adminPriv, setAdminPriv] = React.useState(false);

	const userId = localStorage.getItem('user');
	const docSnap = async (ref) => {
		const doc = await getDoc(ref);
		setData(doc.data());
	};
	React.useEffect(() => {
		if (userId) {
			if (userId === 'dUDc4IorGxtsR2HDHoy4') {
				setAdminPriv(true);
				const docRef = doc(db, 'users', userId);
				docSnap(docRef);
			} else {
				const docRef = doc(db, 'users', userId);
				docSnap(docRef);
			}
		}
	}, []);

	return (
		<main>
			<h2>Profile</h2>
			<p>Role: {adminPriv ? <span>Admin</span> : <span>Kunden</span>}</p>

			<p>Name: {data.userName}</p>
			<p>Password: {data.password}</p>
		</main>
	);
}
