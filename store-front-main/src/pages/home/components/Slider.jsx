import Image from "next/image";
import { useEffect } from "react";

export default function Slider() {
  const SRC_IMGS = [
    "/imgs/slider-1.jpeg",
    "/imgs/slider-2.jpeg",
    "/imgs/slider-3.jpeg",
    "/imgs/slider-4.jpeg",
  ];

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      const imgElement = document.getElementById("slider-img");

      if (imgElement) {
        imgElement.src = SRC_IMGS[index];
        index = (index + 1) % SRC_IMGS.length;
      }
    }, 3000);

    return () => clearInterval(interval);
  });

  return (
    <div className="w-[90%] max-w-[600px] h-[300px] mx-auto">
      <img
        className="w-full h-full object-cover rounded-lg"
        id="slider-img"
        src="/imgs/slider-1.jpeg"
        alt="logo"
        priority="true"
      ></img>
    </div>
  );
}
