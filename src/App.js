import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from './components/UI/Spinner/Spinner';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => {
	return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
	return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
	return import('./containers/Auth/Auth');
});

const app = (props) => {
	// Like componentDidMount
	const { onTryAutoSignup } = props;
	useEffect(() => {
		onTryAutoSignup();
	}, [onTryAutoSignup]);

	let routes = (
		<Switch>
			<Route path='/auth' component={Auth} />
			<Route path='/' component={BurgerBuilder} />
		</Switch>
	);

	if (props.isAuthenticated) {
		routes = (
			<Switch>
				<Route path='/checkout' component={Checkout} />
				<Route path='/orders' component={Orders} />
				<Route path='/logout' component={Logout} />
				<Route path='/auth' component={Auth} />
				<Route path='/' component={BurgerBuilder} />
			</Switch>
		);
	}

	return (
		<div>
			<BrowserRouter>
				<Suspense fallback={<Spinner />}>
					<Layout>{routes}</Layout>
				</Suspense>
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
