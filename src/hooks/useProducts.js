import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function useProducts(category) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  async function fetchProducts() {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const url =
        !category || category === "All categories"
          ? "https://fakestoreapi.com/products"
          : `https://fakestoreapi.com/products/category/${category}`;

      const res = await axios.get(url, { signal: controller.signal });
      setProducts(res.data);
    } catch (err) {
      if (axios.isCancel(err)) return;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();

    return () => {
      controllerRef.current?.abort();
    };
  }, [category]);

  return { products, loading, error, refetch: fetchProducts };
}