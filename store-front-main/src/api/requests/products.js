import { ENDPOINTS } from "@/utils/constants/endpoints";
import { axiosInstance } from "../../../services/axios";
import { queryOptions } from "@tanstack/react-query";

export const PRODUCTS = {
  FIND_ALL: ({ categories }) => {
    let query = "";
    if (categories && categories.length > 0) {
      query = `?category=${categories.join(",")}`;
    }

    return queryOptions({
      queryKey: [ENDPOINTS.PRODUCT.FIND_ALL, query],
      queryFn: async ({ signal }) => {
        const res = await axiosInstance.get(
          ENDPOINTS.PRODUCT.FIND_ALL + query,
          {
            signal,
          }
        );
        return res.data;
      },
    });
  },
  FIND_BY_ID: ({ id }) => {
    return queryOptions({
      queryKey: [ENDPOINTS.PRODUCT.FIND_BY_ID, id],
      queryFn: async ({ signal }) => {
        const res = await axiosInstance.get(ENDPOINTS.PRODUCT.FIND_BY_ID + id, {
          signal,
        });
        return res.data;
      },
    });
  },
};
