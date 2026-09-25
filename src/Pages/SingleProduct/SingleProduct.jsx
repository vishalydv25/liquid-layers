import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loaders } from '../../Components';
import { useAuth, useCart, useWishlist } from '../../Context';
import {
	addToCartHandler,
	addToWishlistHandler,
	checkWishlistStatus,
	removeFromWishlistHandler,
} from '../../Utils';
import styles from './SingleProduct.module.css';

const SingleProduct = () => {
	const [cartBtnLoader, setCartBtnLoader] = useState(false);
	const [wishlistLoader, setWishlistLoader] = useState(false);
	const [product, setProduct] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const params = useParams();
	const navigate = useNavigate();
	const {
		cartState: { cart },
		cartDispatch,
	} = useCart();
	const { authState } = useAuth();
	const {
		wishlistState: { wishlist },
		wishlistDispatch,
	} = useWishlist();

	const fetchProduct = async () => {
		try {
			const response = await axios.get(`/api/products/${params._id}`);
			console.log(response);
			if (response.status === 200) {
				if (!response.data.product) {
					navigate('*');
				}
				setIsLoading(false);
				setProduct(response.data.product);
			}
		} catch (error) {
			console.error('ERROR: ', error);
		}
	};

	useEffect(() => {
		fetchProduct();
	}, [params._id]);

	const discoutedPrice = (price, discount) => (price - (price * discount) / 100).toFixed(0);

	const ratings = [1, 2, 3, 4, 5];

	const checkCartStatus = (_id) => {
		const itemInCart = cart.find((item) => item._id === _id);
		return itemInCart ? 'Go to Cart' : 'Add to Cart';
	};

	const cartBtnHandler = async (_id) => {
		setCartBtnLoader(true);
		if (authState.token) {
			const response = await addToCartHandler(product, authState.token);
			if (response.status === 201) {
				toast.success(`${product.title} added to cart`);
				cartDispatch({ type: 'ADD_TO_CART', payload: response.data.cart });
				setCartBtnLoader(false);
			}
		} else {
			toast.warning('You are not logged in!');
			navigate('/login');
		}
	};

	const addToWishlist = async (_id) => {
		setWishlistLoader(true);
		if (authState.token) {
			if (!checkWishlistStatus(_id, wishlist)) {
				const response = await addToWishlistHandler(product, authState.token);
				if (response.status === 201) {
					toast.success(`${product.title} added to wishlist`);
					setWishlistLoader(false);
					wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: response.data.wishlist });
				}
			} else {
				const response = await removeFromWishlistHandler(_id, authState.token);
				if (response.status === 200) {
					toast.info(`${product.title} removed from wishlist`);
					setWishlistLoader(false);
					wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: response.data.wishlist });
				}
			}
		} else {
			toast.warning('You are not logged in!');
			navigate('/login');
		}
	};

	return (
		<>
			{isLoading && <Loaders />}
			<section className={styles.productPg}>
				<div className={styles.plBreadcrumbContainer}>
					<div>
						<Link to="/">Home</Link> {' > '}
						<Link to="/products">Products</Link>
						{' > '}
						<Link to={`/products/${params._id}`} className={styles.currentPg}>
							{product.title}
						</Link>
					</div>
				</div>
				<div className={styles.imgContainer}>
					<img
						src={product.image}
						alt={product.title}
						className={`resp-img ${styles.productImg}`}
					/>
				</div>
				<div className={styles.content}>
					<h2 className={styles.productHeading}>{product.title}</h2>
					<h4 className={styles.categoryHeading}>Category - {product.categoryName}</h4>
					<div className="rating-container md">
						{ratings.map((rating) => (
							<i
								key={rating}
								className={`${
									rating <= product.rating
										? 'fas fa-star'
										: rating === Math.ceil(product.rating)
										? 'fas fa-star-half-stroke'
										: 'far fa-star'
								}`}
							></i>
						))}
						<span className={styles.reviews}>({product.reviewers} reviews)</span>
					</div>
					<span className={styles.price}>{product.discount && product.price}</span>
					<span>
						₹ {product.discount ? discoutedPrice(product.price, product.discount) : product.price}
						/-
					</span>
					<p className={styles.description}>{product.description}</p>
					<div className={styles.btnContainer}>
						{checkCartStatus(product._id) === 'Add to Cart' ? (
							<button
								className={`btn btn-primary ${styles.primaryBtn}`}
								disabled={product.badge === 'Out of Stock'}
								onClick={() => cartBtnHandler(product._id)}
							>
								{cartBtnLoader ? <span className={styles.loader}></span> : 'Add to Cart'}
							</button>
						) : (
							<button
								disabled={product.badge === 'Out of Stock'}
								className={`btn btn-primary ${styles.primaryBtn}`}
								onClick={() => navigate('/cart')}
							>
								Go To Cart
							</button>
						)}
						<button
							className={`btn outline-primary ${styles.secondaryBtn}`}
							onClick={() => addToWishlist(product._id)}
						>
							{wishlistLoader ? (
								<span className={styles.loader}></span>
							) : checkWishlistStatus(product._id, wishlist) ? (
								'Remove from wishlist'
							) : (
								'Add to wishlist'
							)}
						</button>
					</div>
				</div>
			</section>
		</>
	);
};

export { SingleProduct };
