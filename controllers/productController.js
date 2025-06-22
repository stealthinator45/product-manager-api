const Product = require("../models/product.model.js");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request BEFORE accessing req.body properties
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Product
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category
  });

  // Save Product in the database
  Product.create(product, (err, data) => {
    if (err)
      return res.status(500).send({
        message: "Some error occurred while creating the Product."
      });
    res.status(200).send(data);
  });
};

// Retrieve all Products from the database
exports.findAll = (req, res) => {
  Product.getAll((err, data) => {
    if (err)
      return res.status(500).send({
        message: "Some error occurred while retrieving products."
      });
    res.status(200).send(data);
  });
};

// Find a single Product with a productId
exports.findOne = (req, res) => {
  Product.findById(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Not found Product with id ${req.params.productId}.`
        });
      } else {
        return res.status(500).send({
          message: "Error retrieving Product with id " + req.params.productId
        });
      }
    } else res.status(200).send(data);
  });
};

// Update a Product identified by the productId in the request
exports.update = (req, res) => {
  // Validate Request BEFORE accessing req.body properties
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Product.updateById(
    req.params.productId,
    new Product(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({
            message: `Not found Product with id ${req.params.productId}.`
          });
        } else {
          return res.status(500).send({
            message: "Error updating Product with id " + req.params.productId
          });
        }
      } else res.status(200).send(data);
    }
  );
};

// Delete a Product with the specified productId in the request
exports.remove = (req, res) => {
  Product.remove(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Not found Product with id ${req.params.productId}.`
        });
      } else {
        return res.status(500).send({
          message: "Could not delete Product with id " + req.params.productId
        });
      }
    } else res.status(200).send({ message: `Product was deleted successfully!` });
  });
};
