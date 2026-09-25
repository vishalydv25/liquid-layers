export const ratingFilter = (state, products) => {
	if (state.rating) return products.filter((product) => product.rating >= state.rating);
	else return products;
};
