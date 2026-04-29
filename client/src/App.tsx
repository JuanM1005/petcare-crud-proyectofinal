import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Sidebar } from './components';
import { routes } from './router';
import styles from './App.module.css';

const AppRoutes = () => useRoutes(routes);

function App() {
  return (
    <BrowserRouter>
      <div className={styles.layout}>
        <Sidebar />
        <main className={styles.main}>
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
