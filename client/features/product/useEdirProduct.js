import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useEditProduct = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const productResponse = await axiosInstance.patch(
        `/products/${body.id}`,
        body
      );
      return productResponse;
    },
    onSuccess,
    onError,
  });
};
