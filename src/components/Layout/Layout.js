import React, { useState } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => {
	const [showSideDrawer, setShowSideDrawer] = useState(false);

	const sideDrawerClosedHandler = () => {
		setShowSideDrawer(false);
	};

	const menuClickedHandler = () => {
		setShowSideDrawer(!showSideDrawer);
	};

	return (
		<Aux>
			<Toolbar menuClicked={menuClickedHandler} isAuth={props.isAuthenticated} />
			<SideDrawer closed={sideDrawerClosedHandler} open={showSideDrawer} isAuth={props.isAuthenticated} />
			<main className={classes.Content}>{props.children}</main>
		</Aux>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(layout);
