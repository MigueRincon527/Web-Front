import { Injectable, computed, effect, signal } from '@angular/core';

export interface ProductoCarrito {
  id: string; // único en toda la tienda, p. ej. 'proteinas-1'
  nombre: string;
  precio: number; // COP, precio unitario
  cantidad: number;
  imagen: string;
}

export type ProductoNuevo = Omit<ProductoCarrito, 'cantidad'>;

const CLAVE_STORAGE = 'carrito';
const COSTO_ENVIO = 10000; // COP
const CANTIDAD_MAXIMA = 99;

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private readonly lista = signal<ProductoCarrito[]>(this.leerGuardado());

  readonly productos = this.lista.asReadonly();

  readonly unidades = computed(() =>
    this.lista().reduce((total, p) => total + p.cantidad, 0),
  );

  readonly subtotal = computed(() =>
    this.lista().reduce((total, p) => total + p.precio * p.cantidad, 0),
  );

  readonly envio = computed(() => (this.lista().length > 0 ? COSTO_ENVIO : 0));

  readonly total = computed(() => this.subtotal() + this.envio());

  constructor() {
    // Cada vez que cambia el carrito, se guarda en el navegador
    effect(() => this.guardar(this.lista()));
  }

  agregar(producto: ProductoNuevo, cantidad = 1): void {
    this.lista.update((actual) => {
      const existe = actual.some((p) => p.id === producto.id);
      if (existe) {
        return actual.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: Math.min(CANTIDAD_MAXIMA, p.cantidad + cantidad) }
            : p,
        );
      }
      return [...actual, { ...producto, cantidad: Math.min(CANTIDAD_MAXIMA, cantidad) }];
    });
  }

  cambiarCantidad(id: string, cambio: number): void {
    this.lista.update((actual) =>
      actual.map((p) =>
        p.id === id
          ? { ...p, cantidad: Math.min(CANTIDAD_MAXIMA, Math.max(1, p.cantidad + cambio)) }
          : p,
      ),
    );
  }

  eliminar(id: string): void {
    this.lista.update((actual) => actual.filter((p) => p.id !== id));
  }

  vaciar(): void {
    this.lista.set([]);
  }

  private leerGuardado(): ProductoCarrito[] {
    try {
      if (typeof localStorage === 'undefined') return [];
      const texto = localStorage.getItem(CLAVE_STORAGE);
      if (!texto) return [];
      const datos: unknown = JSON.parse(texto);
      if (!Array.isArray(datos)) return [];
      return datos.filter(
        (p): p is ProductoCarrito =>
          typeof p?.id === 'string' &&
          typeof p?.nombre === 'string' &&
          typeof p?.precio === 'number' &&
          typeof p?.cantidad === 'number' &&
          typeof p?.imagen === 'string',
      );
    } catch {
      return [];
    }
  }

  private guardar(productos: ProductoCarrito[]): void {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(productos));
    } catch {
      // Si el almacenamiento está lleno o bloqueado, el carrito sigue funcionando en memoria
    }
  }
}