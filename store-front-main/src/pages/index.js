"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home(params) {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  });

  return <h1>Hello</h1>;
}
