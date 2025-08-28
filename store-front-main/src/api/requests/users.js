import { ENDPOINTS } from "@/utils/constants/endpoints";
import { axiosInstance } from "../../../services/axios";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

export const USERS = {
  FIND_ALL: () => {
    return queryOptions({
      queryKey: [ENDPOINTS.USER.FIND_ALL],
      queryFn: async ({ signal }) => {
        const res = await axiosInstance.get(ENDPOINTS.USER.FIND_ALL, {
          signal,
        });
        return res.data;
      },
    });
  },
  ME: () => {
    return queryOptions({
      queryKey: [ENDPOINTS.USER.ME],
      queryFn: async ({ signal }) => {
        const res = await axiosInstance.get(ENDPOINTS.USER.ME, {
          signal,
        });
        return res.data;
      },
    });
  },
  LOGIN: () => {
    return mutationOptions({
      mutationKey: [ENDPOINTS.USER.LOGIN],
      mutationFn: async (payload) => {
        const res = await axiosInstance.post(ENDPOINTS.USER.LOGIN, payload);
        return res.data;
      },
    });
  },
  REGISTER: () => {
    return mutationOptions({
      mutationKey: [ENDPOINTS.USER.REGISTER],
      mutationFn: async (payload) => {
        const res = await axiosInstance.post(ENDPOINTS.USER.REGISTER, payload);
        return res.data;
      },
    });
  },
  ADD_TO_CART: () => {
    return mutationOptions({
      mutationKey: [ENDPOINTS.USER.ADD_TO_CART],
      mutationFn: async (payload) => {
        const res = await axiosInstance.patch(
          ENDPOINTS.USER.ADD_TO_CART,
          payload
        );
        return res.data;
      },
    });
  },
  REMOVE_FROM_CART: () => {
    return mutationOptions({
      mutationKey: [ENDPOINTS.USER.REMOVE_FROM_CART],
      mutationFn: async (payload) => {
        const res = await axiosInstance.patch(
          ENDPOINTS.USER.REMOVE_FROM_CART,
          payload
        );
        return res.data;
      },
    });
  },
  CLEAR_CART: () => {
    return mutationOptions({
      mutationKey: [ENDPOINTS.USER.CLEAR_CART],
      mutationFn: async (payload) => {
        const res = await axiosInstance.patch(
          ENDPOINTS.USER.CLEAR_CART,
          payload
        );
        return res.data;
      },
    });
  },
};
