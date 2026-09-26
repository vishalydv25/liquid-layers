import { createContext, useContext, useReducer } from 'react';
import { wishlistReducer } from '../../Reducer';

const WishlistContext = createContext({ wishlistState: [], wishlistDispatch: () => {} });

const WishlistProvider = ({ children }) => {
	const [wishlistState, wishlistDispatch] = useReducer(wishlistReducer, {
		wishlist: [],
	});

	return (
		<WishlistContext.Provider value={{ wishlistState, wishlistDispatch }}>
			{children}
		</WishlistContext.Provider>
	);
};

const useWishlist = () => useContext(WishlistContext);

export { WishlistProvider, useWishlist };
