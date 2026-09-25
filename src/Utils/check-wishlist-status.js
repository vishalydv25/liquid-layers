export const checkWishlistStatus = (_id, wishlist) =>
	wishlist.find((product) => product._id === _id);
