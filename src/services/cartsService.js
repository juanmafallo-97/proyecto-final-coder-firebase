const admin = require("firebase-admin");
const db = require("../../db/connection");
const productsService = require("./productsService");

const query = db.collection("carts");

const createCart = async () => {
  try {
    const { id } = await query.add({ productos: [] });
    return id;
  } catch (err) {
    throw new Error(err);
  }
};

const addProductToCart = async (cartId, productId) => {
  try {
    const cart = query.doc(cartId);
    const product = await productsService.getProductById(productId);
    await cart.update({
      productos: admin.firestore.FieldValue.arrayUnion(product)
    });
  } catch (err) {
    throw new Error(err);
  }
};

const getCartProducts = async (id) => {
  try {
    const response = await query.doc(id).get();
    if (!response.data()) throw new Error(`El carrito con id ${id} no existe`);
    const cartProducts = response.data().productos;
    return cartProducts;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteCart = async (id) => {
  try {
    const cart = query.doc(id);
    await cart.delete();
  } catch (err) {
    throw new Error(err);
  }
};

const deleteCartProduct = async (cartId, productId) => {
  try {
    const cart = query.doc(cartId);
    const product = await productsService.getProductById(productId);
    await cart.update({
      productos: admin.firestore.FieldValue.arrayRemove(product)
    });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createCart,
  addProductToCart,
  getCartProducts,
  deleteCart,
  deleteCartProduct
};
