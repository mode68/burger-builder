import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = (props) => {
	// instead of componentDidMount
	useEffect(() => {
		props.onFetchOrders(props.token, props.userId);
	}, []);

	let orders = <Spinner />;
	if (!props.loading) {
		orders = (
			<div>
				{props.orders.map((order) => {
					return <Order key={order.id} ingredients={order.ingredients} price={+order.price} />;
				})}
			</div>
		);
	}
	return orders;
};

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));
