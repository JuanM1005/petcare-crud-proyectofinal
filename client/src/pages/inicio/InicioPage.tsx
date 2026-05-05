import { Link } from 'react-router-dom';
import {
  Dog,
  Users,
  Stethoscope,
  Calendar,
  PawPrint,
  PlusCircle,
  Clock,
} from 'lucide-react';
import styles from './InicioPage.module.css';

export const InicioPage = () => {
  return (
    <div className={styles.container}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroPattern}>
          <PawPrint size={240} strokeWidth={1} />
        </div>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>Bienvenido a PetCare</h2>
          <p className={styles.heroSubtitle}>
            Sistema de gestión avanzado para clínicas veterinarias. Administra
            pacientes, propietarios, historiales y citas de manera eficiente y
            profesional.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}>
            <Dog className={styles.statIcon} size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>4</span>
            <span className={styles.statLabel}>Pacientes</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}>
            <Users className={styles.statIcon} size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>3</span>
            <span className={styles.statLabel}>Dueños</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}>
            <Stethoscope className={styles.statIcon} size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>3</span>
            <span className={styles.statLabel}>Especialistas</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}>
            <Calendar className={styles.statIcon} size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>4</span>
            <span className={styles.statLabel}>Citas Hoy</span>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Acciones rápidas</h3>
        </div>
        <div className={styles.actionsGrid}>
          <Link to="/mascotas" className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <PlusCircle size={28} />
            </div>
            <div className={styles.actionInfo}>
              <span className={styles.actionTitle}>Registrar paciente</span>
              <span className={styles.actionDesc}>
                Añadir una nueva mascota al sistema
              </span>
            </div>
          </Link>
          <Link to="/citas" className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <Clock size={28} />
            </div>
            <div className={styles.actionInfo}>
              <span className={styles.actionTitle}>Agendar cita</span>
              <span className={styles.actionDesc}>
                Programar consulta o tratamiento
              </span>
            </div>
          </Link>
          <Link to="/duenos" className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <Users size={28} />
            </div>
            <div className={styles.actionInfo}>
              <span className={styles.actionTitle}>Nuevo propietario</span>
              <span className={styles.actionDesc}>
                Registrar datos de contacto
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
