import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styles from "./App.module.css";

// Por ahora usamos componentes placeholder, luego los reemplazamos
function Inicio() {
  return <h2>Bienvenido a PetCare</h2>;
}

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
          <Routes>
            <Route path="/" element={<Inicio />} />
            {/* Aquí iremos agregando las rutas de cada entidad */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;