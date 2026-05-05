import type { RouteObject } from 'react-router-dom';
import {
  InicioPage,
  MascotasPage,
  PropietariosPage,
  VeterinariosPage,
} from '../pages';

export const routes: RouteObject[] = [
  { path: '/', element: <InicioPage /> },
  { path: '/mascotas', element: <MascotasPage /> },
  { path: '/propietarios', element: <PropietariosPage /> },
  { path: '/veterinarios', element: <VeterinariosPage /> },
  // { path: '/citas', element: <CitasPage /> },
  // { path: '/tratamientos', element: <TratamientosPage /> },
];
