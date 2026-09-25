export const filterReducer = (state, action) => {
	const { payload } = action;

	switch (action.type) {
		case 'PRICE':
			return { ...state, price: payload.price };

		case 'RATING_FILTER':
			return { ...state, rating: payload.value };

		case 'SORT':
			if (payload.type === 'lowtohigh') {
				return { ...state, sortBy: 'lowtohigh' };
			} else {
				return { ...state, sortBy: 'hightolow' };
			}

		case 'CATEGORY_FILTER':
			if (!state.category.includes(payload.type)) {
				return { ...state, category: [...state.category, payload.type] };
			} else {
				const removeCategory = state.category.find((category) => category === payload.type);
				const newCategories = state.category.filter((category) => category !== removeCategory);
				return { ...state, category: newCategories };
			}

		case 'OUT_OF_STOCK':
			return { ...state, outOfStock: !state.outOfStock };

		case 'CLEAR':
			return { ...state, price: 5000, category: [], rating: null, sortBy: null, outOfStock: false };

		default:
			throw new Error('ACTION NOT DEFINED');
	}
};
