export const searchProducts = (products, value) =>
	products.filter((product) => product.title.toLowerCase().includes(value.toLowerCase()));
