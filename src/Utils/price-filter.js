export const priceFilter = (state, products) => {
	const discountedPrice = (price, discount = 0) => price - (discount / 100) * price;
	return products.filter(
		(product) => discountedPrice(product.price, product.discount) < state.price
	);
};
