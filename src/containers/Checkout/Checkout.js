import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

const checkout = (props) => {
	const checkoutCancelledHandler = () => {
		props.history.goBack();
	};

	const checkoutContinuedHandler = () => {
		props.history.replace('/checkout/contact-data');
	};

	let summary = <Redirect to='/' />;
	if (props.ings) {
		const purchasedRedirect = props.purchased ? <Redirect to='/' /> : null;
		summary = (
			<div>
				{purchasedRedirect}
				<CheckoutSummary
					ingredients={props.ings}
					checkoutContinued={checkoutContinuedHandler}
					checkoutCancelled={checkoutCancelledHandler}
				/>
				<Route path={props.match.url + '/contact-data'} component={ContactData} />
			</div>
		);
	}
	return summary;
};

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased,
	};
};

export default connect(mapStateToProps)(checkout);
