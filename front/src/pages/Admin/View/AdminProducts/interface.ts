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
