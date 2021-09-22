const express = require("express");
const db = require("./db/connection");
const productsRouter = require("./src/routes/productsRouter");
const cartsRouter = require("./src/routes/cartsRouter");

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Variable provisioria para constrolar el acceso a ciertas rutas */
const administrador = true;
app.use("/", (req, res, next) => {
  req.auth = administrador;
  next();
});

app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartsRouter);

/* Ruta no implementada */
app.use("*", (req, res) => {
  const url = req.originalUrl;
  const method = req.method;
  res.json({
    error: 404,
    descripcion: `Ruta ${url}, método ${method} no implementada`
  });
});

app.listen(PORT, () => console.log(`Server escuchando en puerto ${PORT}`));
