import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../Context';
import styles from '../Login/Login.module.css';

const Signup = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		checkbox: false,
	});

	const navigate = useNavigate();

	const { authDispatch } = useAuth();

	const formSubmitHandler = async (e) => {
		if (
			formData.name &&
			formData.email &&
			formData.password &&
			formData.confirmPassword &&
			formData.checkbox
		) {
			e.preventDefault();
			if (formData.password === formData.confirmPassword) {
				try {
					const response = await axios.post('/api/auth/signup', {
						email: formData.email,
						password: formData.password,
						firstName: formData.name,
					});
					if (response.status === 201) {
						authDispatch({
							type: 'SIGNUP',
							payload: { token: response.data.encodedToken, user: response.data.createdUser },
						});
						toast.success(`Welcome ${response.data.createdUser.firstName}`);
						navigate(-2);
					} else {
						console.error('ERROR: ', response);
					}
				} catch (error) {
					toast.error(error.response.data.errors[0]);
					console.error(error);
				}
			} else {
				toast.error('Passwords do not match');
			}
		}
	};

	return (
		<>
			<main>
				<form action="">
					<div className={styles.loginContainer}>
						<h3>Signup</h3>
						<div className={`input-container ${styles.inputContainer}`}>
							<label htmlFor="name">Full Name *</label>
							<input
								type="text"
								id="name"
								name="name"
								placeholder="Enter your full name"
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								required
							/>
						</div>
						<div className={`input-container ${styles.inputContainer}`}>
							<label htmlFor="email">Email Address *</label>
							<input
								type="email"
								id="email"
								name="email"
								placeholder="Enter your email"
								value={formData.email}
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
								required
							/>
						</div>
						<div className={`input-container ${styles.inputContainer}`}>
							<label htmlFor="password">Password *</label>
							<input
								type="password"
								id="password"
								name="password"
								placeholder="Enter your password"
								value={formData.password}
								onChange={(e) => setFormData({ ...formData, password: e.target.value })}
								required
							/>
						</div>
						<div className={`input-container ${styles.inputContainer}`}>
							<label htmlFor="confirm-password">Confirm Password *</label>
							<input
								type="password"
								id="confirm-password"
								name="password"
								placeholder="Confirm password"
								value={formData.confirmPassword}
								onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
								required
							/>
						</div>
						<div className={`checkbox-container ${styles.checkboxContainer}`}>
							<input
								type="checkbox"
								name="disabled example input"
								id="checkbox-1"
								required
								checked={formData.checkbox}
								onChange={() => setFormData((prev) => ({ ...prev, checkbox: !prev.checkbox }))}
							/>
							<label htmlFor="checkbox-1">Accept all terms and conditions</label>
						</div>
						<button className={`btn ${styles.btn}`} onClick={formSubmitHandler} type="submit">
							Sign Up
						</button>
						<div className={styles.spacer}>
							<span>OR</span>
						</div>
						<button className={`btn ${styles.btn} ${styles.secondary}`}>
							<Link to="/login">Log In</Link>
						</button>
					</div>
				</form>
			</main>
		</>
	);
};

export { Signup };
