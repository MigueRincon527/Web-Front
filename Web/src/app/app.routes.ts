import { Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { Login } from './Components/login/login';
import { Registro } from './Components/registro/registro';

export const routes: Routes = [
    //Ruta principal Home 
    {path :'', redirectTo : 'home', pathMatch : 'full'},
    //Rutas
    {path : 'home', component : Home},
    {path : 'login', component : Login},
    {path : 'register', component : Registro},
];
