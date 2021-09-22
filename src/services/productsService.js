const db = require("../../db/connection");

const query = db.collection("products");

const getProductById = async (id) => {
  try {
    const response = await query.doc(id).get();
    if (!response.data()) throw new Error(`No product found with id ${id}`);
    const product = { id: response.id, ...response.data() };
    return product;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllProducts = async () => {
  try {
    const response = await query.get();
    const products = response.docs.map((product) => ({
      id: product.id,
      ...product.data()
    }));
    return products;
  } catch (error) {
    throw new Error(error);
  }
};

const createProduct = async (product) => {
  try {
    const timestamp = Date.now();
    const { id } = await query.add({ timestamp, ...product });
    return id;
  } catch (error) {
    throw new Error(error);
  }
};

const updateProduct = async (id, productData) => {
  try {
    const product = query.doc(id);
    await product.update(productData);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const product = query.doc(id);
    await product.delete();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
