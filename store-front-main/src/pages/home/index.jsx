import { Navbar } from "@/components/Navbar";
import Slider from "./components/Slider";
import ProductsList from "./components/ProductsList";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 w-full bg-white min-h-screen pb-10">
      <Navbar />
      <Slider />
      <ProductsList />
    </div>
  );
}
