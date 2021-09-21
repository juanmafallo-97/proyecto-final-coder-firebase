const express = require("express");
const db = require("./db/connection");
const productsRouter = require("./src/routes/productsRouter");
const cartsRouter = require("./src/routes/cartsRouter");

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartsRouter);

app.listen(PORT, () => console.log(`Server escuchando en puerto ${PORT}`));
