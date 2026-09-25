export const authReducer = (state, action) => {
	const { payload } = action;
	switch (action.type) {
		case 'LOGIN':
			return { ...state, token: payload.token, user: payload.user };

		case 'SIGNUP':
			return { ...state, token: payload.token, user: payload.user };

		case 'LOGOUT':
			return { ...state, token: null, user: null };

		case 'GET_ADDRESS':
			return { ...state, address: payload };

		case 'ADD_NEW_ADDRESS':
			return { ...state, address: payload };

		case 'EDIT_ADDRESS':
			return { ...state, address: payload };

		case 'DELETE_ADDRESS':
			return { ...state, address: payload };

		case 'GET_ORDERS':
			return { ...state, orders: payload };

		case 'ADD_ORDER':
			return { ...state, orders: payload };

		default:
			throw new Error('ERROR: action not defined');
	}
};
