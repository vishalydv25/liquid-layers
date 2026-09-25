import axios from 'axios';

export const fetchCartProducts = async (token, cartDispatch, setIsLoading) => {
	try {
		const response = await axios.get('/api/user/cart', {
			headers: { authorization: token },
		});
		if (response.status === 200) {
			setIsLoading && setIsLoading(false);
			cartDispatch({ type: 'INITIAL', payload: response.data.cart });
		}
	} catch (error) {
		console.error('ERROR: ', error);
	}
};
