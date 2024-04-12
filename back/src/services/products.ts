const Product = require('@/models/product');
const { IProduct } = require('@/interfaces/services');

class ProductsService {
  static async getProducts(id: string | undefined) {
    if (id) {
      const product = await Product.findById(id);
      if (!product) {
        throw 'el producto no existe';
      }
      return product;
    }

    const products = await Product.find();
    return products;
  }

  static async createProduct(name: string, description: string, price: number, image: string) {
    const findProduct = await Product.findOne({ name });
    if (findProduct) {
      throw 'el producto ya existe';
    }

    const product = new Product({ name, description, price, image });
    await product.save();
    return product;
  }

  static async updateProduct(
    id: string,
    name: string | undefined,
    description: string | undefined,
    price: number | undefined,
    image: string | undefined
  ) {
    const objectToUpdate: typeof IProduct = {};
    if (name) objectToUpdate.name = name;
    if (description) objectToUpdate.description = description;
    if (price) objectToUpdate.price = price;
    if (image) objectToUpdate.image = image;
    const product = await Product.findById(id);
    if (!product) {
      throw 'el producto no existe';
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, objectToUpdate, { new: true });
    return updatedProduct;
  }

  static async deleteProduct(id: string) {
    const product = await Product.findById(id);
    if (!product) {
      throw 'el producto no existe';
    }
    await Product.findByIdAndDelete(id);
  }
}

module.exports = ProductsService;

// {
//   name: 'Jugo fresco de naranja exprimida',
//   description:
//     'Disfruta de la frescura y el sabor natural de nuestras naranjas recién exprimidas en un delicioso jugo. Sin conservantes ni azúcares añadidos, solo la pureza y la vitalidad de la fruta. Refréscate y recarga tu energía con cada sorbo.',
//   image:
//     'https://res.cloudinary.com/dkewon763/image/upload/v1710384484/utxjx0zkqvwfh9jjyf9o.jpg',
//   price: 2500,
// }
