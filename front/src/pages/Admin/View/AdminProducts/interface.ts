export interface ICategories {
  _id: string;
  name: string;
  subcategory?: string[];
  products?: string[];
}

export interface ICreateProductInput {
  name: string;
  description: string;
  purchasePrice: number;
  sellingPrice: number;
  referencePrice?: number | undefined;
  category?: string;
  subcategory?: string;
  brand?: string;
}
