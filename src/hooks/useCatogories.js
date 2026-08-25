import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
    try{
        const res= await axios.get("https://fakestoreapi.com/products/categories");
        setCategories (res.data)

    }
    catch(err){
        setError(err.message);


    }
    finally{
        setLoading(false);

    }
    }
    fetchCategories();
  }, []);

  return { categories, loading, error };
}