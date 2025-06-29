module.exports = app => {
  const products = require("../controllers/productController.js");

  // Create a new Product
  app.post("/api/products", products.create);

  // Retrieve all Products
  app.get("/api/products", products.findAll);

  // Retrieve a single Product with productId
  app.get("/api/products/:productId", products.findOne);

  // Update a Product with productId
  app.put("/api/products/:productId", products.update);

  // Delete a Product with productId
  app.delete("/api/products/:productId", products.remove);
};


/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         category:
 *           type: string
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product created
 */
// Repeat for other endpoints (GET, PUT, DELETE)
