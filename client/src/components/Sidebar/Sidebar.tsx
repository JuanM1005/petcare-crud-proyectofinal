import { Link } from 'react-router-dom';
import { navItems } from './navItems';
import styles from './Sidebar.module.css';

export const Sidebar = () => {
  return (
    <nav className={styles.nav}>
      <h1 className={styles.logo}>PetCare</h1>

      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
