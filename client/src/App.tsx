import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Sidebar } from './components';
import { routes } from './router';
import styles from './App.module.css';

/**
 * AppRoutes
 * Componente funcional que consume la configuración de rutas (router.tsx)
 * y renderiza el componente correspondiente según la URL actual.
 */
const AppRoutes = () => useRoutes(routes);

/**
 * App (Root Component)
 * Proveedor principal de la aplicación. Configura el enrutador (BrowserRouter)
 * e inyecta el Sidebar lateral y la vista principal.
 */
function App() {
  return (
    <BrowserRouter>
      <div className={styles.layout}>
        {/* Menú lateral de navegación persistente */}
        <Sidebar />
        
        {/* Contenedor dinámico donde se cargan las páginas */}
        <main className={styles.main}>
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

