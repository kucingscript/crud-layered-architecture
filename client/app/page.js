"use client";

// prettier-ignore
import { useCreateProduct, useDeleteProduct, useEditProduct,useFetchProducts } from "@/features/product";
// prettier-ignore
import { Button,  Container, FormControl, FormLabel, Input, Spinner, Table, Tbody, Td, Th, Thead, Tr, VStack, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { inputFields } from "@/constants";
import { inputFieldSchema } from "@/schemas";
import AlertProductValidation from "@/components/alertProductValidation";

export default function Home() {
  const toast = useToast();
  // prettier-ignore
  const { data: products, isLoading: productsIsLoading, refetch: refetchProducts } = useFetchProducts({
    onError: () => {
      toast({
        title: "Fetch Products Error",
        status: "error",
      });
    }
  });

  const { touched, errors, handleSubmit, values, setFieldValue, resetForm } =
    useFormik({
      initialValues: {
        id: 0,
        name: "",
        price: 0,
        description: "",
        image: "",
      },
      validationSchema: inputFieldSchema,
      onSubmit: () => {
        const { id, name, price, description, image } = values;

        if (id) {
          editProduct({ id, name, price, description, image });
        } else {
          createProduct({ name, price, description, image });
        }

        resetForm();
      },
    });

  const { mutate: createProduct, isLoading: createProductIsLoading } =
    useCreateProduct({
      onSuccess: () => {
        toast({
          title: "Product added",
          status: "success",
        });
        refetchProducts();
      },
      onError: () => {
        toast({
          title: "An error has occurred",
          status: "error",
        });
      },
    });

  const { mutate: deleteProduct } = useDeleteProduct({
    onSuccess: () => {
      refetchProducts();
    },
  });

  const { mutate: editProduct, isLoading: updateProductIsLoading } =
    useEditProduct({
      onSuccess: () => {
        toast({
          title: "Product updated",
          status: "success",
        });
        refetchProducts();
      },
      onError: () => {
        toast({
          title: "Product ID missmatch",
          status: "error",
        });
      },
    });

  const handleFormInput = (event) => {
    setFieldValue(event.target.name, event.target.value);
  };

  const confirmationDelete = (productId) => {
    const shouldDelete = confirm(
      "Are you sure want to delete product id " + productId
    );

    if (shouldDelete) {
      deleteProduct(productId);
      toast({
        title: "Product deleted",
        status: "info",
      });
    }
  };

  const onEditClick = (product) => {
    setFieldValue("id", product.id);
    setFieldValue("name", product.name);
    setFieldValue("price", product.price);
    setFieldValue("description", product.description);
    setFieldValue("image", product.image);
  };

  const renderProducts = () => {
    return products?.data.map((product) => (
      <Tr key={product.id}>
        <Td>{product.id}</Td>
        <Td>{product.name}</Td>
        <Td>{product.price}</Td>
        <Td>{product.description}</Td>
        <Td>{product.image}</Td>
        <Td>
          <Button
            onClick={() => onEditClick(product)}
            colorScheme="teal"
            marginRight={1}
          >
            Edit
          </Button>
          <Button
            onClick={() => confirmationDelete(product.id)}
            colorScheme="red"
          >
            Delete
          </Button>
        </Td>
      </Tr>
    ));
  };

  return (
    <main>
      <Container maxW="container.lg">
        <Table mb={5}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>Description</Th>
              <Th>Image</Th>
              <Th colSpan={2}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {renderProducts()}
            {productsIsLoading && (
              <Tr>
                <Td>
                  <Spinner />
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>

        <form onSubmit={handleSubmit} autoComplete="off">
          <VStack spacing={3}>
            {inputFields.map((input, idx) => {
              return (
                <FormControl key={`formcontrol-${idx}`}>
                  <FormLabel>{input.label}</FormLabel>
                  <Input
                    onChange={handleFormInput}
                    variant={"filled"}
                    placeholder={input.placeholder}
                    type={input.type}
                    name={input.name}
                    value={values[input.name]}
                    required
                  />
                  {errors[input.name] && touched[input.name] && (
                    <AlertProductValidation
                      title={"Erors"}
                      description={errors[input.name]}
                    />
                  )}
                </FormControl>
              );
            })}
            {createProductIsLoading || updateProductIsLoading ? (
              <Spinner />
            ) : (
              <Button type="submit">Submit Product</Button>
            )}
          </VStack>
        </form>
      </Container>
    </main>
  );
}
