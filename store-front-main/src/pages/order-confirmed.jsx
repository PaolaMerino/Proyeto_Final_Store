import { Navbar } from "@/components/Navbar";
import Link from "next/link";

export default function OrderConfirmed() {
  return (
    <div className="flex flex-col gap-10 w-full bg-blue-900 min-h-screen">
      <Navbar />
      <img
        className="absolute blur-lg m-auto w-full"
        src="/imgs/logo.png"
        alt=""
      />

      <div className="mx-auto px-10 flex flex-col gap-10 py-10 bg-slate-100 border-2 shadow-2xl mt-20 border-slate-200 text-gray-800 rounded-3xl z-20">
        <h1 className="text-5xl font-bold">Tu orden ha sido procesada!</h1>
        <Link
          href="/home"
          className="w-full bg-cyan-600 py-2 text-center font-bold text-xl rounded-lg text-white cursor-pointer active:scale-95 transition-transform"
        >
          Seguir comprando!
        </Link>
      </div>
    </div>
  );
}
