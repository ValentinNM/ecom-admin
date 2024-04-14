import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const [editableProduct, setEditableProduct] = useState(null);
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
      <h1>Edit product</h1>
      {editableProduct && (
        <ProductForm product={editableProduct} />
      )}
    </Layout>
  )
}