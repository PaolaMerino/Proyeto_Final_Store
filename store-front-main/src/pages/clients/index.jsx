import { Navbar } from "@/components/Navbar";
import CustomersList from "./components/CustomersList";

export default function Clients() {
  return (
    <div className="flex flex-col gap-10 w-full bg-white min-h-screen">
      <Navbar />

      <CustomersList />
    </div>
  );
}
