import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './routes/login';
import Home from './routes/home';
import Profile from './routes/profile';
import Order from './routes/order';
function App() {
	return (
		<div className='App'>
			<header>
				<Link to='/'>Home</Link>
				<Link to='login'>Login</Link>
				<Link to='order'>Order</Link>
				<Link to='profile'>Profile</Link>
			</header>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='login' element={<Login />} />
				<Route path='order' element={<Order />} />
				<Route path='profile' element={<Profile />} />
			</Routes>
		</div>
	);
}

export default App;
