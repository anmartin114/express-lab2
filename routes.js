const express = require("express");
const cartRoutes = express.Router();
const pool = require("./pg-connection-pool");

cartRoutes.get("/cart-items", (req, res) => {
  let sql = "SELECT * FROM shopping_cart";
  pool.query(sql).then(result => {
    res.json(result.rows);
  });
});

cartRoutes.get("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let sql = "SELECT * FROM shopping_cart WHERE id = $1::int";
  let params = [id];
  pool.query(sql, params).then(result => {
    if (result.rows.length !== 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404);
      res.send("not found");
    }
  });
});

cartRoutes.get("/shopping_cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const sql = "SELECT FROM shopping_cart WHERE id = $1::int";
  const params = [id];
  pool.query(sql, params).then(result => {
    if (result.rows.length === 0) {
      res.status(404);
      res.send(`ID ${id} not found`);
    } else {
      res.json(item);
    }
  });
});

cartRoutes.post("/shopping_cart", (req, res) => {
  const item = req.body;
  const sql = `INSERT INTO shopping_cart (product, price, quantity) VALUES ($1::INT)`;
});

cartRoutes.put("/shopping_cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = req.body;
  item.id = id;
  const index = cart.findIndex(i => i.id === id);
  cart.splice(index, 1, item);
  res.json(item);
  res.status(200);
});

cartRoutes.delete("/shopping_cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const sql = `DELETE FROM shopping_cart WHERE id = $1::INT`;
  const params = [id];
  pool.query(sql, params).then(result => {
    res.status(204);
  });
});

module.exports = cartRoutes;
