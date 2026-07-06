import axios from 'axios';

export const deleteAddress = async (_id, token, authDispatch) => {
	try {
		const response = await axios.delete(`/api/user/address/${_id}`, {
			headers: { authorization: token },
		});
		if (response.status === 200) {
			authDispatch({ type: 'DELETE_ADDRESS', payload: response.data.address });
		}
	} catch (error) {
		console.error('ERROR', error);
	}
};
