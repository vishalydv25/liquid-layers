import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Profile } from '../../Components';
import styles from './User.module.css';

const User = () => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<>
			<nav className={styles.userNav}>
				<button
					className={location.pathname === '/user' ? styles.active : ''}
					onClick={() => navigate('/user')}
				>
					Profile
				</button>
				<button
					className={location.pathname === '/user/address' ? styles.active : ''}
					onClick={() => navigate('/user/address')}
				>
					Address
				</button>
				<button
					className={location.pathname === '/user/orders' ? styles.active : ''}
					onClick={() => navigate('/user/orders')}
				>
					Orders
				</button>
			</nav>
			<section className={styles.container}>
				{location.pathname === '/user' ? <Profile /> : null}
				<Outlet />
			</section>
		</>
	);
};

export { User };
