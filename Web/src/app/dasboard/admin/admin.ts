import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuarios } from '../../Services/usuarios/usuarios';
import { Productos } from '../../Services/productos/productos';

interface MetricaCard {
  titulo: string;
  valor: string;
  cambio: number;
  icono: string;
  color: string;
}

interface Pedido {
  id: string;
  cliente: string;
  fecha: string;
  productos: number;
  total: number;
  estado: 'Pendiente' | 'Enviado' | 'Entregado' | 'Cancelado';
}

interface ProductoTop {
  id: number;
  nombre: string;
  categoria: string;
  unidadesVendidas: number;
  ingresos: number;
}

interface AlertaStock {
  id: number;
  nombre: string;
  stock: number;
  stockMinimo: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Dashboard implements OnInit {
  private usuariosService = inject(Usuarios);
  private productosService = inject(Productos);

  rangoSeleccionado: string = '7dias';

  metricas: MetricaCard[] = [
    { titulo: 'Ventas totales', valor: 'Sin datos', cambio: 0, icono: '💰', color: '#ff6b35' },
    { titulo: 'Pedidos', valor: 'Sin datos', cambio: 0, icono: '📦', color: '#3498db' },
    { titulo: 'Usuarios registrados', valor: '0', cambio: 0, icono: '👤', color: '#27ae60' },
    { titulo: 'Productos', valor: '0', cambio: 0, icono: '🧾', color: '#9b59b6' }
  ];

  pedidosRecientes: Pedido[] = [
    { id: '#ORD-1042', cliente: 'Carlos Martínez', fecha: '09 sep 2026', productos: 3, total: 254000, estado: 'Pendiente' },
    { id: '#ORD-1041', cliente: 'Laura Pérez', fecha: '09 sep 2026', productos: 1, total: 95000, estado: 'Enviado' },
    { id: '#ORD-1040', cliente: 'Andrés Torres', fecha: '08 sep 2026', productos: 2, total: 178000, estado: 'Entregado' },
    { id: '#ORD-1039', cliente: 'María Gómez', fecha: '08 sep 2026', productos: 4, total: 412000, estado: 'Entregado' },
    { id: '#ORD-1038', cliente: 'Juan Rodríguez', fecha: '07 sep 2026', productos: 1, total: 65000, estado: 'Cancelado' },
    { id: '#ORD-1037', cliente: 'Paula Ramírez', fecha: '07 sep 2026', productos: 2, total: 235000, estado: 'Enviado' }
  ];

  productosTop: ProductoTop[] = [];

  alertasStock: AlertaStock[] = [];

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarProductos();
  }

  private cargarUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: (response: any) => {
        const usuarios = Array.isArray(response)
          ? response
          : (response.datos ?? response.usuarios ?? []);
        this.metricas[2].valor = String(usuarios.length);
      },
      error: () => {
        this.metricas[2].valor = 'Error';
      }
    });
  }

  private cargarProductos(): void {
    this.productosService.getProductos().subscribe({
      next: (response: any) => {
        const productos = Array.isArray(response)
          ? response
          : (response.datos ?? []);
        this.metricas[3].valor = String(productos.length);

        this.alertasStock = productos
          .filter((producto: any) => Number(producto.cantidad ?? 0) < 10)
          .map((producto: any, index: number) => ({
            id: index + 1,
            nombre: producto.nombre,
            stock: Number(producto.cantidad ?? 0),
            stockMinimo: 10
          }));

        this.productosTop = productos
          .slice()
          .sort((a: any, b: any) => Number(b.cantidad ?? 0) - Number(a.cantidad ?? 0))
          .slice(0, 4)
          .map((producto: any, index: number) => ({
            id: index + 1,
            nombre: producto.nombre,
            categoria: producto.categoria ?? 'Sin categoría',
            unidadesVendidas: Number(producto.cantidad ?? 0),
            ingresos: Number(producto.precio ?? 0)
          }));
      },
      error: () => {
        this.metricas[3].valor = 'Error';
      }
    });
  }

  cambiarRango(rango: string): void {
    this.rangoSeleccionado = rango;
    console.log('Rango cambiado a:', rango);
    // Aquí recargarías las métricas desde el backend según el rango
  }

  formatearPrecio(valor: number): string {
    return valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
  }

  claseEstado(estado: string): string {
    switch (estado) {
      case 'Pendiente': return 'estado-pendiente';
      case 'Enviado': return 'estado-enviado';
      case 'Entregado': return 'estado-entregado';
      case 'Cancelado': return 'estado-cancelado';
      default: return '';
    }
  }

  get porcentajeStock(): (alerta: AlertaStock) => number {
    return (alerta: AlertaStock) => Math.min((alerta.stock / alerta.stockMinimo) * 100, 100);
  }
}