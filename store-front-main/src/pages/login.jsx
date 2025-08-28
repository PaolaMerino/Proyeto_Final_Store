import { API } from "@/api/requests";
import FormItem from "@/components/FormItem";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthStore } from "../../stores/auth";

export default function Login() {
  const router = useRouter();

  const { setToken } = useAuthStore();

  const { mutate: login, isError } = useMutation(API.USERS.LOGIN());

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());

    login(data, {
      onSuccess: (data) => {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        router.push("/home");
      },
      onError: () => {
        console.log("Failed");
      },
    });
  };

  return (
    <div className="flex flex-col gap-10 w-full bg-blue-900 min-h-screen">
      <img
        className="absolute blur-lg m-auto w-full"
        src="/imgs/logo.png"
        alt=""
      />

      <Link
        href={"/home"}
        className="border border-white text-white rounded-lg font-bold text-lg px-4 py-2 m-4 w-fit cursor-pointer z-20"
      >
        Inicio
      </Link>

      <form
        className="mx-auto px-10 flex flex-col gap-10 py-10 bg-slate-100 border-2 shadow-2xl border-slate-200 text-gray-800 rounded-3xl z-20"
        onSubmit={handleSubmit}
      >
        <h1 className="text-5xl font-bold">Inicie Sesion</h1>

        <FormItem label={"Email"} name="email" placeholder={"Email..."} />

        <FormItem
          label={"Contraseña"}
          name="password"
          placeholder={"Contraseña..."}
        />

        {isError ? <div className="text-red-500">Credenciales erroneas</div> : null}

        <button
          type="submit"
          className="w-full bg-cyan-600 py-2 text-center font-bold text-xl rounded-lg text-white cursor-pointer active:scale-95 transition-transform"
        >
          Inicie Sesion
        </button>
        <Link href={"/register"} className="text-blue-400 underline">
          Aun no tienes cuenta? Registrate
        </Link>
      </form>
    </div>
  );
}
