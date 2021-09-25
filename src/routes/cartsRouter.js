const router = require("express").Router();
const cartsController = require("../controllers/cartsController");

router.post("/", cartsController.createCart);
router.post("/:id/productos", cartsController.addProductToCart);
router.get("/:id/productos", cartsController.getCartProducts);
router.delete("/:id", cartsController.deleteCart);
router.delete("/:id/productos/:id_prod", cartsController.deleteCartProduct);

module.exports = router;
