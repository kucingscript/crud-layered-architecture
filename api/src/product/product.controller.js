const express = require("express");

const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
} = require("./product.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = +req.params.id;
    const product = await getProductById(productId);

    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const productData = req.body;
    const product = await createProduct(productData);

    res.status(201).send({
      data: product,
      message: "create product success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = +req.params.id;
    await deleteProductById(productId);

    res.send("Product deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const productId = +req.params.id;
    const productData = req.body;

    if (
      !(
        productData.name &&
        productData.price &&
        productData.description &&
        productData.image
      )
    ) {
      return res.status(400).send("Some fields are missing");
    }

    const product = await editProductById(productId, productData);

    res.send({
      data: product,
      message: "update product success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = +req.params.id;
    const productData = req.body;

    const product = await editProductById(productId, productData);

    res.send({
      data: product,
      message: "update product success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
