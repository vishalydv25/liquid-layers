import axios from 'axios';

export const addToWishlistHandler = async (product, token) => {
	try {
		const response = await axios.post(
			'/api/user/wishlist',
			{ product },
			{ headers: { authorization: token } }
		);
		if (response.status === 201) {
			return response;
		} else {
			throw new Error('ERROR: ', response);
		}
	} catch (error) {
		console.error('ERROR: ', error);
	}
};
