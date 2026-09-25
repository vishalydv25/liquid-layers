import axios from 'axios';

export const editAddress = async ({ _id, address, token, authDispatch }) => {
	try {
		const response = await axios.post(
			`/api/user/address/${_id}`,
			{
				address,
			},
			{ headers: { authorization: token } }
		);
		if (response.status === 200) {
			authDispatch({ type: 'EDIT_ADDRESS', payload: response.data.address });
		}
	} catch (error) {
		console.error('ERROR', error);
	}
};
