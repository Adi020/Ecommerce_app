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

test("/GET /products", async () => {
  const res = await request(app).get("/products");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("/POST /product", async () => {
  const product = {
    title: "samsung tv",
    description: "tv samsung 64",
    brand: "samsung",
    price: 2000.22,
    categoryId: 3,
  };
  const res = await request(app)
    .post("/products")
    .send(product)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.title).toBe(product.title);
});

test("/GET /products/:id", async () => {
  const res = await request(app).get(`/products/${id}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Object);
});

test("/PUT /products/:id", async () => {
  const product = {
    title: "samsung tv updated",
  };
  const res = await request(app)
    .put(`/products/${id}`)
    .send(product)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.title).toBe(product.title);
});

test("/DELETE /products/:id", async () => {
  const res = await request(app)
    .delete(`/products/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
