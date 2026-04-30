import { Link } from 'react-router-dom';
import styles from './InicioPage.module.css';

export const InicioPage = () => {
  return (
    <div className={styles.container}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroPattern}>🐾</div>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>Bienvenido a PetCare</h2>
          <p className={styles.heroSubtitle}>
            Sistema de gestión para clínicas veterinarias. Administra mascotas,
            dueños, citas y tratamientos en un solo lugar.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>🐾</span>
          <span className={styles.statNumber}>4</span>
          <span className={styles.statLabel}>Mascotas</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>👤</span>
          <span className={styles.statNumber}>3</span>
          <span className={styles.statLabel}>Dueños</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>🩺</span>
          <span className={styles.statNumber}>2</span>
          <span className={styles.statLabel}>Veterinarios</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📅</span>
          <span className={styles.statNumber}>5</span>
          <span className={styles.statLabel}>Citas hoy</span>
        </div>
      </div>

      {/* Quick actions */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Acciones rápidas</h3>
        <div className={styles.actionsGrid}>
          <Link to="/mascotas" className={styles.actionCard}>
            <div className={styles.actionIcon}>🐶</div>
            <div className={styles.actionInfo}>
              <span className={styles.actionTitle}>Registrar mascota</span>
              <span className={styles.actionDesc}>
                Agregar una nueva mascota al sistema
              </span>
            </div>
          </Link>
          <Link to="/citas" className={styles.actionCard}>
            <div className={styles.actionIcon}>📅</div>
            <div className={styles.actionInfo}>
              <span className={styles.actionTitle}>Agendar cita</span>
              <span className={styles.actionDesc}>
                Programar una consulta veterinaria
              </span>
            </div>
          </Link>
          <Link to="/duenos" className={styles.actionCard}>
            <div className={styles.actionIcon}>👤</div>
            <div className={styles.actionInfo}>
              <span className={styles.actionTitle}>Nuevo dueño</span>
              <span className={styles.actionDesc}>
                Registrar un nuevo propietario
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
