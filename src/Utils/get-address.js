import axios from 'axios';

export const getAddress = async (token, authDispatch) => {
	try {
		const response = await axios.get('/api/user/address', { headers: { authorization: token } });
		if (response.status === 200) {
			authDispatch({ type: 'GET_ADDRESS', payload: response.data.address });
		}
	} catch (error) {
		console.error('ERROR', error);
	}
};
