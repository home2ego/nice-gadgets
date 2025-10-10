import clsx from 'clsx';
import { Link } from 'react-router-dom';
import imgNotFound from '../../assets/icons/page-not-found.svg';
import styles from './NotFound.module.scss';

const NotFound = () => (
  <div className={styles['not-found']}>
    <title>404 | Nice Gadgets</title>
    <h1 className={clsx(styles['not-found__heading'], 'title--sm')}>
      Error 404
    </h1>
    <img src={imgNotFound} alt="" width="250" height="240" />
    <h2 className={clsx(styles['not-found__subheading'], 'title--md')}>
      Page not found
    </h2>
    <Link to="/" className={clsx(styles['not-found__link'], 'text--uppercase')}>
      Go to home page
    </Link>
  </div>
);

export default NotFound;
