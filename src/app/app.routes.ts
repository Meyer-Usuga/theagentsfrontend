import { Routes } from '@angular/router';

/** Enrutamiento de los componentes  */
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        title: 'Inicio',
        loadComponent: () => import('./views/home/home.component')
    },
    {
        path: 'login',
        title: 'Iniciar sesión',
        loadComponent: () => import('./views/login/login.component')
    },
    {
        path: 'register',
        title: 'Registrarse',
        loadComponent: () => import('./views/register/register.component')
    },
    {
        path: 'theagents',
        title: 'The Agents',
        children: [
            {
                path: '',
                redirectTo: 'schdule',
                pathMatch: 'full'
            },
            {
                path: 'schdule',
                title: 'Agendar',
                loadComponent: () => import('./views/schedule/schedule.component')
            },
            {
                path: 'veterinary-service',
                title: 'Servicios',
                loadComponent: () => import('./views/veterinary-service/service.component')
            },
            {
                path: 'invoice',
                title: 'Facturación',
                loadComponent: () => import('./views/invoice/invoice.component')
            }
        ]
    },
    { path: '**', title: 'Not found', loadComponent: () => import('./views/notfound/notfound.component') }
];
