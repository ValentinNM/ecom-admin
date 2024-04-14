import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";

export default function EditProductPage() {
  const [editableProduct, setEditableProduct] = useState({});
  const router = useRouter();
  console.log({ router });
  const { id } = router?.query;

  useEffect(() => {
    if (!id) return;

    if (id) {
      axios.get(`/api/products/?id=${id}`)
        .then((response) => {
          console.log('editProd', response.data);
          setEditableProduct(response.data);
        })
        .catch((error) => {
          console.error({ error });
        });
    }
  }, [id]);


  return (
    <Layout>
      <h1>Edit Product</h1>
      <p>Product ID: {id}</p>
      <p>Product Title: {editableProduct.title || ''}</p>
    </Layout>
  )
}