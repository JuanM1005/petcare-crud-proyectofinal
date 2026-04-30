import { Link } from 'react-router-dom';
import type NavItem from './Sidebar.types';
import styles from './Sidebar.module.css';

const navItems: NavItem[] = [
  { label: 'Inicio', path: '/', icon: '🏠' },
  { label: 'Mascotas', path: '/mascotas', icon: '🐾' },
  { label: 'Dueños', path: '/duenos', icon: '👤' },
  { label: 'Veterinarios', path: '/veterinarios', icon: '🩺' },
  { label: 'Citas', path: '/citas', icon: '📅' },
  { label: 'Tratamientos', path: '/tratamientos', icon: '💊' },
];

export const Sidebar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logoContainer}>
        <span className={styles.logoIcon}>🐶</span>
        <h1 className={styles.logo}>PetCare</h1>
      </div>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path}>
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
