import { ERROR_MESSAGES } from "../config/constants.js";
import { Product } from "../models/product.model.js";

export const createService = async (data) => {
  const { title, price, description, category } = data;

  if (price < 0) throw new Error(ERROR_MESSAGES.NEGATIVE_PRICE);

  let product = new Product({ title, price, description, category });
  await product.save();

  return { product, message: "Product created successfully" };
};

export const findAllService = async (queryParams) => {
  const { category } = queryParams;

  let filters = {};
  if (category) filters.category = { $in: category };

  const products = await Product.find(filters).sort({ createdAt: -1 });
  return products;
};

export const findByIdService = async (id) => {
  const product = await Product.findById(id);

  if (!product) throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);

  return product;
};

export const updateService = async (id, data) => {
  const { title, price, description, category } = data;

  if (price < 0) throw new Error(ERROR_MESSAGES.NEGATIVE_PRICE);

  let product = await Product.findByIdAndUpdate(
    id,
    { title, price, description, category },
    { new: true }
  );

  if (!product) throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);

  return product;
};

export const deleteService = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);

  return { message: "Product deleted successfully" };
};
