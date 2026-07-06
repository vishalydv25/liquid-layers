export const productSort = (state, products) => {
	const discountedPrice = (price, discount = 0) => price - (discount / 100) * price;

	if (state.sortBy === 'lowtohigh') {
		return [...products].sort(
			(product1, product2) =>
				discountedPrice(product1.price, product1.discount) -
				discountedPrice(product2.price, product2.discount)
		);
	}

	if (state.sortBy === 'hightolow') {
		return [...products].sort(
			(product1, product2) =>
				discountedPrice(product2.price, product2.discount) -
				discountedPrice(product1.price, product1.discount)
		);
	}

	return products;
};
