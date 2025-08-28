import { Navbar } from "@/components/Navbar";
import { useRouter } from "next/router";
import ProductsList from "../home/components/ProductsList";

export default function GetByCategory() {
  const router = useRouter();
  const { id: category } = router.query;

  return (
    <div className="flex flex-col gap-10 w-full bg-white h-screen">
      <Navbar />

      <h1 className="mx-auto text-5xl text-blue-900 font-bold">
        {category?.toUpperCase()}
      </h1>

      <ProductsList categories={[category]} />
    </div>
  );
}
