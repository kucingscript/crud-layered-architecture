import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteProduct = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (productId) => {
      const productResponse = await axiosInstance.delete(
        `/products/${productId}`
      );
      return productResponse;
    },
    onSuccess,
  });
};
