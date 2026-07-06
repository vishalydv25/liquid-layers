import { useState } from 'react';
import { useCart } from '../../../../Context';
import { discount, discountedPrice, finalValue, totalPrice } from '../../../../Utils';
import styles from './PriceContainer.module.css';

const PriceContainer = ({ couponType, setCouponType, setCheckout }) => {
	const [applyCoupon, setApplyCoupon] = useState(false);

	const {
		cartState: { cart },
	} = useCart();

	const totalPayable = totalPrice(cart);

	const priceAfterDiscount = discountedPrice(cart);

	const totalDiscount = discount(totalPayable.price, priceAfterDiscount);

	const totalAmount = (totalPayable.price - totalDiscount + 40).toFixed(2);

	const finalPayable = finalValue(couponType, totalAmount);

	return (
		<>
			<div className={`modal-backdrop ${styles.backdrop} ${applyCoupon ? '' : 'modal-hide'}`}></div>
			<div className={`modal ${applyCoupon ? '' : 'modal-hide'}`}>
				<div className={`modal-container ${styles.modalContainer}`}>
					<div className={`modal-header ${styles.modalHeader}`}>
						<span>Select Coupon</span>
						<button onClick={() => setApplyCoupon(false)}>
							<i className="fa-solid fa-circle-xmark"></i>
						</button>
					</div>
					<div className={`checkbox-container ${styles.coupon}`}>
						<input
							type="checkbox"
							name="coupon 10%"
							id="coupon10"
							disabled={totalAmount < 10000}
							value="10"
							checked={couponType === '10'}
							onChange={(e) =>
								e.target.checked ? setCouponType(e.target.value) : setCouponType('')
							}
						/>
						<label htmlFor="coupon10" className={totalAmount < 10000 ? styles.couponLabel : ''}>
							<strong>10% off</strong> on purchases above 10,000
						</label>
					</div>
					<div className={`checkbox-container ${styles.coupon}`}>
						<input
							type="checkbox"
							name="coupon 15%"
							id="coupon15"
							disabled={totalAmount < 12000}
							value="15"
							checked={couponType === '15'}
							onChange={(e) =>
								e.target.checked ? setCouponType(e.target.value) : setCouponType('')
							}
						/>
						<label htmlFor="coupon15" className={totalAmount < 12000 ? styles.couponLabel : ''}>
							<strong>15% off</strong> on purchases above 12,000
						</label>
					</div>
				</div>
			</div>
			<div className={styles.cartPriceContainer}>
				<h3>
					Total Price ({cart.length} {cart.length > 1 ? 'Items' : 'Item'})
				</h3>
				<button className={`btn btn-info ${styles.couponBtn}`} onClick={() => setApplyCoupon(true)}>
					{couponType ? 'Coupon Applied' : 'Apply Coupon'}
				</button>
				{couponType ? <span className={styles.couponType}>{couponType}%</span> : ''}
				<div className={styles.priceDetails}>
					<div>
						<span>Price</span>
						<span>Discount</span>
						<span>Delivery Charges</span>
						{totalAmount !== finalPayable ? <span>Coupon discount</span> : null}
						<span className={styles.amountSpan}>Total Amount</span>
					</div>
					<div>
						<span>{totalPayable.price.toFixed(2)} /-</span>
						<span>- {totalDiscount.toFixed(2)} /-</span>
						<span>40.00 /-</span>
						{totalAmount !== finalPayable ? (
							<span>- {(totalAmount - finalPayable).toFixed(2)} /-</span>
						) : null}
						<span className={styles.amountSpan}>{finalPayable} /-</span>
					</div>
				</div>
				<button className="btn btn-primary" onClick={() => setCheckout(true)}>
					Place Order
				</button>
			</div>
		</>
	);
};

export { PriceContainer };
