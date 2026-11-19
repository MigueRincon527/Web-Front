import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CarritoService } from '../../Services/carrito.service/carrito.service';
import { CatalogoService, ProductoCatalogo, SECCIONES } from '../../Services/catalogo.service/catalogo.service';
import { ResenasService } from '../../Services/resenas.service/resenas.service';

/** Exige un mínimo de caracteres sin contar los espacios de los extremos. */
function minimoSinEspacios(minimo: number): ValidatorFn {
  return (control) =>
    String(control.value ?? '').trim().length >= minimo ? null : { minimo: true };
}

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-producto',
  styleUrl: './producto.css',
  templateUrl: './producto.html',
})
export class Producto {
  private readonly ruta = inject(ActivatedRoute);
  private readonly catalogo = inject(CatalogoService);
  private readonly carrito = inject(CarritoService);
  private readonly resenasService = inject(ResenasService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  private readonly temporizadores: ReturnType<typeof setTimeout>[] = [];

  // ---------- Producto según la ruta /producto/:id ----------
  private readonly id = toSignal(this.ruta.paramMap.pipe(map((p) => p.get('id'))), {
    initialValue: this.ruta.snapshot.paramMap.get('id'),
  });

  readonly producto = computed<ProductoCatalogo | undefined>(() => {
    const id = this.id();
    return id ? this.catalogo.buscar(id) : undefined;
  });

  readonly seccion = computed(() => {
    const p = this.producto();
    return p ? SECCIONES[p.seccion] : undefined;
  });

  // ---------- Compra ----------
  readonly cantidad = signal(1);
  readonly agregado = signal(false);

  // ---------- Reseñas ----------
  readonly numeros = [1, 2, 3, 4, 5];
  readonly calificacion = signal(0);
  readonly intentoEnvio = signal(false);
  readonly publicada = signal(false);

  readonly formulario = this.fb.group({
    autor: ['', [minimoSinEspacios(2), Validators.maxLength(40)]],
    comentario: ['', [minimoSinEspacios(10), Validators.maxLength(600)]],
  });

  readonly resenas = computed(() => {
    const p = this.producto();
    return p ? this.resenasService.todas().filter((r) => r.productoId === p.id) : [];
  });

  readonly promedio = computed(() => {
    const lista = this.resenas();
    return lista.length
      ? lista.reduce((total, r) => total + r.calificacion, 0) / lista.length
      : 0;
  });

  readonly errorCalificacion = computed(
    () => this.intentoEnvio() && this.calificacion() === 0,
  );

  constructor() {
    this.destroyRef.onDestroy(() => this.temporizadores.forEach(clearTimeout));
  }

  // ---------- Acciones ----------
  cambiarCantidad(cambio: number): void {
    this.cantidad.update((c) => Math.min(99, Math.max(1, c + cambio)));
  }

  agregarAlCarrito(producto: ProductoCatalogo): void {
    this.carrito.agregar(
      {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
      },
      this.cantidad(),
    );
    this.agregado.set(true);
    this.temporizadores.push(setTimeout(() => this.agregado.set(false), 4000));
  }

  invalido(campo: 'autor' | 'comentario'): boolean {
    const control = this.formulario.controls[campo];
    return control.invalid && (control.touched || this.intentoEnvio());
  }

  publicar(): void {
    const producto = this.producto();
    if (!producto) return;

    if (this.formulario.invalid || this.calificacion() === 0) {
      this.intentoEnvio.set(true);
      this.formulario.markAllAsTouched();
      return;
    }

    const { autor, comentario } = this.formulario.getRawValue();
    this.resenasService.agregar({
      productoId: producto.id,
      autor: autor.trim(),
      calificacion: this.calificacion(),
      comentario: comentario.trim(),
    });

    this.formulario.reset();
    this.calificacion.set(0);
    this.intentoEnvio.set(false);
    this.publicada.set(true);
    this.temporizadores.push(setTimeout(() => this.publicada.set(false), 4000));
  }

  // ---------- Presentación ----------
  estrellasLlenas(valor: number): string {
    return '★'.repeat(Math.round(valor));
  }

  estrellasVacias(valor: number): string {
    return '★'.repeat(5 - Math.round(valor));
  }

  resumenValoracion(): string {
    const total = this.resenas().length;
    if (total === 0) return 'Sin reseñas todavía';
    const promedio = this.promedio().toFixed(1).replace('.', ',');
    return `${promedio} · ${total} ${total === 1 ? 'reseña' : 'reseñas'}`;
  }

  formatearFecha(iso: string): string {
    return new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium' }).format(new Date(iso));
  }

  formatearPrecio(valor: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(valor);
  }
}