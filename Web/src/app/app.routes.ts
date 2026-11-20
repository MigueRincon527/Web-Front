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
import { Dashboard } from './dasboard/admin/admin';
import { AllProducts } from './dasboard/products/all-products/all-products';
import { NewProduct } from './dasboard/products/new-product/new-product';
import { UpdateProduct } from './dasboard/products/update-product/update-product';
import { InfoProduct } from './dasboard/products/info-product/info-product';
import { AllUser } from './dasboard/users/all-user/all-user';
import { MyUser } from './dasboard/users/my-user/my-user';
import { UpdateUser } from './dasboard/users/update-user/update-user';
import { adminGuard } from './guards/admin.guards/admin.guards';
import { authGuard } from './guards/auth.guards/auth.guards';

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
    { path: 'producto/:id', component: Producto },
    {
      path: 'dashboard',
      canActivate: [adminGuard],
      children: [
        { path: '', component: Dashboard },
        { path: 'productos', component: AllProducts },
        { path: 'productos/nuevo', component: NewProduct },
        { path: 'productos/editar/:id', component: UpdateProduct },
        { path: 'productos/:id', component: InfoProduct },
        { path: 'usuarios', component: AllUser },
        { path: 'usuarios/editar/:id', component: UpdateUser }
      ]
    },
    { path: 'dashboard/mi-perfil', component: MyUser, canActivate: [authGuard] },
    { path: 'dashboard/users/my-user', component: MyUser, canActivate: [authGuard] },
    { path: '**', redirectTo: 'home' }
];
