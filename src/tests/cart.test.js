const request = require("supertest");
const app = require("../app");
require("../models");

let id;
let token;

beforeAll(async () => {
  const login = {
    email: "test@gmail.com",
    password: "test123",
  };
  const res = await request(app).post("/users/login").send(login);
  token = res.body.token;
});

test("/GET /cart", async () => {
  const res = await request(app)
    .get("/cart")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("/POST /cart", async () => {
  const productCart = {
    quantity: 3,
  };
  const res = await request(app)
    .post("/cart")
    .send(productCart)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.quantity).toBe(productCart.quantity);
});

test("/PUT /cart/:id", async () => {
  const product = {
    quantity: 4,
  };
  const res = await request(app)
    .put(`/cart/${id}`)
    .send(product)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.quantity).toBe(product.quantity);
});

test("/DELETE /cart/:id", async () => {
  const res = await request(app)
    .delete(`/cart/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
