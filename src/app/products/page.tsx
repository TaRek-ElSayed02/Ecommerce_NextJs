import ProductsList from "../../components/Products";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";




const getProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export default async function ProductsPage() {
  const products = await getProducts(); 

  return (
    <Suspense fallback={<CircularProgress />}>
      <ProductsList products={products} />
    </Suspense>
  );
}
