import "dotenv/config";
import mongoose from "mongoose";
import { Product } from "../../models/product.model.js";

const data = [
  {
    title: "Teclado Mecánico Inalámbrico",
    price: 119.99,
    description:
      "Teclado mecánico compacto con retroiluminación RGB y switches intercambiables.",
    category: ["Accesorios", "Teclados"],
    imgSrc:
      "https://m.media-amazon.com/images/I/61P7MvyRbUL._UF1000,1000_QL80_.jpg",
  },
  {
    title: "Mouse Gamer Pro X",
    price: 59.99,
    description:
      "Mouse gamer de alta precisión con DPI ajustable y diseño ergonómico.",
    category: ["Accesorios", "Ratones", "Gaming"],
    imgSrc: "https://m.media-amazon.com/images/I/51uy8gOG-iL.jpg",
  },
  {
    title: "Monitor 4K Ultra HD 27”",
    price: 329.99,
    description:
      "Monitor 4K UHD de 27 pulgadas con HDR10 y frecuencia de 144Hz.",
    category: ["Monitores"],
    imgSrc:
      "https://www.lg.com/content/dam/channel/wcms/ph/images/monitors/27us500-w(gallery)/ultrafine-27us500-gallery-01-2010.jpg/jcr:content/renditions/thum-1600x1062.jpeg",
  },
  {
    title: "Audífonos con Cancelación de Ruido",
    price: 199.99,
    description:
      "Audífonos Bluetooth con cancelación activa de ruido y 30 horas de batería.",
    category: ["Audio", "Accesorios"],
    imgSrc:
      "https://www.steren.com.sv/media/catalog/product/cache/0236bbabe616ddcff749ccbc14f38bf2/image/21867108a/audifonos-bluetooth-con-cancelacion-de-ruido-negros.jpg",
  },
  {
    title: "Docking Station USB-C",
    price: 89.99,
    description: "Estación de conexión con HDMI, USB 3.0 y puerto Ethernet.",
    category: ["Accesorios", "Adaptadores"],
    imgSrc: "https://m.media-amazon.com/images/I/71czw12TGJL.jpg",
  },
  {
    title: "Smartwatch X200",
    price: 249.99,
    description:
      "Reloj inteligente con GPS, monitor de ritmo cardíaco y batería de 7 días.",
    category: ["Wearables", "Dispositivos Inteligentes"],
    imgSrc:
      "https://m.media-amazon.com/images/I/41xOc4-VsoL._UF894,1000_QL80_.jpg",
  },
  {
    title: "SSD Portátil 1TB",
    price: 139.99,
    description:
      "Unidad SSD portátil de 1TB con velocidad ultrarrápida y resistencia a golpes.",
    category: ["Almacenamiento"],
    imgSrc: "https://m.media-amazon.com/images/I/51s4Et9AGHL.jpg",
  },
  {
    title: "Headset Gamer Mecánico",
    price: 89.99,
    description:
      "Auriculares gamer con sonido envolvente y micrófono desmontable.",
    category: ["Gaming", "Audio"],
    imgSrc:
      "https://kronosgaming.cl/wp-content/uploads/2021/10/Audifono-gamer-Kronos-Thunder-7.1-conexion-USB-alta-calidad-de-sonido-7.1-RGB-2.png",
  },
  {
    title: "Silla de Oficina Ergonómica",
    price: 229.99,
    description:
      "Silla ajustable con soporte lumbar, malla transpirable y función de inclinación.",
    category: ["Muebles", "Oficina"],
    imgSrc:
      "https://iseating.com.mx/cdn/shop/files/Silla_de_oficina_Ejecutiva_Caselli_C.jpg?v=1739427495&width=2048",
  },
  {
    title: "Tira de Luz LED Inteligente",
    price: 49.99,
    description:
      "Tira LED multicolor con control WiFi y compatibilidad con asistentes de voz.",
    category: ["Dispositivos Inteligentes", "Hogar"],
    imgSrc:
      "https://www.steren.com.sv/media/catalog/product/cache/0236bbabe616ddcff749ccbc14f38bf2/image/219077c6c/tira-led-wi-fi-multicolor-rgb-w-de-2-m.jpg",
  },
  {
    title: "Bocina Bluetooth Mini",
    price: 39.99,
    description:
      "Bocina portátil resistente al agua con graves potentes y 12 horas de batería.",
    category: ["Audio", "Portátiles"],
    imgSrc:
      "https://cdn.elchangarro.com.sv/image/uploads/ec/165360-bocina-bluetooth-mini-boombox-tws.jpg?quality=40&width=1000&height=1000",
  },
  {
    title: "Soporte para Laptop Pro",
    price: 69.99,
    description:
      "Soporte ajustable de aluminio para laptop, ideal para mejorar la ergonomía.",
    category: ["Accesorios", "Oficina"],
    imgSrc:
      "https://www.steren.com.sv/media/catalog/product/cache/0236bbabe616ddcff749ccbc14f38bf2/image/23087c936/soporte-metalico-para-laptop.jpg",
  },
  {
    title: "Smartphone G12",
    price: 799.99,
    description:
      "Smartphone con pantalla AMOLED, 5G y cámara triple de alta resolución.",
    category: ["Teléfonos"],
    imgSrc: "https://i.gadgets360cdn.com/large/moto_g71_1637241111470.jpg",
  },
  {
    title: "Cargador Inalámbrico Rápido",
    price: 29.99,
    description: "Base de carga inalámbrica compatible con dispositivos Qi.",
    category: ["Accesorios", "Cargadores"],
    imgSrc: "https://i.blogs.es/663ac6/base-anker/450_1000.jpg",
  },
  {
    title: "Monitor Curvo Gamer 34”",
    price: 599.99,
    description:
      "Monitor curvo de 34 pulgadas con 165Hz, ideal para juegos inmersivos.",
    category: ["Monitores", "Gaming"],
    imgSrc:
      "https://api.zonadigitalsv.com/storage/products/imagen_generada67f16772518c7.jpg",
  },
  {
    title: "Teclado Mecánico Low Profile",
    price: 99.99,
    description:
      "Teclado mecánico de bajo perfil con conexión Bluetooth y cable.",
    category: ["Teclados"],
    imgSrc:
      "https://api.zonadigitalsv.com/storage/products/imagen_generada67f16772518c7.jpg",
  },
  {
    title: "Disco Duro Externo 4TB",
    price: 129.99,
    description: "Disco duro externo de 4TB con USB 3.1 y diseño confiable.",
    category: ["Almacenamiento"],
    imgSrc:
      "https://api.zonadigitalsv.com/storage/products/imagen_generada667c307a8f5f0.jpg",
  },
  {
    title: "Hub Inteligente para el Hogar",
    price: 149.99,
    description:
      "Hub central para controlar múltiples dispositivos IoT desde una sola app.",
    category: ["Dispositivos Inteligentes", "Hogar"],
    imgSrc:
      "https://m.media-amazon.com/images/I/51RV8YSyJyL._UF894,1000_QL80_.jpg",
  },
  {
    title: "Gafas VR Pro",
    price: 399.99,
    description:
      "Visor de realidad virtual con resolución avanzada y sensores de movimiento.",
    category: ["Gaming", "VR"],
    imgSrc:
      "https://m.media-amazon.com/images/I/51X4q6WLnZL._UF894,1000_QL80_.jpg",
  },
  {
    title: "Auriculares In-Ear con Cancelación",
    price: 149.99,
    description:
      "Auriculares inalámbricos con cancelación de ruido y estuche de carga rápida.",
    category: ["Audio", "Portátiles"],
    imgSrc:
      "https://www.belkin.com/dw/image/v2/BGBH_PRD/on/demandware.static/-/Sites-master-product-catalog-blk/default/dw2de1c744/images/hi-res/7/7efb2ef09a76a118_AUC006_BLK_Belkin_SOUNDFORM_FlowNoiseCancellingEarbuds_SAP218_Hero_v01_WEB.jpg?sw=700&sh=700&sm=fit&sfrm=png",
  },
];

try {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.URI_MONGO);
  console.log("---------- Conected to DB successfully");

  await Product.deleteMany();
  console.log("---------- Products removed");

  for (let i = 0; i < data.length; i++) {
    let product = new Product(data[i]);
    await product.save();
  }
} catch (error) {
  console.log("Error de conexión a mongodb:" + error);
} finally {
  console.log("DONE!");
  mongoose.disconnect();
}
