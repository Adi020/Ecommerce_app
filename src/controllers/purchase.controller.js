const catchError = require("../utils/catchError");
const Purchase = require("../models/Purchase");
const Cart = require("../models/Cart");
const Image = require("../models/Image");
const Product = require("../models/Product");
require("../models");

const getAll = catchError(async (req, res) => {
  const purchases = await Purchase.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: Product,
        include: [Image],
      },
    ],
  });
  return res.json(purchases);
});

const create = catchError(async (req, res) => {
  const cart = await Cart.findAll({
    where: { userId: req.user.id },
    attributes: ["userId", "productId", "quantity"],
    raw: true,
  });

  const purchases = await Purchase.bulkCreate(cart);

  await Cart.destroy({ where: { userId: req.user.id } });
  return res.json(purchases);
});
module.exports = {
  getAll,
  create,
};
