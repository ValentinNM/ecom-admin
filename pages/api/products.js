import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req = {}, res = {}) {
  const { method = '' } = req
  await mongooseConnect()
  console.info('clientRequest:', {
    method,
    body: req.body,
    query: req.query,
    params: req.params,
  })

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

  if (method === 'PUT') {
    try {
      const { _id, ...data } = req.body
      const newData = data
      delete newData._id

      const updatedProduct = await Product.updateOne({ _id }, { ...newData })
      res.status(200).json(updatedProduct)
    } catch (error) {
      console.error({ updateProductError: error });
    }
  }

  if (method === 'DELETE') {
    try {
      const { id } = req?.query
      if (!id) {
        return res.status(400).json({ error: 'Product ID is required' });
      }
      const deleted = await Product.deleteOne({ _id: id })

      if (deleted.acknowledged === true && deleted.deletedCount === 1) {
        res.status(200).json({ deleted: true, message: 'Product deleted' })
      }
    } catch (error) {
      console.error({ deleteProductError: error });
      res.status(500).json(error)
    }
  }

}
