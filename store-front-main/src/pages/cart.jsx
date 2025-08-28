import { Navbar } from "@/components/Navbar";
import { useCartStore } from "../../stores/cartStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/api/requests";
import { ENDPOINTS } from "@/utils/constants/endpoints";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Cart() {
  const { cart } = useCartStore();

  const quertyClient = useQueryClient();

  const router = useRouter();

  const { mutate: removeFromCart } = useMutation(API.USERS.REMOVE_FROM_CART());

  const { mutate: clearCart } = useMutation(API.USERS.CLEAR_CART());

  const handleRemoveCartItem = (productId) => {
    removeFromCart(
      { productId },
      {
        onSuccess: () => {
          quertyClient.invalidateQueries({ queryKey: [ENDPOINTS.USER.ME] });
        },
      }
    );
  };

  const handleBuy = () => {
    clearCart(
      {},
      {
        onSuccess: () => {
          quertyClient.invalidateQueries({ queryKey: [ENDPOINTS.USER.ME] });
          router.push("/order-confirmed");
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-10 w-full bg-white text-gray-600 min-h-screen pb-10">
      <Navbar />

      <h1 className="font-bold text-5xl mx-auto mt-10">Carrito de Compras</h1>

      <div className="flex flex-col gap-5 mx-auto w-full max-w-[800px]">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">El carrito está vacío.</p>
        ) : (
          cart.map((cartItem) => {
            const product = cartItem.productId;

            return (
              <div
                key={product._id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div className="flex gap-2 items-center">
                  <img className="w-30 h-30" src={product.imgSrc} alt="" />
                  <div>
                    <h2 className="font-semibold text-lg">{product.title}</h2>
                    <p className="text-sm text-gray-500">
                      Precio: ${product.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      Cantidad: {product.quantity}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-bold">
                    ${(product.price * cartItem.quantity).toFixed(2)}
                  </p>
                  <button
                    className="bg-red-500 px-2 py-1 rounded-lg text-white cursor-pointer active:scale-95 transition-transform"
                    onClick={() => handleRemoveCartItem(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <button
        className="bg-blue-900 w-[300px] mx-auto rounded-lg py-2 text-center text-4xl font-bold text-white cursor-pointer active:scale-95 transition-transform"
        onClick={handleBuy}
      >
        Comprar!
      </button>
    </div>
  );
}
