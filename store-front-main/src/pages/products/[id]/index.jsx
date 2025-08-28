import { API } from "@/api/requests";
import { Navbar } from "@/components/Navbar";
import ProductsList from "@/pages/home/components/ProductsList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAuthStore } from "../../../../stores/auth";
import { cn } from "@/utils/styles";
import Link from "next/link";
import { ENDPOINTS } from "@/utils/constants/endpoints";
import { useCartStore } from "../../../../stores/cartStore";

export default function ProductById() {
  const { token } = useAuthStore();

  const router = useRouter();

  const queryClient = useQueryClient();

  const { setCart, cart } = useCartStore();

  const { id } = router.query;

  const { data: product } = useQuery(API.PRODUCTS.FIND_BY_ID({ id }));

  const { mutate: addToCart } = useMutation(API.USERS.ADD_TO_CART());

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(
      { productId: product._id, quantity: 1 },
      {
        onSuccess: (data) => {
          console.log("Added to cart:", data);
          queryClient.invalidateQueries({
            queryKey: [ENDPOINTS.USER.ME],
          });
          setCart(data);
        },
        onError: (error) => {
          console.log("Error adding to cart:", error);
        },
      }
    );
  };

  const isProductInCart = () => {
    console.log(cart);
    
    return cart.some((item) => item.productId._id === product?._id);
  };

  return (
    <div className="flex flex-col gap-10 w-full bg-white text-gray-600 min-h-screen pb-10">
      <Navbar />

      {product ? (
        <div className="flex mx-auto justify-center max-w-[1200px]">
          <img
            className="w-[300px] h-[300px] rounded-2xl"
            src={product.imgSrc}
            alt=""
          />

          <div className="flex flex-col gap-5">
            <h1 className="text-5xl font-bold">{product.title}</h1>
            <p className="text-xl font-semibold text-green-600">
              ${product.price}
            </p>
            <p className="text-md">{product.description}</p>

            {/* Categories */}
            <div className="flex gap-2">
              {product.category.map((category) => (
                <span
                  key={category}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>

            {isProductInCart() ? <span className="bg-green-600 text-white rounded-lg w-fit px-2 py-1 font-bold">Ya lo tienes en el carrito!</span> : <button
              className={cn(
                "bg-blue-600 text-white px-4 py-2 rounded-lg w-fit cursor-pointer active:scale-95 transition disabled:opacity-50",
                {
                  "opacity-50 cursor-not-allowed": !token,
                }
              )}
              onClick={handleAddToCart}
              disabled={!token}
            >
              Add to Cart
            </button>}

            {!token ? (
              <Link href={"/login"} className="text-gray-500 underline">
                Inicie sesion para agregar a carrito de compras!
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}

      <ProductsList />
    </div>
  );
}
