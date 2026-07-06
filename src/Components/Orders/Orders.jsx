import { useEffect } from 'react';
import { useAuth } from '../../Context';
import { getOrders } from '../../Utils';
import styles from './Orders.module.css';

const Orders = () => {
	const {
		authState: { token, orders },
		authDispatch,
	} = useAuth();

	useEffect(() => {
		getOrders(token, authDispatch);
	}, []);

	return (
		<div className={styles.orderContainer}>
			{orders.length > 0
				? orders.map(({ order }) => (
						<article className={styles.order} key={order.orderId}>
							<span className={styles.orderId}>Order Id - {order.orderId}</span>
							<div className={styles.orderPrice}>
								<span className={styles.priceTitle}>Price</span>
								<span>Total Price - {order.totalPayable.toFixed(2)} /-</span>
								<span>Total Discount - {order.totalDiscount.toFixed(2)} /-</span>
								<span>Delivery Charges - 40 /-</span>
								<span>Amount Paid - {Number(order.finalPayable).toFixed(2)} /-</span>
							</div>
							<p>
								{order.deliveryAddress.street}, {order.deliveryAddress.city} -{' '}
								{order.deliveryAddress.zipCode}. {order.deliveryAddress.state}
							</p>
							{order.items.map((item) => (
								<div className={styles.productCard} key={item._id}>
									<img src={item.image} alt={item.title} className="resp-img" />
									<span>{item.title}</span>
								</div>
							))}
						</article>
				  ))
				: 'No Previous Orders found'}
		</div>
	);
};

export { Orders };
