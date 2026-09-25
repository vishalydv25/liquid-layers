import { Link } from 'react-router-dom';
import { error404 } from '../../Assets/images';
import styles from './error404.module.css';

const Error404 = () => {
	return (
		<>
			<div className={styles.errorPage}>
				<span className={styles.errorPageTitle}>Something Went Wrong!!</span>
				<img src={error404} alt="responsive image" className="resp-img" />
				<Link to="/">Go Back Home</Link>
			</div>
		</>
	);
};

export { Error404 };
