import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Dog,
  Users,
  Stethoscope,
  Calendar,
  Activity,
  Menu,
  X,
} from 'lucide-react';
import type NavItem from './Sidebar.types';
import styles from './Sidebar.module.css';

const navItems: NavItem[] = [
  { label: 'Inicio', path: '/', icon: <Home size={20} /> },
  { label: 'Mascotas', path: '/mascotas', icon: <Dog size={20} /> },
  { label: 'Propietarios', path: '/propietarios', icon: <Users size={20} /> },
  {
    label: 'Veterinarios',
    path: '/veterinarios',
    icon: <Stethoscope size={20} />,
  },
  { label: 'Citas', path: '/citas', icon: <Calendar size={20} /> },
  {
    label: 'Tratamientos',
    path: '/tratamientos',
    icon: <Activity size={20} />,
  },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <button
        className={styles.mobileToggle}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay for mobile */}
      {isOpen && <div className={styles.overlay} onClick={closeSidebar}></div>}

      <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <Dog size={28} className={styles.logoIcon} />
            <h1 className={styles.logo}>PetCare</h1>
          </div>
          <button className={styles.closeBtn} onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>

        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
                }
                onClick={closeSidebar}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
