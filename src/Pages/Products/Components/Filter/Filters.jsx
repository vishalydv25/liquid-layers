import axios from 'axios';
import { useState, useEffect } from 'react';
import { useFilter } from '../../../../Context';
import styles from './Filters.module.css';

const Filters = ({ filterDisplay }) => {
	const { filterState, filterDispatch } = useFilter();
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get('/api/categories');
				if (response.status) {
					setCategories(response.data.categories);
				} else {
					console.error('ERROR: ', error);
				}
			} catch (error) {
				console.error('ERROR: ', error);
			}
		})();
	}, []);

	return (
		<aside className={`${styles.plAside} ${filterDisplay ? styles.active : ''}`}>
			<div className={styles.asideHeading}>
				<h4>Filters</h4>
				<button onClick={() => filterDispatch({ type: 'CLEAR' })}>Clear</button>
			</div>
			<div className={styles.asidePrice}>
				<label htmlFor="price">Price</label>
				<input
					type="range"
					min="0"
					max="5000"
					id="price"
					value={filterState.price}
					onChange={(e) => filterDispatch({ type: 'PRICE', payload: { price: e.target.value } })}
				/>
				<span className={styles.currentPrice}>{filterState.price}</span>
			</div>
			<div className={styles.asideGenre}>
				<span htmlFor="category">Genre</span>
				{categories.length > 1
					? categories.map(({ _id, categoryName }) => (
							<div key={_id} className={`checkbox-container ${styles.checkboxContainer}`}>
								<input
									type="checkbox"
									name="category checkbox"
									id={`${_id}`}
									checked={filterState.category.includes(categoryName)}
									onChange={(e) =>
										filterDispatch({
											type: 'CATEGORY_FILTER',
											payload: { type: categoryName, isChecked: e.target.checked },
										})
									}
								/>
								<label htmlFor={`${_id}`}>{categoryName}</label>
							</div>
					  ))
					: null}
			</div>
			<div className={styles.asideRating}>
				<span>Rating</span>
				<div className={`radio-container ${styles.radioContainer}`}>
					<input
						type="radio"
						name="rating input"
						value="4"
						id="rating-input-1"
						checked={filterState.rating === 4}
						onChange={() => filterDispatch({ type: 'RATING_FILTER', payload: { value: 4 } })}
					/>
					<label htmlFor="rating-input-1">4 star and above</label>
				</div>
				<div className={`radio-container ${styles.radioContainer}`}>
					<input
						type="radio"
						name="rating input"
						value="3"
						id="rating-input-2"
						checked={filterState.rating === 3}
						onChange={() => filterDispatch({ type: 'RATING_FILTER', payload: { value: 3 } })}
					/>
					<label htmlFor="rating-input-2">3 star and above</label>
				</div>
				<div className={`radio-container ${styles.radioContainer}`}>
					<input
						type="radio"
						name="rating input"
						value="2"
						id="rating-input-3"
						checked={filterState.rating === 2}
						onChange={() => filterDispatch({ type: 'RATING_FILTER', payload: { value: 2 } })}
					/>
					<label htmlFor="rating-input-3">2 star and above</label>
				</div>
				<div className={`radio-container ${styles.radioContainer}`}>
					<input
						type="radio"
						name="rating input"
						value="1"
						id="rating-input-4"
						checked={filterState.rating === 1}
						onChange={() => filterDispatch({ type: 'RATING_FILTER', payload: { value: 1 } })}
					/>
					<label htmlFor="rating-input-4">1 star and above</label>
				</div>
			</div>
			<div className={styles.asideRating}>
				<span>Sort By</span>
				<div className={`radio-container ${styles.radioContainer}`}>
					<input
						type="radio"
						name="sort input"
						id="sort-input-1"
						checked={filterState.sortBy === 'lowtohigh'}
						onChange={() => filterDispatch({ type: 'SORT', payload: { type: 'lowtohigh' } })}
					/>
					<label htmlFor="sort-input-1">Price - Low to High</label>
				</div>
				<div className={`radio-container ${styles.radioContainer}`}>
					<input
						type="radio"
						name="sort input"
						id="sort-input-2"
						checked={filterState.sortBy === 'hightolow'}
						onChange={() => filterDispatch({ type: 'SORT', payload: { type: 'hightolow' } })}
					/>
					<label htmlFor="sort-input-2">Price - High to Low</label>
				</div>
			</div>
			<div className={styles.asideRating}>
				<span htmlFor="category">Availability</span>
				<div className={`checkbox-container ${styles.checkboxContainer}`}>
					<input
						type="checkbox"
						name="stock checkbox"
						id="out-of-stock"
						checked={filterState.outOfStock}
						onChange={(e) =>
							filterDispatch({
								type: 'OUT_OF_STOCK',
								payload: { type: 'Action', isChecked: e.target.checked },
							})
						}
					/>
					<label htmlFor="out-of-stock">Remove out of Stock</label>
				</div>
			</div>
		</aside>
	);
};

export { Filters };
