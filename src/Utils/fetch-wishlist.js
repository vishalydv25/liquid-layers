import axios from 'axios';

export const fetchWishlist = async (token, wishlistDispatch, setIsLoading) => {
	try {
		const response = await axios.get('/api/user/wishlist', {
			headers: { authorization: token },
		});
		if (response.status === 200) {
			setIsLoading && setIsLoading(false);
			wishlistDispatch({ type: 'INITIAL', payload: response.data.wishlist });
		}
	} catch (error) {
		console.error('ERROR: ', error);
	}
};
