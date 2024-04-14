import axios from "axios";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProduct() {

  const [product, setProduct] = useState({});
  const [deleteConsent, setDeleteConsent] = useState(false);
  const [deleted, setDelete] = useState(false);

  const router = useRouter()

  const { id } = router?.query || {};

  useEffect(() => {
    if (!id) {
      return
    }
    axios.get(`/api/products/?id=${id}`)
      .then((response) => {
        console.log({ response });
        if (response.status === 200 && response.statusText === "OK") {
          setProduct(response.data);
        }
      })
      .catch((error) => {
        console.error({ error });
      });
  }, [id]);

  function goBack() {
    setDeleteConsent(false)
    router.push('/products')
  }

  async function deleteProduct(idToDel) {
    console.info({ idToDel });
    await axios.delete(`/api/products?id=${idToDel}`)
      .then((response) => {
        if (response.status === 200 && response.data.deleted) {
          setDelete(true);
        }
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  if (!product) {
    return (
      <Layout>
        <h3 className="text-center">Product not found</h3>
        <button
          className="btn-default"
          onClick={goBack}
        >Go back</button>
      </Layout>
    );
  }

  return (
    <Layout>
      <h3 className="text-center mb-2">
        Are you sure you want to delete "{product.title}"?</h3>
      <div className="flex gap-2 justify-center">
        <button
          className="btn-red"
          onClick={() => {
            setDeleteConsent(true);
          }}
        >YES</button>
        <button
          className="btn-default"
          onClick={goBack}
        >NO</button>
      </div>

      {deleteConsent && (<div>
        <h3>Product to delete...</h3>
        <div className="flex-col">
          <span className="inline-flex">
            <label>Product ID:</label>
            <div>{product._id}</div>
          </span>
          <br />
          <label>Product name</label>
          <div>{product.title}</div>
          <label>Product description</label>
          <div>{product.description}</div>
        </div>

        <button
          className="bg-blue-800 text-red-500 border border-gray-700 rounded-md px-1"
          onClick={() => deleteProduct(product._id)}
        >Confirm delete</button>
      </div>)}
      {deleteConsent && deleted && (
        <div>
          <h3>Product: {id}, has been successfully deleted</h3>
          <button
            className="btn-default"
            onClick={goBack}
          >Go back</button>
        </div>
      )}

    </Layout>
  );
}