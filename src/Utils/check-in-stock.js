export const checkInStock = (state, products) => {
	if (state.outOfStock) {
		const inStockProducts = products.filter((product) => product.badge !== 'Out of Stock');
		return inStockProducts;
	}
	return products;
};
