import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";


export default function NewProduct() {

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [error, setError] = useState();
  const [goToProducts, setGoToProducts] = useState(false);

  const router = useRouter()

  async function addProduct(event) {
    event.preventDefault();

    const data = { 
      title, 
      description, 
      price, 
      quantity 
    }
    await axios.post('/api/products', data)
    setGoToProducts(true)
  }

  if (goToProducts) {
    router.push('/products')
  }

  return (
    <Layout>
      <form onSubmit={ addProduct}>
        <h1>Add new product</h1>
        <label>Product name</label>
        <input
          type="text"
          placeholder="Product name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description</label>
        <textarea
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Price (in USD)</label>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Quantity</label>
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button className="btn-primary">
          Save
        </button>
      </form>

    </Layout>
  )
}