import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { makeServer } from './server';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, CartProvider, FilterProvider, WishlistProvider } from './Context';

// Call make Server
makeServer();

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<WishlistProvider>
					<CartProvider>
						<FilterProvider>
							<App />
						</FilterProvider>
					</CartProvider>
				</WishlistProvider>
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
