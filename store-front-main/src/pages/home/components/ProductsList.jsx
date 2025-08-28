import { API } from "@/api/requests";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

export default function ProductsList({
  categories = null
}) {
  const { data: products } = useQuery(
    API.PRODUCTS.FIND_ALL({ categories })
  );

  return (
    <div className="flex justify-center flex-wrap gap-5">
      {products
        ? products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })
        : null}
    </div>
  );
}
