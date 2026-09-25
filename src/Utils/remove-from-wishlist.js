import axios from 'axios';

export const removeFromWishlistHandler = async (_id, token) => {
	try {
		const response = await axios.delete(`/api/user/wishlist/${_id}`, {
			headers: { authorization: token },
		});
		if (response.status === 200) {
			return response;
		} else {
			throw new Error('ERROR: ', response);
		}
	} catch (error) {
		console.error('ERROR: ', error);
	}
};
