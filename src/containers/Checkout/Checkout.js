import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
	state = {
		ingredients: {
			salad: 0,
			meat: 0,
			bacon: 0,
			cheese: 0,
		},
		totalPrice: 0,
	};

	componentDidMount() {
		const searchParams = new URLSearchParams(this.props.location.search);
		const ingredientJSON = searchParams.get('ingredients');
		if (ingredientJSON) {
			//only enters if order was formed. Leaves default ingredients if entered through url
			this.setState({
				ingredients: JSON.parse(decodeURIComponent(ingredientJSON)),
				totalPrice: +searchParams.get('price'),
			});
		}
	}

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
					ingredients={this.state.ingredients}
					checkoutContinued={this.checkoutContinuedHandler}
					checkoutCancelled={this.checkoutCancelledHandler}
				/>
				<Route
					path={this.props.match.url + '/contact-data'}
					render={(props) => (
						<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />
					)}
				/>
			</div>
		);
	}
}

export default Checkout;
