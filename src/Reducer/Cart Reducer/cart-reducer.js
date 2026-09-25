export const cartReducer = (state, action) => {
	const { payload } = action;

	switch (action.type) {
		case 'INITIAL':
			return { ...state, cart: payload };

		case 'ADD_TO_CART':
			return { ...state, cart: payload };

		case 'INCREMENT':
			return { ...state, cart: payload };

		case 'DECREMENT':
			return { ...state, cart: payload };

		case 'REMOVE_FROM_CART':
			return { ...state, cart: payload };

		case 'LOGOUT':
			return { ...state, cart: [] };

		default:
			throw new Error('NO CASE FOUND IN CART REDUCER');
	}
};
