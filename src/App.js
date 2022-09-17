import logo from './logo.svg';
import './App.css';
import Login from './routes/login';
import Home from './routes/home';
import { Routes, Route, Link } from 'react-router-dom';
import Order from './routes/order';

function App() {
	return (
		<div className='App'>
			<header>
				<Link to='/'>Home</Link>
				<Link to='login'>Login</Link>
				<Link to='order'>Order</Link>
			</header>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='login' element={<Login />} />
				<Route path='order' element={<Order />} />
			</Routes>
		</div>
	);
}

export default App;
