import { useState, useEffect } from 'react';
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
import { dashboardService, type DashboardStats } from '../../services/dashboard.service';

export const InicioPage = () => {
  const [stats, setStats] = useState<DashboardStats>({
    total_mascotas: 0,
    total_propietarios: 0,
    total_veterinarios: 0,
    total_servicios: 0,
    total_citas: 0,
    citas_hoy: 0,
    citas_mes: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardService.getStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

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

      {/* Stats Section */}
      <div className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.cardBlue}`}>
          <div className={styles.statIconWrapper}>
            <Dog className={styles.statIcon} size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{stats.total_mascotas}</span>
            <span className={styles.statLabel}>Pacientes</span>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.cardGreen}`}>
          <div className={styles.statIconWrapper}>
            <Users className={styles.statIcon} size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{stats.total_propietarios}</span>
            <span className={styles.statLabel}>Dueños</span>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.cardPurple}`}>
          <div className={styles.statIconWrapper}>
            <Stethoscope className={styles.statIcon} size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{stats.total_veterinarios}</span>
            <span className={styles.statLabel}>Especialistas</span>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.cardOrange}`}>
          <div className={styles.statIconWrapper}>
            <Calendar className={styles.statIcon} size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{stats.total_citas}</span>
            <span className={styles.statLabel}>Total Citas</span>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.cardRed}`}>
          <div className={styles.statIconWrapper}>
            <PlusCircle className={styles.statIcon} size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{stats.total_servicios}</span>
            <span className={styles.statLabel}>Tratamientos</span>
          </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Acciones rápidas</h3>
        </div>
        <div className={styles.actionsGrid}>
          <Link to="/mascotas" className={`${styles.actionCard} ${styles.cardBlue}`}>
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
          <Link to="/citas" className={`${styles.actionCard} ${styles.cardGreen}`}>
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
          <Link to="/duenos" className={`${styles.actionCard} ${styles.cardOrange}`}>
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
