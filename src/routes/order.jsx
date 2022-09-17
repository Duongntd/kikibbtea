import React from 'react';
import menu from '../menu.json';
export default function Order() {
	const menuMap = menu.map((drink) => {
		return (
			<div className={drink.type}>
				<span>{drink.id}</span>
				<span>{drink.name}</span>
				<span>{drink.priceM}</span>
				<span>{drink.priceL}</span>
			</div>
		);
	});
	const listEistee = menuMap.filter(
		(drink) => drink.props.className === 'Eistee'
	);
	const listTee = menuMap.filter((drink) => drink.props.className === 'Tee');
	const listMilchtee = menuMap.filter(
		(drink) => drink.props.className === 'Milchtee'
	);
	const listJoghurt = menuMap.filter(
		(drink) => drink.props.className === 'Joghurt'
	);
	const listBraunerZucker = menuMap.filter(
		(drink) => drink.props.className === 'Brauner Zucker'
	);
	const listCafe = menuMap.filter((drink) => drink.props.className === 'Cafe');
	const listSmoothie = menuMap.filter(
		(drink) => drink.props.className === 'Smoothie'
	);
	return (
		<main>
			<h2>Order</h2>
			<div className='tab'>
				<h3>Fruchtiger Eistee</h3>
				{listEistee}
			</div>
			<div className='tab'>
				<h3>Tee</h3>
				{listTee}
			</div>
			<div className='tab'>
				<h3>Milchtee</h3>
				{listMilchtee}
			</div>
			<div className='tab'>
				<h3>Joghurt</h3>
				{listJoghurt}
			</div>
			<div className='tab'>
				<h3>Braun Zucker</h3>
				{listBraunerZucker}
			</div>
			<div className='tab'>
				<h3>Cafe</h3>
				{listCafe}
			</div>
			<div className='tab'>
				<h3>Smoothie</h3>
				{listSmoothie}
			</div>
		</main>
	);
}
