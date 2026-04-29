import { BrowserRouter, useRoutes, Link } from 'react-router-dom';
import { routes } from './router';
import styles from './App.module.css';

// useRoutes convierte el array de objetos RouteObject
// en los componentes <Route> que React Router necesita.
// Debe estar DENTRO de <BrowserRouter>, por eso lo separamos.
const AppRoutes = () => useRoutes(routes);

function App() {
  return (
    <BrowserRouter>
      <div className={styles.layout}>
        <nav className={styles.nav}>
          <h1 className={styles.logo}>PetCare</h1>
          <ul className={styles.navList}>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/mascotas">Mascotas</Link></li>
            <li><Link to="/duenos">Dueños</Link></li>
            <li><Link to="/veterinarios">Veterinarios</Link></li>
            <li><Link to="/citas">Citas</Link></li>
            <li><Link to="/tratamientos">Tratamientos</Link></li>
          </ul>
        </nav>

        <main className={styles.main}>
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;