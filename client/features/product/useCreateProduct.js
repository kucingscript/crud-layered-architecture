import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateProduct = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const productResponse = await axiosInstance.post("/products", body);
      return productResponse;
    },
    onSuccess,
    onError,
  });
};
