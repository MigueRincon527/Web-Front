import { Injectable, effect, signal } from '@angular/core';

export interface Resena {
  id: string;
  productoId: string; // id del producto en el catálogo
  autor: string;
  calificacion: number; // 1 a 5
  comentario: string;
  fecha: string; // ISO 8601
}

export type NuevaResena = Omit<Resena, 'id' | 'fecha'>;

const CLAVE_STORAGE = 'resenas';

@Injectable({ providedIn: 'root' })
export class ResenasService {
  private readonly lista = signal<Resena[]>(this.leerGuardado());

  readonly todas = this.lista.asReadonly();

  constructor() {
    effect(() => this.guardar(this.lista()));
  }

  agregar(datos: NuevaResena): void {
    const resena: Resena = {
      ...datos,
      id: this.crearId(),
      fecha: new Date().toISOString(),
    };
    // Las más recientes primero
    this.lista.update((actual) => [resena, ...actual]);
  }

  private crearId(): string {
    return typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  private leerGuardado(): Resena[] {
    try {
      if (typeof localStorage === 'undefined') return [];
      const texto = localStorage.getItem(CLAVE_STORAGE);
      if (!texto) return [];
      const datos: unknown = JSON.parse(texto);
      if (!Array.isArray(datos)) return [];
      return datos.filter(
        (r): r is Resena =>
          typeof r?.id === 'string' &&
          typeof r?.productoId === 'string' &&
          typeof r?.autor === 'string' &&
          typeof r?.calificacion === 'number' &&
          r.calificacion >= 1 &&
          r.calificacion <= 5 &&
          typeof r?.comentario === 'string' &&
          typeof r?.fecha === 'string',
      );
    } catch {
      return [];
    }
  }

  private guardar(resenas: Resena[]): void {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(resenas));
    } catch {
      // Si el almacenamiento está lleno o bloqueado, las reseñas siguen en memoria
    }
  }
}