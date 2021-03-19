import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.props.ings}
					checkoutContinued={this.checkoutContinuedHandler}
					checkoutCancelled={this.checkoutCancelledHandler}
				/>
				<Route path={this.props.match.url + '/contact-data'} component={ContactData} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
	};
};

export default connect(mapStateToProps)(Checkout);
