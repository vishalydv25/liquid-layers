import axios from 'axios';

export const addNewAddress = async (token, address, authDispatch) => {
	try {
		const response = await axios.post(
			'/api/user/address',
			{ address },
			{ headers: { authorization: token } }
		);
		if (response.status === 201) {
			authDispatch({ type: 'ADD_NEW_ADDRESS', payload: response.data.address });
		}
	} catch (error) {
		console.error('ERROR', error);
	}
};
