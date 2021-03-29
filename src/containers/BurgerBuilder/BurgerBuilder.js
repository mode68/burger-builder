import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const burgerBuilder = (props) => {
	const [purchasing, setPurchasing] = useState(false);

	const ings = useSelector((state) => {
		return state.burgerBuilder.ingredients;
	});

	const price = useSelector((state) => {
		return state.burgerBuilder.totalPrice;
	});

	const isAuthenticated = useSelector((state) => {
		return state.auth.token !== null;
	});

	const error = useSelector((state) => {
		return state.burgerBuilder.error;
	});

	const loading = useSelector((state) => {
		return state.order.loading;
	});

	const dispatch = useDispatch();

	const onIngredientAdded = (ingName) => {
		dispatch(actions.addIngredient(ingName));
	};
	const onIngredientRemoved = (ingName) => {
		dispatch(actions.removeIngredient(ingName));
	};
	const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), []);
	const onInitPurchase = () => dispatch(actions.purchaseInit());
	const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

	useEffect(() => {
		onInitIngredients();
	}, [onInitIngredients]);

	const updatePurchaseState = () => {
		const ingredients = {
			...ings,
		};
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	};

	const purchaseHandler = () => {
		if (isAuthenticated) {
			setPurchasing(true);
		} else {
			onSetAuthRedirectPath('/checkout');
			props.history.push('/auth');
		}
	};

	const purchaseCancelHandler = () => {
		setPurchasing(false);
	};

	const purchaseContinueHandler = () => {
		onInitPurchase();
		props.history.push('/checkout');
	};

	const disabledInfo = {
		...ings,
	};
	for (let key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0;
	}

	let orderSummary = null;
	let burger = error ? <p>Ingredients can't be loaded :(</p> : <Spinner />;
	if (ings) {
		burger = (
			<Aux>
				<Burger ingredients={ings} />
				<BuildControls
					ordered={purchaseHandler}
					price={price}
					isAuth={isAuthenticated}
					disabled={disabledInfo}
					ingredientAdded={onIngredientAdded}
					ingredientRemoved={onIngredientRemoved}
					purchasable={updatePurchaseState()}
				/>
			</Aux>
		);
		orderSummary = (
			<OrderSummary
				ingredients={ings}
				price={price}
				purchaseCancelled={purchaseCancelHandler}
				purchaseContinued={purchaseContinueHandler}
			/>
		);
	}
	if (loading) {
		orderSummary = <Spinner />;
	}

	return (
		<Aux>
			<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
				{orderSummary}
			</Modal>
			{burger}
		</Aux>
	);
};

export default withErrorHandler(burgerBuilder, axios);
