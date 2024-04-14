import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({ product = {} }) {
  console.info('ProductForm:', product);
  const { _id, title: existingTitle, description: existingDescription, price: existingPrice, quantity: existingQuantity } = product || {};

  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || '');
  const [quantity, setQuantity] = useState(existingQuantity || '');

  const [goToProducts, setGoToProducts] = useState(false);

  const [error, setError] = useState();

  const router = useRouter()

  async function addProduct(event) {
    event.preventDefault();

    const data = {
      title,
      description,
      price,
      quantity
    }

    if (_id) {
      await axios.put('/api/products', { _id, ...data })
    } else {
      await axios.post('/api/products', data)
    }
    
    setGoToProducts(true)
  }

  if (goToProducts) {
    router.push('/products')
  }

  return (
    <form onSubmit={addProduct}>
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
  )
}