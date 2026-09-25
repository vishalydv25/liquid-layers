import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth, useCart, useWishlist } from '../../Context';
import styles from './Profile.module.css';

const Profile = () => {
	const {
		authState: { user },
		authDispatch,
	} = useAuth();
	const { cartDispatch } = useCart();
	const { wishlistDispatch } = useWishlist();
	const navigate = useNavigate();

	const logoutHandler = () => {
		toast.success('Logged out');
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		authDispatch({ type: 'LOGOUT' });
		cartDispatch({ type: 'LOGOUT' });
		wishlistDispatch({ type: 'LOGOUT' });
		navigate('/');
	};

	return (
		<div className={styles.container}>
			<div className={`input-container ${styles.inputContainer}`}>
				<label htmlFor="name">Full Name</label>
				<input
					type="name"
					id="name"
					name="name"
					value={user.firstName + ' ' + user.lastName}
					disabled
				/>
			</div>
			<div className={`input-container ${styles.inputContainer}`}>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					autoComplete="off"
					value={user.email}
					disabled
				/>
			</div>
			<button className={`btn btn-info ${styles.logoutBtn}`} onClick={logoutHandler}>
				Logout
			</button>
		</div>
	);
};

export { Profile };
