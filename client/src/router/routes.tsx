import type { RouteObject } from 'react-router-dom';
import { InicioPage, MascotasPage } from '../pages';

// Cada objeto es una ruta. Cuando se cree DueñosPage, VeterinariosPage, etc.
// solo se agrega una línea aquí sin tocar App.tsx
export const routes: RouteObject[] = [
    { path: '/', element: <InicioPage /> },
    { path: '/mascotas', element: <MascotasPage /> },
    // { path: '/duenos', element: <DuenosPage /> },
    // { path: '/veterinarios', element: <VeterinariosPage /> },
    // { path: '/citas', element: <CitasPage /> },
    // { path: '/tratamientos', element: <TratamientosPage /> },
];