import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req = {}, res = {}) {
  const { method = '' } = req
  await mongooseConnect()

  if (method === 'POST') {
    try {
      const newProduct = await Product.create({ ...req.body })
      console.info({ newProduct });
      res.status(200).json(newProduct)
    } catch (error) {
      console.error({ newProductError: error });
    }
  }

  if (method === 'GET') {
    try {
      if (req?.query?.id) {
        const product = await Product.findById(req.query.id)
        res.status(200).json(product)
      } else {
        const products = await Product.find()
        res.status(200).json(products)
      }
    } catch (error) {
      console.error({ getProductsError: error });
      res.status(500).json(error)
    }
  }
}