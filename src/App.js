import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Mockman from 'mockman-js';
import { ToastContainer } from 'react-toastify';
import { RequiresAuth, Address, Orders, Header } from './Components';
import {
	Home,
	Products,
	Cart,
	Wishlist,
	Login,
	Signup,
	User,
	Error404,
	SingleProduct,
} from './Pages';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { fetchProducts } from './Utils';

function App() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		fetchProducts(setIsError, setIsLoading, setProducts);
	}, []);

	return (
		<>
			<ToastContainer
				theme="colored"
				position="bottom-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<Header products={products} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/products"
					element={<Products products={products} isLoading={isLoading} isError={isError} />}
				/>
				<Route
					path="/cart"
					element={
						<RequiresAuth>
							<Cart />
						</RequiresAuth>
					}
				/>
				<Route
					path="/wishlist"
					element={
						<RequiresAuth>
							<Wishlist />
						</RequiresAuth>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route
					path="/user"
					element={
						<RequiresAuth>
							<User />
						</RequiresAuth>
					}
				>
					<Route path="address" element={<Address />} />
					<Route path="orders" element={<Orders />} />
				</Route>
				<Route path="/mock" element={<Mockman />} />
				<Route path="*" element={<Error404 />} />
				<Route path="/products/:_id" element={<SingleProduct />} />
			</Routes>
		</>
	);
}

export default App;
