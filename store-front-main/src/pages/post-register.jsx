import Link from "next/link";

export default function PostRegister() {
  return (
    <div className="flex flex-col gap-10 w-full bg-blue-900 min-h-screen">
      <img
        className="absolute blur-lg m-auto w-full"
        src="/imgs/logo.png"
        alt=""
      />

      <div className="mx-auto px-10 flex flex-col gap-10 py-10 bg-slate-100 border-2 shadow-2xl mt-20 border-slate-200 text-gray-800 rounded-3xl z-20">
        <h1 className="text-5xl font-bold">Cuenta creada con exito!</h1>
        <p className="text-lg">Ya puede iniciar sesion con sus credenciales</p>
        <Link
          href="/login"
          className="w-full bg-cyan-600 py-2 text-center font-bold text-xl rounded-lg text-white cursor-pointer active:scale-95 transition-transform"
        >
          Inicie Sesion
        </Link>
      </div>
    </div>
  );
}
