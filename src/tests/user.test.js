const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

let id;

let token;

test("/POST /users", async () => {
  const user = {
    firstName: "pepe",
    lastName: "pecas",
    email: "pica2345@hotmail.com",
    password: "12312",
    phone: "1233243241",
  };
  const res = await request(app).post("/users").send(user);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(user.firstName);
  expect(res.body.id).toBeDefined();
});

test("/POST /users/login", async () => {
  const user = {
    email: "pica2345@hotmail.com",
    password: "12312",
  };
  const res = await request(app).post("/users/login").send(user);
  token = res.body.token;
  expect(res.status).toBe(200);
  expect(res.body.token).toBeDefined();
});

test("/POST /users/login Must return incorrect credentials", async () => {
  const user = {
    email: "pica@hotmail.com",
    password: "2333",
  };
  const res = await request(app).post("/users/login").send(user);
  expect(res.status).toBe(401);
});

test("/GET /users", async () => {
  const res = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("/PUT /users/:id", async () => {
  const user = {
    firstName: "pepe updated",
  };
  const res = await request(app)
    .put(`/users/${id}`)
    .send(user)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(user.firstName);
});

test("/DELETE /users/:id", async () => {
  const res = await request(app)
    .delete(`/users/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
