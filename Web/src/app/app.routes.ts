import { Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { Login } from './Components/login/login';
import { Registro } from './Components/registro/registro';
import { Accesorios } from './Pages/accesorios/accesorios';
import { Aminoacidos } from './Pages/aminoacidos/aminoacidos';
import { Creatinas } from './Pages/creatinas/creatinas';
import { PreEntrenos } from './Pages/pre-entrenos/pre-entrenos';
import { Proteinas } from './Pages/proteinas/proteinas';
import { Vitaminas } from './Pages/vitaminas/vitaminas';
import { Carrito } from './Pages/carrito/carrito';
import { Producto } from './Components/producto/producto';

export const routes: Routes = [
    //Ruta principal Home
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    //Rutas

    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Registro },
    { path: 'accesorios', component: Accesorios },
    { path: 'aminoacidos', component: Aminoacidos },
    { path: 'creatinas', component: Creatinas },
    { path: 'pre-entrenos', component: PreEntrenos },
    { path: 'proteinas', component: Proteinas },
    { path: 'vitaminas', component: Vitaminas },
    { path: 'carrito', component: Carrito},
    { path: 'producto/:id', component: Producto}
];
