import { Dog } from 'lucide-react';
import styles from './Footer.module.css';
import cuceiLogo from './cucei-logo.png';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Columna Izquierda: Identidad del Proyecto */}
        <div className={styles.columnLeft}>
          <div className={styles.logoContainer}>
            {/* Si tienes una URL específica para el logo, reemplaza este ícono por un <img src="..." /> */}
            <Dog size={32} className={styles.logoIcon} />
            <h2 className={styles.logoText}>Proyecto Final</h2>
          </div>
          <p className={styles.tagline}>
            Desarrollo de Aplicación con IA y Tema Libre
          </p>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialIcon} aria-label="Instagram">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Facebook">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            {/* TikTok doesn't have an official lucide icon, using a generic hashtag or string. We can just use an anchor with text or another icon */}
            <a href="#" className={styles.socialIcon} aria-label="TikTok">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Columna Central: Información Académica */}
        <div className={styles.columnCenter}>
          <h3 className={styles.academicTitle}>Proyecto académico</h3>
          <ul className={styles.academicList}>
            <li>
              <strong>Integrantes:</strong> Eriberto Orozco Rosas, Renata
              Margarita y Juan Antonio Aguirre Mares.
            </li>
            <li>
              <strong>Materia:</strong> Desarrollo de aplicaciones web en la
              nube y móviles.
            </li>
            <li>
              <strong>Profesor:</strong> ZEUS EMANUEL GUTIERREZ COBIAN.
            </li>
            <li>
              <strong>Calendario:</strong> 2026-A.
            </li>
          </ul>
        </div>

        {/* Columna Derecha: Identidad Institucional */}
        <div className={styles.columnRight}>
          <img
            src={cuceiLogo}
            alt="Logo Universidad de Guadalajara CUCEI"
            className={styles.cuceiLogo}
          />
        </div>
      </div>

      {/* Franja Inferior */}
      <div className={styles.bottomBar}>
        <p>© 2026 PetCare. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
