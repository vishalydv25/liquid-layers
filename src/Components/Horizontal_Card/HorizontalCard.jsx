import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth, useCart, useWishlist } from '../../Context';
import { addToWishlistHandler, checkWishlistStatus } from '../../Utils';
import styles from './HorizontalCard.module.css';

const HorizontalCard = ({
	_id,
	title,
	image,
	price,
	qty,
	discount,
	setCouponType,
	deleteHandler,
}) => {
	const [qtyChangeLoader, setQtyChangeLoader] = useState(false);

	const { cartState, cartDispatch } = useCart();
	const { authState } = useAuth();
	const { wishlistState, wishlistDispatch } = useWishlist();

	useEffect(() => {
		return () => {};
	}, []);

	const updateHandler = async (_id, type) => {
		setQtyChangeLoader(true);
		const product = cartState.cart.find((product) => product._id === _id);
		try {
			const response = await axios.post(
				`/api/user/cart/${_id}`,
				{
					action: {
						type,
					},
					data: {
						cart: product,
					},
				},
				{
					headers: {
						authorization: authState.token,
					},
				}
			);
			if (response.status === 200) {
				type === 'decrement' ? setCouponType('') : null;
				cartDispatch({ type: type.toUpperCase(), payload: response.data.cart });
				setQtyChangeLoader(false);
			} else {
				console.error('ERROR: ', response);
			}
		} catch (error) {
			console.error('ERROR: ', error);
		}
	};

	const addToWishlist = async (_id) => {
		if (authState.token) {
			const product = cartState.cart.find((product) => product._id === _id);
			if (!checkWishlistStatus(_id, wishlistState.wishlist)) {
				const response = await addToWishlistHandler(product, authState.token);
				if (response.status === 201) {
					toast.info(`${title} added to wishlist`);
					wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: response.data.wishlist });
				}
			} else {
				const response = await removeFromWishlistHandler(_id, authState.token);
				if (response.status === 200) {
					wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: response.data.wishlist });
				}
			}
		} else {
			alert('You are not logged in');
			navigate('/login');
		}
	};

	return (
		<article className={`card horizontal-card card-shadow ${styles.card}`}>
			<img src={image} alt={image} className={`card-img ${styles.cardImg}`} />
			<div className={`content ${styles.content}`}>
				<h4>{title}</h4>
				<div className="buy-info">
					<p>
						{discount ? (
							<strong>Rs. {(price - (discount / 100) * price).toFixed(0)} </strong>
						) : (
							<strong>Rs. {price} </strong>
						)}
					</p>
					<p>
						{discount ? (
							<small>
								<s>Rs. {price}</s>
							</small>
						) : null}
						{discount ? (
							<small className={`card-discount ${styles.cardDiscount}`}> ({discount}% OFF)</small>
						) : null}
					</p>
					<div className="product-count">
						<button
							onClick={() =>
								qty === 1
									? deleteHandler(_id, setQtyChangeLoader, title)
									: updateHandler(_id, 'decrement')
							}
							disabled={qtyChangeLoader}
						>
							<i className={`fa-solid fa-minus ${qty === 1 && 'fa-trash'}`}></i>
						</button>
						<span>{qty}</span>
						<button
							onClick={() => updateHandler(_id, 'increment')}
							disabled={qty >= 5 || qtyChangeLoader}
						>
							<i className="fa-solid fa-plus"></i>
						</button>
						{qty > 1 ? (
							<button
								onClick={() => deleteHandler(_id, setQtyChangeLoader, title)}
								disabled={qtyChangeLoader}
							>
								<i className={`fa-solid fa-trash ${styles.deleteBtn}`}></i>
							</button>
						) : null}
					</div>
				</div>
				<div>
					{checkWishlistStatus(_id, wishlistState.wishlist) ? (
						<Link to="/wishlist" className={`action-link ${styles.actionLink}`}>
							Go to Wishlist
						</Link>
					) : (
						<button
							className={`action-link ${styles.actionLink}`}
							onClick={() => addToWishlist(_id)}
						>
							Add to wishlist
						</button>
					)}
				</div>
			</div>
		</article>
	);
};

export { HorizontalCard };
