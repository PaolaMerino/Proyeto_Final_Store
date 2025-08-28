import { Navbar } from "@/components/Navbar";
import { PRODUCT_CATEGORIES } from "@/utils/constants";
import Link from "next/link";

export default function Categories() {
  return (
    <div className="flex flex-col gap-10 w-full bg-white h-screen">
      <Navbar />

      <div className="w-full flex flex-wrap justify-evenly px-10 h-full">
        {PRODUCT_CATEGORIES.map((categorie) => {
          return (
            <Link
              href={`/categories/${categorie}`}
              key={categorie}
              className="bg-blue-900 rounded-2xl h-[100px] w-[250px] px-2 py-1 text-center border flex justify-center items-center text-2xl font-bold hover:bg-blue-600"
            >
              {categorie}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
