export const totalPrice = (cart) =>
	cart.reduce(
		(acc, curr) => ({
			...acc,
			price: acc.price + curr.price * curr.qty,
		}),
		{ price: 0, qty: 0 }
	);

const discountCalc = (price, discount, qty) => price * qty * (1 - discount / 100);

export const discountedPrice = (cart) =>
	cart.reduce((acc, curr) => acc + discountCalc(curr.price, curr.discount, curr.qty), 0, {
		price: 0,
		discount: 0,
		qty: 0,
	});

export const discount = (totalPrice, discountedPrice) => totalPrice - discountedPrice;

export const finalValue = (couponType, totalAmount) => {
	if (couponType === '10') {
		return (totalAmount - (totalAmount * Number(couponType)) / 100).toFixed(2);
	} else if (couponType === '15') {
		return (totalAmount - (totalAmount * Number(couponType)) / 100).toFixed(2);
	}
	return totalAmount;
};
