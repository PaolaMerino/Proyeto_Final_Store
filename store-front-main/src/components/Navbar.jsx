import { NavMenuLink } from "./NavMenuLink";
import { useAuthStore } from "../../stores/auth";
import Link from "next/link";
import CartIcon from "@/assets/icons/CartIcon";
import { useCartStore } from "../../stores/cartStore";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/api/requests";
import { useEffect } from "react";

export function Navbar() {
  const { token } = useAuthStore();

  const { cart } = useCartStore();

  const { data: me } = useQuery(API.USERS.ME());

  useEffect(() => {
    if (me && me.cart) {
      // Assuming me.cart is the cart data from the server
      useCartStore.getState().setCart(me.cart);
    }
  }, [me]);

  return (
    <div className="w-full bg-blue-900 flex justify-between items-center p-4 z-10">
      {/* Left Side */}
      <Link href={"/home"} className="flex gap-4 items-center">
        <img
          className="w-[170px] h-[100px]"
          src="/imgs/logo.png"
          alt="logo"
          priority="false"
        ></img>
      </Link>

      {/* Right side */}
      <section className="flex gap-4 items-center">
        <NavMenuLink href={"/home"} label={"Inicio"} />
        <NavMenuLink href={"/categories"} label={"Categorias"} />
        <NavMenuLink href={"/clients"} label={"Clientes"} />

        <Link
          className=" overflow-hidden flex flex-col items-center gap-2"
          href={token ? "/profile" : "/login"}
        >
          <div>
            <img
              className="w-[60px] h-[60px] rounded-full"
              src={"/imgs/user-placeholder.jpg"}
              alt="user"
            />
          </div>

          {token ? (
            <span className="bg-blue-600 px-2 py-1 text-white text-xs font-bold rounded-xl">
              Sesion activa
            </span>
          ) : (
            <span className="bg-red-600 px-2 py-1 text-white text-xs font-bold rounded-xl">
              Sin sesion
            </span>
          )}
        </Link>

        {token ? (
          <Link
            className="rounded-2xl flex flex-col items-center gap-2 text-white"
            href={"/cart"}
          >
            <CartIcon size={70} />

            <span className="bg-white rounded-lg px-2 py-0 text-center text-gray-900">
              + {cart.length}
            </span>
          </Link>
        ) : null}
      </section>
    </div>
  );
}
