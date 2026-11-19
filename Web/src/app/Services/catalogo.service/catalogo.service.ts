import { Injectable } from '@angular/core';

export type Seccion =
  | 'proteinas'
  | 'creatinas'
  | 'pre-entrenos'
  | 'aminoacidos'
  | 'accesorios'
  | 'vitaminas'
  | 'destacados';

/** Una línea de información en la tarjeta y en la página de detalle. */
export interface Dato {
  resaltado?: string; // parte en negrita y color lima, p. ej. "24 g"
  texto: string;
}

export interface ProductoCatalogo {
  id: string; // único en toda la tienda, p. ej. 'proteinas-1'
  seccion: Seccion;
  categoria: string; // la usan los filtros de cada página
  nombre: string;
  descripcion: string; // corta, para la tarjeta
  descripcionLarga: string; // para la página de detalle
  datos: Dato[];
  precio: number; // COP
  imagen: string;
  alt: string;
  etiqueta?: string;
}

/** Título y ruta de cada sección (para el enlace "Volver a..."). */
export const SECCIONES: Record<Seccion, { titulo: string; ruta: string }> = {
  proteinas: { titulo: 'Proteínas', ruta: 'proteinas' },
  creatinas: { titulo: 'Creatinas', ruta: 'creatinas' },
  'pre-entrenos': { titulo: 'Pre-entrenos', ruta: 'pre-entrenos' },
  aminoacidos: { titulo: 'Aminoácidos', ruta: 'aminoacidos' },
  accesorios: { titulo: 'Accesorios', ruta: 'accesorios' },
  vitaminas: { titulo: 'Vitaminas', ruta: 'vitaminas' },
  destacados: { titulo: 'Inicio', ruta: '' },
};

const PRODUCTOS: ProductoCatalogo[] = [
  // ---------------------------------------------------------- Proteínas
  {
    id: 'proteinas-1',
    seccion: 'proteinas',
    categoria: 'Whey',
    nombre: 'Whey Protein',
    descripcion: 'Absorción rápida, ideal después de entrenar.',
    descripcionLarga:
      'Proteína de suero de leche de rápida absorción, pensada para tomar después de entrenar o en cualquier momento en que necesites completar tu proteína del día. Se mezcla fácil en agua, leche o batidos.',
    datos: [
      { resaltado: '24 g', texto: 'proteína por toma' },
      { resaltado: '1 kg', texto: '· 33 tomas' },
    ],
    precio: 129900,
    imagen: 'assets/img/whey-chocolate.png',
    alt: 'Bote de Whey Protein sabor chocolate',
    etiqueta: 'Más vendida',
  },
  {
    id: 'proteinas-2',
    seccion: 'proteinas',
    categoria: 'Aislada',
    nombre: 'Whey Isolate',
    descripcion: 'Muy baja en grasa y lactosa. Perfecta para definición.',
    descripcionLarga:
      'Proteína aislada de suero con más proteína por toma y muy poca grasa y lactosa. Es una buena opción si sigues un plan de definición o si la proteína normal te cae pesada.',
    datos: [
      { resaltado: '27 g', texto: 'proteína por toma' },
      { resaltado: '900 g', texto: '· 30 tomas' },
    ],
    precio: 169900,
    imagen: 'assets/img/isolate-vainilla.png',
    alt: 'Bote de proteína aislada sabor vainilla',
  },
  {
    id: 'proteinas-3',
    seccion: 'proteinas',
    categoria: 'Caseína',
    nombre: 'Caseína',
    descripcion: 'Digestión lenta, recomendada antes de dormir.',
    descripcionLarga:
      'Proteína de digestión lenta que libera aminoácidos de forma gradual. Mucha gente la toma por la noche o entre comidas muy separadas. Su textura es más espesa, ideal para batidos cremosos.',
    datos: [
      { resaltado: '24 g', texto: 'proteína por toma' },
      { resaltado: '900 g', texto: '· 28 tomas' },
    ],
    precio: 149900,
    imagen: 'assets/img/caseina-fresa.png',
    alt: 'Bote de caseína sabor fresa',
  },
  {
    id: 'proteinas-4',
    seccion: 'proteinas',
    categoria: 'Vegetal',
    nombre: 'Proteína vegetal',
    descripcion: 'Mezcla de guisante y arroz. Apta para veganos.',
    descripcionLarga:
      'Combina proteína de guisante y de arroz para aportar un buen perfil de aminoácidos sin ingredientes de origen animal. Es apta para personas veganas o con intolerancia a la lactosa.',
    datos: [
      { resaltado: '22 g', texto: 'proteína por toma' },
      { resaltado: '800 g', texto: '· 26 tomas' },
    ],
    precio: 139900,
    imagen: 'assets/img/vegetal-cacao.png',
    alt: 'Bote de proteína vegetal sabor cacao',
    etiqueta: 'Sin lactosa',
  },

  // ---------------------------------------------------------- Creatinas
  {
    id: 'creatinas-1',
    seccion: 'creatinas',
    categoria: 'Monohidrato',
    nombre: 'Creatina Monohidrato',
    descripcion: 'La forma clásica y más estudiada. Sin sabor, se mezcla con cualquier bebida.',
    descripcionLarga:
      'La forma de creatina más estudiada y de uso más extendido. No tiene sabor, así que se mezcla con agua, jugo o tu batido sin cambiar el gusto. Lo habitual es tomar una dosis al día de forma constante.',
    datos: [
      { resaltado: '5 g', texto: 'de creatina por toma' },
      { resaltado: '300 g', texto: '· 60 tomas' },
    ],
    precio: 89900,
    imagen: 'assets/img/creatina-monohidrato.png',
    alt: 'Bote de creatina monohidrato',
    etiqueta: 'Más vendida',
  },
  {
    id: 'creatinas-2',
    seccion: 'creatinas',
    categoria: 'Micronizada',
    nombre: 'Creatina Micronizada',
    descripcion: 'Partículas más finas que se disuelven mejor en agua.',
    descripcionLarga:
      'Creatina monohidrato con partículas más finas, que se disuelven mejor en líquidos y dejan menos residuo en el vaso. Se usa igual que la monohidrato clásica, con una mezcla más suave.',
    datos: [
      { resaltado: '5 g', texto: 'de creatina por toma' },
      { resaltado: '500 g', texto: '· 100 tomas' },
    ],
    precio: 129900,
    imagen: 'assets/img/creatina-micronizada.png',
    alt: 'Bote de creatina micronizada',
  },
  {
    id: 'creatinas-3',
    seccion: 'creatinas',
    categoria: 'HCl',
    nombre: 'Creatina HCl',
    descripcion: 'Clorhidrato de creatina, muy soluble y con dosis más pequeñas.',
    descripcionLarga:
      'Clorhidrato de creatina: una forma muy soluble que se usa en porciones más pequeñas. Es una alternativa para quienes prefieren dosis más reducidas.',
    datos: [
      { resaltado: '2 g', texto: 'de creatina por toma' },
      { resaltado: '120 g', texto: '· 60 tomas' },
    ],
    precio: 109900,
    imagen: 'assets/img/creatina-hcl.png',
    alt: 'Bote de creatina HCl',
  },
  {
    id: 'creatinas-4',
    seccion: 'creatinas',
    categoria: 'Cápsulas',
    nombre: 'Creatina en cápsulas',
    descripcion: 'Fácil de llevar y sin mezclar. Ideal para viajar.',
    descripcionLarga:
      'Creatina en cápsulas, sin necesidad de mezclar ni medir. Es cómoda para llevar al gimnasio o de viaje, y no deja sabor.',
    datos: [
      { resaltado: '3 g', texto: 'de creatina por toma' },
      { resaltado: '120 cápsulas', texto: '· 30 tomas' },
    ],
    precio: 99900,
    imagen: 'assets/img/creatina-capsulas.png',
    alt: 'Bote de creatina en cápsulas',
    etiqueta: 'Práctica',
  },

  // ------------------------------------------------------- Pre-entrenos
  {
    id: 'pre-entrenos-1',
    seccion: 'pre-entrenos',
    categoria: 'Estimulante',
    nombre: 'Pre-entreno Energy',
    descripcion: 'Fórmula intensa con cafeína para entrenamientos exigentes.',
    descripcionLarga:
      'Fórmula con una dosis alta de cafeína, pensada para entrenamientos exigentes. Se toma unos 20 a 30 minutos antes de entrenar. No es recomendable si eres sensible a la cafeína, y conviene evitarla cerca de la hora de dormir.',
    datos: [
      { resaltado: '300 mg', texto: 'de cafeína por toma' },
      { resaltado: '300 g', texto: '· 30 tomas' },
    ],
    precio: 119900,
    imagen: 'assets/img/pre-energy.png',
    alt: 'Bote de pre-entreno Energy',
    etiqueta: 'Más vendido',
  },
  {
    id: 'pre-entrenos-2',
    seccion: 'pre-entrenos',
    categoria: 'Moderado',
    nombre: 'Pre-entreno Focus',
    descripcion: 'Energía y concentración con una dosis de cafeína media.',
    descripcionLarga:
      'Una opción intermedia, con cafeína moderada para ganar energía y concentración sin sentirte acelerado. Buena para empezar con pre-entrenos o para sesiones más cortas.',
    datos: [
      { resaltado: '150 mg', texto: 'de cafeína por toma' },
      { resaltado: '270 g', texto: '· 30 tomas' },
    ],
    precio: 109900,
    imagen: 'assets/img/pre-focus.png',
    alt: 'Bote de pre-entreno Focus',
  },
  {
    id: 'pre-entrenos-3',
    seccion: 'pre-entrenos',
    categoria: 'Sin estimulantes',
    nombre: 'Pre-entreno Stim-Free',
    descripcion: 'Sin cafeína, para entrenar de noche o si eres sensible a los estimulantes.',
    descripcionLarga:
      'Pre-entreno sin cafeína ni otros estimulantes. Es útil si entrenas de noche, si eres sensible a los estimulantes o si quieres alternar con una fórmula más suave.',
    datos: [
      { resaltado: 'Sin cafeína', texto: '' },
      { resaltado: '360 g', texto: '· 30 tomas' },
    ],
    precio: 114900,
    imagen: 'assets/img/pre-stim-free.png',
    alt: 'Bote de pre-entreno sin estimulantes',
    etiqueta: 'Sin cafeína',
  },
  {
    id: 'pre-entrenos-4',
    seccion: 'pre-entrenos',
    categoria: 'Sin estimulantes',
    nombre: 'Pump Citrulina',
    descripcion: 'Citrulina y beta-alanina en una mezcla sin cafeína.',
    descripcionLarga:
      'Mezcla de citrulina y beta-alanina sin cafeína, para quienes buscan un pre-entreno sin estimulantes. Puedes usarlo solo o combinarlo con otros suplementos.',
    datos: [
      { resaltado: 'Sin cafeína', texto: '' },
      { resaltado: '300 g', texto: '· 25 tomas' },
    ],
    precio: 99900,
    imagen: 'assets/img/pre-pump.png',
    alt: 'Bote de pump con citrulina',
  },

  // -------------------------------------------------------- Aminoácidos
  {
    id: 'aminoacidos-1',
    seccion: 'aminoacidos',
    categoria: 'BCAA',
    nombre: 'BCAA 2:1:1',
    descripcion: 'Leucina, isoleucina y valina para tomar durante el entrenamiento.',
    descripcionLarga:
      'Mezcla de los aminoácidos de cadena ramificada (leucina, isoleucina y valina) en proporción 2:1:1. Se disuelve fácil y es cómoda para tomar durante el entrenamiento.',
    datos: [
      { resaltado: '7 g', texto: 'de aminoácidos por toma' },
      { resaltado: '300 g', texto: '· 40 tomas' },
    ],
    precio: 89900,
    imagen: 'assets/img/bcaa.png',
    alt: 'Bote de BCAA 2:1:1',
    etiqueta: 'Más vendido',
  },
  {
    id: 'aminoacidos-2',
    seccion: 'aminoacidos',
    categoria: 'EAA',
    nombre: 'EAA esenciales',
    descripcion: 'Los nueve aminoácidos esenciales en una sola mezcla.',
    descripcionLarga:
      'Incluye los nueve aminoácidos esenciales, los que el cuerpo no produce por sí solo y debe obtener de la dieta o de suplementos. Una opción más completa que los BCAA.',
    datos: [
      { resaltado: '10 g', texto: 'de aminoácidos por toma' },
      { resaltado: '400 g', texto: '· 40 tomas' },
    ],
    precio: 119900,
    imagen: 'assets/img/eaa.png',
    alt: 'Bote de aminoácidos esenciales EAA',
  },
  {
    id: 'aminoacidos-3',
    seccion: 'aminoacidos',
    categoria: 'Glutamina',
    nombre: 'Glutamina',
    descripcion: 'L-glutamina en polvo, sin sabor. Se mezcla con cualquier bebida.',
    descripcionLarga:
      'L-glutamina en polvo sin sabor, fácil de mezclar con cualquier bebida fría. Se puede tomar a cualquier hora del día.',
    datos: [
      { resaltado: '5 g', texto: 'de aminoácidos por toma' },
      { resaltado: '300 g', texto: '· 60 tomas' },
    ],
    precio: 79900,
    imagen: 'assets/img/glutamina.png',
    alt: 'Bote de glutamina',
  },
  {
    id: 'aminoacidos-4',
    seccion: 'aminoacidos',
    categoria: 'Citrulina',
    nombre: 'Citrulina malato',
    descripcion: 'Aminoácido muy usado antes de entrenar. Sin cafeína.',
    descripcionLarga:
      'Aminoácido muy usado antes de entrenar. No contiene cafeína, así que puedes combinarlo con tu pre-entreno o usarlo solo.',
    datos: [
      { resaltado: '6 g', texto: 'de aminoácidos por toma' },
      { resaltado: '240 g', texto: '· 40 tomas' },
    ],
    precio: 84900,
    imagen: 'assets/img/citrulina.png',
    alt: 'Bote de citrulina malato',
    etiqueta: 'Sin cafeína',
  },

  // ---------------------------------------------------------- Accesorios
  {
    id: 'accesorios-1',
    seccion: 'accesorios',
    categoria: 'Shakers',
    nombre: 'Shaker 700 ml',
    descripcion: 'Tapa antiderrame y bola mezcladora para batir sin grumos.',
    descripcionLarga:
      'Vaso mezclador de 700 ml con tapa antiderrame y bola mezcladora para batir tus suplementos sin grumos. Fácil de abrir y de lavar.',
    datos: [{ resaltado: '700 ml', texto: '' }, { texto: 'Plástico libre de BPA' }],
    precio: 24900,
    imagen: 'assets/img/shaker-700.png',
    alt: 'Shaker de 700 ml',
    etiqueta: 'Más vendido',
  },
  {
    id: 'accesorios-2',
    seccion: 'accesorios',
    categoria: 'Shakers',
    nombre: 'Shaker con compartimentos',
    descripcion: 'Lleva tu proteína y tus cápsulas en un solo envase.',
    descripcionLarga:
      'Vaso de 600 ml con compartimentos para llevar tu polvo o tus cápsulas separados hasta el momento de mezclar. Práctico para ir directo del trabajo al gimnasio.',
    datos: [{ resaltado: '600 ml', texto: '' }, { texto: 'Plástico libre de BPA' }],
    precio: 29900,
    imagen: 'assets/img/shaker-compartimentos.png',
    alt: 'Shaker con compartimentos para polvo y cápsulas',
  },
  {
    id: 'accesorios-3',
    seccion: 'accesorios',
    categoria: 'Cinturones',
    nombre: 'Cinturón de levantamiento',
    descripcion: 'Soporte firme para sentadilla y peso muerto con cierre ajustable.',
    descripcionLarga:
      'Cinturón de levantamiento con cierre ajustable que da soporte a la zona del core en ejercicios pesados como la sentadilla y el peso muerto. Disponible en tallas S a XL.',
    datos: [{ resaltado: 'Tallas S a XL', texto: '' }, { texto: 'Cuero sintético' }],
    precio: 119900,
    imagen: 'assets/img/cinturon.png',
    alt: 'Cinturón de levantamiento de pesas',
  },
  {
    id: 'accesorios-4',
    seccion: 'accesorios',
    categoria: 'Agarre',
    nombre: 'Straps de agarre',
    descripcion: 'Para que el agarre no limite tus series de jalón y peso muerto.',
    descripcionLarga:
      'Correas de algodón reforzado que se enrollan a la barra para mejorar el agarre en jalones, remos y peso muerto. Talla única.',
    datos: [{ resaltado: 'Talla única', texto: '' }, { texto: 'Algodón reforzado' }],
    precio: 34900,
    imagen: 'assets/img/straps.png',
    alt: 'Par de straps de agarre',
    etiqueta: 'Nuevo',
  },
  {
    id: 'accesorios-5',
    seccion: 'accesorios',
    categoria: 'Agarre',
    nombre: 'Guantes de entrenamiento',
    descripcion: 'Acolchado en la palma y malla transpirable en el dorso.',
    descripcionLarga:
      'Guantes con la palma acolchada y el dorso de malla transpirable. Reducen el roce con la barra y las mancuernas durante tus series.',
    datos: [{ resaltado: 'Tallas S a XL', texto: '' }, { texto: 'Neopreno y malla' }],
    precio: 44900,
    imagen: 'assets/img/guantes.png',
    alt: 'Guantes de entrenamiento',
  },

  // ------------------------------------------------------------ Vitaminas
  {
    id: 'vitaminas-1',
    seccion: 'vitaminas',
    categoria: 'Multivitamínicos',
    nombre: 'Multivitamínico diario',
    descripcion: 'Combinación de vitaminas y minerales para complementar tu alimentación.',
    descripcionLarga:
      'Combinación de vitaminas y minerales para complementar tu alimentación diaria. No reemplaza una dieta variada.',
    datos: [
      { resaltado: 'Vitaminas y minerales esenciales', texto: '' },
      { texto: '120 tabletas · 60 porciones' },
    ],
    precio: 74900,
    imagen: 'assets/img/multivitaminico.png',
    alt: 'Bote de multivitamínico diario',
    etiqueta: 'Más vendida',
  },
  {
    id: 'vitaminas-2',
    seccion: 'vitaminas',
    categoria: 'Omega 3',
    nombre: 'Omega 3',
    descripcion: 'Aceite de pescado en cápsulas blandas, sin sabor a pescado.',
    descripcionLarga:
      'Aceite de pescado en cápsulas blandas, sin sabor a pescado. Aporta ácidos grasos omega 3 para complementar tu dieta.',
    datos: [
      { resaltado: '1.000 mg de omega 3 por porción', texto: '' },
      { texto: '90 cápsulas · 45 porciones' },
    ],
    precio: 69900,
    imagen: 'assets/img/omega-3.png',
    alt: 'Bote de omega 3',
  },
  {
    id: 'vitaminas-3',
    seccion: 'vitaminas',
    categoria: 'Vitamina D',
    nombre: 'Vitamina D3',
    descripcion: 'Una cápsula al día. Útil si tomas poco sol.',
    descripcionLarga:
      'Una cápsula al día aporta 2.000 UI de vitamina D3. Es un complemento útil si te da poco el sol.',
    datos: [
      { resaltado: '2.000 UI por cápsula', texto: '' },
      { texto: '120 cápsulas · 120 porciones' },
    ],
    precio: 44900,
    imagen: 'assets/img/vitamina-d3.png',
    alt: 'Bote de vitamina D3',
  },
  {
    id: 'vitaminas-4',
    seccion: 'vitaminas',
    categoria: 'Minerales',
    nombre: 'Magnesio',
    descripcion: 'Mineral para el funcionamiento muscular y el descanso.',
    descripcionLarga:
      'Mineral que participa en el funcionamiento muscular y nervioso. Es un complemento común entre quienes entrenan con frecuencia.',
    datos: [
      { resaltado: '400 mg de magnesio por porción', texto: '' },
      { texto: '120 cápsulas · 60 porciones' },
    ],
    precio: 54900,
    imagen: 'assets/img/magnesio.png',
    alt: 'Bote de magnesio',
    etiqueta: 'Nuevo',
  },

  // ----------------------------------------- Destacados (página de inicio)
  {
    id: 'destacado-1',
    seccion: 'destacados',
    categoria: 'Proteínas',
    nombre: 'Proteína',
    descripcion: 'Whey para recuperarte después de entrenar',
    descripcionLarga:
      'Proteína en polvo para complementar tu ingesta diaria y apoyar tu recuperación después de entrenar. Se mezcla fácil con agua o leche.',
    datos: [],
    precio: 15000,
    imagen:
      'https://www.optimumnutrition.com.co/wp-content/uploads/2020/03/Gold_Standard_Whey_Optimum_Nutrition_2_LB_French_Vanilla.webp',
    alt: 'Bote de proteína whey sabor vainilla',
  },
  {
    id: 'destacado-2',
    seccion: 'destacados',
    categoria: 'Creatinas',
    nombre: 'Creatina',
    descripcion: 'Monohidrato para fuerza y rendimiento',
    descripcionLarga:
      'Creatina en polvo de 1 kg, uno de los suplementos más usados para trabajar fuerza y rendimiento. Se toma una dosis al día de forma constante.',
    datos: [],
    precio: 15000,
    imagen: 'https://ragym.club/wp-content/uploads/CREATINA-NUTREX-1KG-1.jpg',
    alt: 'Bote de creatina de 1 kg',
  },
  {
    id: 'destacado-3',
    seccion: 'destacados',
    categoria: 'Pre-entrenos',
    nombre: 'Pre-entreno',
    descripcion: 'Energía y enfoque para tu sesión',
    descripcionLarga:
      'Pre-entreno en polvo con sabor a uva para darte energía y enfoque antes de la sesión. Evítalo cerca de la hora de dormir.',
    datos: [],
    precio: 15000,
    imagen:
      'https://i5.walmartimages.com/seo/Raw-Essentials-Pre-Workout-20-Serve-Sour-Grape_37dcd699-a49e-4db9-9131-eec2fc7f2ec3.d17bfb3aae375aad6ec77281ac05cd14.jpeg',
    alt: 'Bote de pre-entreno sabor uva',
  },
  {
    id: 'destacado-4',
    seccion: 'destacados',
    categoria: 'Aminoácidos',
    nombre: 'BCAA',
    descripcion: 'Aminoácidos para tomar mientras entrenas',
    descripcionLarga:
      'Aminoácidos de cadena ramificada en polvo, cómodos de tomar mientras entrenas.',
    datos: [],
    precio: 15000,
    imagen: 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/opn/opn02522/v/40.jpg',
    alt: 'Bote de BCAA',
  },
  {
    id: 'destacado-5',
    seccion: 'destacados',
    categoria: 'Ganadores de masa',
    nombre: 'Mass gainer',
    descripcion: 'Calorías y proteína para ganar masa',
    descripcionLarga:
      'Mezcla alta en calorías con proteína y carbohidratos, pensada para quienes les cuesta subir de peso y ganar masa muscular.',
    datos: [],
    precio: 15000,
    imagen: 'https://www.optimumnutrition.com.co/wp-content/uploads/2023/08/serious-mass-6-lb-vanilla.jpg',
    alt: 'Bolsa de mass gainer sabor vainilla',
  },
  {
    id: 'destacado-6',
    seccion: 'destacados',
    categoria: 'Quemadores',
    nombre: 'Quemador',
    descripcion: 'Apoyo para tu etapa de definición',
    descripcionLarga:
      'Suplemento pensado para acompañar un plan de alimentación y ejercicio durante la etapa de definición. No sustituye una dieta equilibrada.',
    datos: [],
    precio: 15000,
    imagen: 'https://http2.mlstatic.com/D_Q_NP_2X_893735-MCO109321461932_042026-P.webp',
    alt: 'Bote de quemador de grasa',
  },
  {
    id: 'destacado-7',
    seccion: 'destacados',
    categoria: 'Accesorios',
    nombre: 'Cinturón gym',
    descripcion: 'Soporte firme para tus levantamientos',
    descripcionLarga:
      'Cinturón de cuero negro que da soporte firme a la zona lumbar en levantamientos pesados.',
    datos: [],
    precio: 15000,
    imagen: 'https://deportesregol.com/cdn/shop/files/2140_Cinturon_Elisua_Cuero_Negro.jpg?v=1742201122',
    alt: 'Cinturón de levantamiento de cuero negro',
  },
  {
    id: 'destacado-8',
    seccion: 'destacados',
    categoria: 'Accesorios',
    nombre: 'Straps',
    descripcion: 'Agarre seguro en jalones y peso muerto',
    descripcionLarga:
      'Correas de agarre para que tus manos no limiten tus series de jalón y peso muerto.',
    datos: [],
    precio: 15000,
    imagen: 'https://contents.mediadecathlon.com/p2720151/k$5222640a73abcde5e5f703d80b05079f/picture.jpg',
    alt: 'Par de straps de agarre',
  },
];

@Injectable({ providedIn: 'root' })
export class CatalogoService {
  porSeccion(seccion: Seccion): ProductoCatalogo[] {
    return PRODUCTOS.filter((p) => p.seccion === seccion);
  }

  buscar(id: string): ProductoCatalogo | undefined {
    return PRODUCTOS.find((p) => p.id === id);
  }
}