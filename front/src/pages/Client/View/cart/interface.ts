export interface IPcart {
  _id?: string;
  name?: string;
  brand?: {
    _id: string;
    name: string;
  };
  picture?: string;
  infoCarts?: {
    priceProduct: number;
    quantity: number;
    total: number;
  };
}
