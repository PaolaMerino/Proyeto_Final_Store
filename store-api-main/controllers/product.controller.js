import { ERROR_MESSAGES } from "../config/constants.js";
import {
  createService,
  deleteService,
  findAllService,
  findByIdService,
  updateService,
} from "../services/product.service.js";

export const create = async (req, res) => {
  try {
    const product = await createService(req.body);

    return res.status(200).json(product);
  } catch (error) {
    switch (error.message) {
      case ERROR_MESSAGES.NEGATIVE_PRICE:
        return res.status(403).json({ error: ERROR_MESSAGES.NEGATIVE_PRICE });

      default:
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const findAll = async (req, res) => {
  try {
    const products = await findAllService(req.query);

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const findById = async (req, res) => {
  try {
    const product = await findByIdService(req.params.id);

    return res.status(200).json(product);
  } catch (error) {
    switch (error.message) {
      case ERROR_MESSAGES.PRODUCT_NOT_FOUND:
        return res
          .status(403)
          .json({ error: ERROR_MESSAGES.PRODUCT_NOT_FOUND });

      default:
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const update = async (req, res) => {
  try {
    const product = await updateService(req.params.id, req.body);

    return res.status(200).json(product);
  } catch (error) {
    switch (error.message) {
      case ERROR_MESSAGES.PRODUCT_NOT_FOUND:
        return res
          .status(403)
          .json({ error: ERROR_MESSAGES.PRODUCT_NOT_FOUND });

      default:
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const remove = async (req, res) => {
  try {
    await deleteService(req.params.id);

    return res.status(204).send({ message: "Product deleted successfully" });
  } catch (error) {
    switch (error.message) {
      case ERROR_MESSAGES.PRODUCT_NOT_FOUND:
        return res
          .status(403)
          .json({ error: ERROR_MESSAGES.PRODUCT_NOT_FOUND });

      default:
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
