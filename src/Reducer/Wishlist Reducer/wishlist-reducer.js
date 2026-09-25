export const wishlistReducer = (state, action) => {
	const { payload } = action;
	switch (action.type) {
		case 'INITIAL':
			return { ...state, wishlist: payload };

		case 'ADD_TO_WISHLIST':
			return { ...state, wishlist: payload };

		case 'REMOVE_FROM_WISHLIST':
			return { ...state, wishlist: payload };

		case 'LOGOUT':
			return { ...state, wishlist: [] };

		default:
			throw new Error('ERROR!!! NO CASE FOUND IN WISHLIST REDUCER');
	}
};
