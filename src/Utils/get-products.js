import axios from 'axios';

export const fetchProducts = async (setIsError, setIsLoading, setProducts) => {
	try {
		const response = await axios.get('/api/products');
		if (response.status === 200) {
			setIsLoading(false);
			setIsError(false);
			setProducts(response.data.products);
		}
	} catch (error) {
		setIsLoading(false);
		setIsError(true);
		console.error('ERROR: ', error);
	}
};
