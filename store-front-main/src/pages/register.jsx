import FormItem from "@/components/FormItem";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthStore } from "../../stores/auth";
import { API } from "@/api/requests";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function Register() {
  const router = useRouter();

  const { setToken } = useAuthStore();

  const [missmatchCredentials, setMissmatchCredentials] = useState(false);

  const { mutate: register, isError } = useMutation(API.USERS.REGISTER());

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());

    if (data.password !== data.repeatPassword) {
      setMissmatchCredentials(true);
      return;
    }

    register(data, {
      onSuccess: (data) => {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        router.push("/post-register");
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
        <h1 className="text-5xl font-bold">Cree una cuenta</h1>

        <FormItem label={"Nombre"} name="name" placeholder={"Nombre..."} />
        <FormItem label={"Email"} name="email" placeholder={"Email..."} />
        <FormItem
          label={"Contraseña"}
          name="password"
          placeholder={"Contraseña..."}
        />
        <FormItem
          label={"Repita Contraseña"}
          name="repeatPassword"
          placeholder={"Repita Contraseña..."}
        />

        {missmatchCredentials ? (
          <div className="text-red-500">La contraseña debe ser la misma</div>
        ) : null}

        {isError ? (
          <div className="text-red-500">Algo salio mal intente mas tarde</div>
        ) : null}

        <button
          type="submit"
          className="w-full bg-cyan-600 py-2 text-center font-bold text-xl rounded-lg text-white cursor-pointer active:scale-95 transition-transform"
        >
          Inicie Sesion
        </button>
        <Link href={"/login"} className="text-blue-400 underline">
          Ya tiene cuenta? Inicie sesion
        </Link>
      </form>
    </div>
  );
}
