"use client";

import { API } from "@/api/requests";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAuthStore } from "../../stores/auth";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";

export default function profile() {
  const { token, clearToken } = useAuthStore();

  const router = useRouter();

  const { data: me } = useQuery(API.USERS.ME());

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearToken();
    router.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center gap-10 w-full bg-white min-h-screen pb-10 text-gray-800">
      <img
        className="absolute blur-lg m-auto w-full"
        src="/imgs/logo.png"
        alt=""
      />

      <Navbar />

      <div className="flex flex-col gap-5 bg-slate-100 border-2 shadow-2xl border-slate-200 text-blue-900 rounded-3xl p-10 z-10 mt-20">
        <h1 className="text-5xl mx-auto font-bold">Perfil</h1>

        <div className="text-3xl font-bold flex flex-col gap-2">
          <span>Nombre:</span>
          <span className="font-normal">{me?.name}</span>
        </div>
        <div className="text-3xl font-bold flex flex-col gap-2">
          <span>Email:</span>
          <span className="font-normal">{me?.email}</span>
        </div>
        <div className="text-3xl font-bold flex flex-col gap-2">
          <span>Fecha de registro:</span>
          <span className="font-normal">
            {new Date(me?.createdAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <button
          className="rounded-lg bg-red-400 text-white py-2 text-xl font-bold cursor-pointer active:scale-95 transition-all mt-5"
          onClick={handleLogout}
        >
          Cerrar sesion
        </button>
      </div>
    </div>
  );
}
