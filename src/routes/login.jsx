import React from 'react';
import { db } from '../firebase/firebase';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
export default function Login() {
	const usersCollectionRef = collection(db, 'users');
	const [data, setData] = React.useState([]);
	const [loginCre, setLoginCre] = React.useState({
		userName: '',
		password: '',
	});
	const [loginMessage, setLoginMessage] = React.useState();

	React.useEffect(() => {
		const getUsers = async () => {
			try {
				const data = await getDocs(usersCollectionRef);
				setData(
					data.docs.map((doc) => ({
						...doc.data(),
						id: doc.id,
					}))
				);
			} catch (err) {
				console.log('Error getting message: ', err);
			}
		};
		getUsers();
		// eslint-disable-next-line
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();

		const found = data.find(
			(user) =>
				user.userName === loginCre.userName &&
				user.password === loginCre.password
		);
		if (found) {
			localStorage.setItem('user', found.id);
			setLoginMessage(<p>Login successful!</p>);
		} else {
			setLoginMessage(<p>Wrong username or password!</p>);
		}
	};
	return (
		<main>
			<h2 onClick={() => console.log(data)}>Login</h2>
			<h2 onClick={() => console.log(loginCre)}>LoginCre</h2>
			<section>
				<form onSubmit={(e) => handleSubmit(e)}>
					<label htmlFor='user-name'>
						Username:
						<input
							type='text'
							id='user-name'
							name='user-name'
							value={loginCre.userName}
							onChange={(e) =>
								setLoginCre({ ...loginCre, userName: e.target.value })
							}
						/>
					</label>
					<label htmlFor='password'>
						Password:
						<input
							type='password'
							id='password'
							name='password'
							value={loginCre.password}
							onChange={(e) =>
								setLoginCre({ ...loginCre, password: e.target.value })
							}
						/>
					</label>
					<button>Login</button>
					{loginMessage}
				</form>
			</section>
		</main>
	);
}
