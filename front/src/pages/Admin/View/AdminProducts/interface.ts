export interface ICategories {
  _id?: string;
  name?: string;
  subcategory?: string[];
  products?: string[];
}

export interface ICreateProductInput {
  _id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  sellingPrice: number;
  referencePrice?: number | undefined;
  category?: string;
  subcategory?: string;
  brand?: string;
}

export interface IAllProducts {
  _id: string;
  name: string;
  picture: string;
  sellingPrice: number;
  referencePrice: number;
  category: ICategories;
  status: boolean;
}

export interface IFilterAdminProducts {
  sellingPrice?: string;
  category?: string;
  brand?: string;
  salesNumber?: string;
  name?: string;
  [key: string]: string | undefined;
}

export type Tdimensiones = {
  Peso: number | undefined;
  Tamaño: string | undefined;
  Alto: number | undefined;
  Ancho: number | undefined;
  Largo: number | undefined;
  Capacidad: number | undefined;
  Largo_de_la_manguera: number | undefined;
};
export type Tespecificaciones = {
  Tipo: string;
  Amperaje: number | undefined;
  Características: string;
  Voltaje: number | undefined;
  País_de_Origen: string;
  Potencia: number | undefined;
  Pila: string;
  Consumo: number | undefined;
  Garantía_Producto: string;
  Material: string;
  Cantidad_contenida_en_el_empaque: string;
  Uso_de_Herramienta: string;
  Inalambrico: string;
  Aspira_líquidos: string;
  Tipo_de_aspiradora: string;
  Color: string;
  Incluye: string;
  Modelo: string;
};
export interface Idescription {
  dimensiones: Tdimensiones;
  especificaciones: Tespecificaciones;
}
