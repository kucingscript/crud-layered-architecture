import * as yup from "yup";

export const inputFieldSchema = yup.object().shape({
  id: yup.number().moreThan(-1),
  name: yup
    .string()
    .min(3, "Product name must be at least 3 characters long")
    .required("Required"),
  price: yup.number().positive().integer().required("Required"),
  description: yup
    .string()
    .min(5, "Product description must be at least 3 characters long")
    .required("Required"),
  image: yup
    .string()
    .min(3, "Product image must be at least 3 characters long")
    .required("Required"),
});
