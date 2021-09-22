const router = require("express").Router();
const productsController = require("../controllers/productsController");

router.get("/:id?", productsController.getProducts);
router.post("/", productsController.saveProduct);
router.put("/:id", productsController.updateProduct);
router.delete("/:id", productsController.deleteProduct);

module.exports = router;
