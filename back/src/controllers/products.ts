type MyResponse = import('express').Response;
type MyRequest = import('express').Request;
const myProductsService = require('@/services/products');

class Products {
  static async getProducts(req: MyRequest, res: MyResponse) {
    try {
      const { id } = req.params;

      if (id) {
        const product = await myProductsService.getProducts(id);
        return res.status(200).json(product);
      }

      const products = await myProductsService.getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async createProduct(req: MyRequest, res: MyResponse) {
    try {
      const { name, description, price, image } = req.body;
      await myProductsService.createProduct(name, description, price, image);
      res.status(200).json({ message: 'Product created' });
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async updateProduct(req: MyRequest, res: MyResponse) {
    try {
      const { id } = req.params;
      const { name, description, price, image } = req.body;
      const product = await myProductsService.updateProduct(id, name, description, price, image);
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async deleteProduct(req: MyRequest, res: MyResponse) {
    try {
      const { id } = req.params;
      await myProductsService.deleteProduct(id);
      res.status(200).json('Product deleted');
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = Products;
