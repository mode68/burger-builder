import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary';

const sideDrawer = (props) => {
	return (
		<Aux>
			<Backdrop show={props.open} clicked={props.closed} />
			<div
				className={[classes.SideDrawer, props.open ? classes.Open : classes.Close].join(' ')}
				onClick={props.closed}
			>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuthenticated={props.isAuth} />
				</nav>
			</div>
		</Aux>
	);
};

export default sideDrawer;
