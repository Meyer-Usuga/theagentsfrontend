import { Routes } from '@angular/router';
import NotfoundComponent from './views/notfound/notfound.component';
import { authGuard } from './guards/auth.guard';

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
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'veterinary-service',
                pathMatch: 'full'
            },
            {
                path: 'profile',
                title: 'Perfil',
                loadComponent: () => import('./views/settings-profile/settings-profile.component')
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
    {path: '**', title: 'Not found ', component: NotfoundComponent},
    { path: 'Not-Found', title: 'Not found', component: NotfoundComponent }
];
