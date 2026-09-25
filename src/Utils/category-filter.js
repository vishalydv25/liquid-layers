export const categoryFilter = (state, products) => {
	const selectedCategories = products.filter((product) =>
		state.category.includes(product.categoryName)
	);
	if (selectedCategories.length <= 0) {
		return products;
	}
	return selectedCategories;
};
