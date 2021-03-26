import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() => {
	return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
	return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
	return import('./containers/Auth/Auth');
});

const app = (props) => {
	// Like componentDidMount
	useEffect(() => {
		props.onTryAutoSignup();
	}, []);

	let routes = (
		<Switch>
			<Route path='/auth' component={asyncAuth} />
			<Route path='/' component={BurgerBuilder} />
		</Switch>
	);

	if (props.isAuthenticated) {
		routes = (
			<Switch>
				<Route path='/checkout' component={asyncCheckout} />
				<Route path='/orders' component={asyncOrders} />
				<Route path='/logout' component={Logout} />
				<Route path='/auth' component={asyncAuth} />
				<Route path='/' component={BurgerBuilder} />
			</Switch>
		);
	}

	return (
		<div>
			<BrowserRouter>
				<Layout>{routes}</Layout>
			</BrowserRouter>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => {
			dispatch(actions.authCheckState());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(app);
