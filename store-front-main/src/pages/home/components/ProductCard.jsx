import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product?._id}`}
      className="w-[200px] h-[300px] border border-gray-200 rounded-lg overflow-hidden flex flex-col"
    >
      {/* <Image className="w-full" height={150} width={130} src={product?.imgSrc} /> */}
      <img className="w-full h-[200px]" src={product?.imgSrc} alt="product?-image" />

      <div className="p-2 flex flex-col justify-between flex-1">
        <h3 className="text-lg text-gray-600 font-semibold">{product?.title}</h3>
        <p className="text-blue-600 font-bold">${product?.price}</p>
      </div>
    </Link>
  );
}
