const Product = require('../../models/product.model');
const db = require('../../config/db');

describe('Product Model - Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('create()', () => {
    test('should insert and return new product with id', done => {
      db.query = jest.fn((sql, params, callback) => {
        callback(null, { insertId: 99 });
      });

      const productData = { 
        name: 'Test Product', 
        description: 'Test Description',
        price: 49.99,
        category: 'Test Category'
      };

      Product.create(productData, (err, data) => {
        expect(err).toBeNull();
        expect(data.id).toBe(99);
        expect(data.name).toBe('Test Product');
        expect(db.query).toHaveBeenCalledWith(
          "INSERT INTO products SET ?", 
          productData, 
          expect.any(Function)
        );
        done();
      });
    });

    test('should handle database errors during creation', done => {
      db.query = jest.fn((sql, params, callback) => {
        callback(new Error('Database connection failed'), null);
      });

      const productData = { name: 'Test Product' };

      Product.create(productData, (err, data) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Database connection failed');
        expect(data).toBeNull();
        done();
      });
    });
  });

  describe('findById()', () => {
    test('should return product when found', done => {
      const mockProduct = {
        id: 1,
        name: 'Found Product',
        description: 'Found Description',
        price: 99.99,
        category: 'Electronics'
      };

      db.query = jest.fn((sql, callback) => {
        callback(null, [mockProduct]);
      });

      Product.findById(1, (err, data) => {
        expect(err).toBeNull();
        expect(data).toEqual(mockProduct);
        expect(db.query).toHaveBeenCalledWith(
          "SELECT * FROM products WHERE id = 1",
          expect.any(Function)
        );
        done();
      });
    });

    test('should return not_found error when product does not exist', done => {
      db.query = jest.fn((sql, callback) => {
        callback(null, []);
      });

      Product.findById(999, (err, data) => {
        expect(err).toEqual({ kind: "not_found" });
        expect(data).toBeNull();
        done();
      });
    });

    test('should handle database errors during findById', done => {
      db.query = jest.fn((sql, callback) => {
        callback(new Error('Database error'), null);
      });

      Product.findById(1, (err, data) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Database error');
        expect(data).toBeNull();
        done();
      });
    });
  });

  describe('getAll()', () => {
    test('should return all products', done => {
      const mockProducts = [
        { id: 1, name: 'Product 1', price: 10.99 },
        { id: 2, name: 'Product 2', price: 20.99 },
        { id: 3, name: 'Product 3', price: 30.99 }
      ];

      db.query = jest.fn((sql, callback) => {
        callback(null, mockProducts);
      });

      Product.getAll((err, data) => {
        expect(err).toBeNull();
        expect(data).toEqual(mockProducts);
        expect(data).toHaveLength(3);
        expect(db.query).toHaveBeenCalledWith(
          "SELECT * FROM products",
          expect.any(Function)
        );
        done();
      });
    });

    test('should return empty array when no products exist', done => {
      db.query = jest.fn((sql, callback) => {
        callback(null, []);
      });

      Product.getAll((err, data) => {
        expect(err).toBeNull();
        expect(data).toEqual([]);
        expect(data).toHaveLength(0);
        done();
      });
    });

    test('should handle database errors during getAll', done => {
      db.query = jest.fn((sql, callback) => {
        callback(new Error('Connection timeout'), null);
      });

      Product.getAll((err, data) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Connection timeout');
        expect(data).toBeNull();
        done();
      });
    });
  });

  describe('updateById()', () => {
    test('should update product and return updated data', done => {
      const updatedProduct = {
        name: 'Updated Product',
        description: 'Updated Description',
        price: 199.99,
        category: 'Updated Category'
      };

      db.query = jest.fn((sql, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      Product.updateById(1, updatedProduct, (err, data) => {
        expect(err).toBeNull();
        expect(data.id).toBe(1);
        expect(data.name).toBe('Updated Product');
        expect(db.query).toHaveBeenCalledWith(
          "UPDATE products SET name = ?, description = ?, price = ?, category = ? WHERE id = ?",
          [updatedProduct.name, updatedProduct.description, updatedProduct.price, updatedProduct.category, 1],
          expect.any(Function)
        );
        done();
      });
    });

    test('should return not_found error when product to update does not exist', done => {
      const updatedProduct = { name: 'Updated Product' };

      db.query = jest.fn((sql, params, callback) => {
        callback(null, { affectedRows: 0 });
      });

      Product.updateById(999, updatedProduct, (err, data) => {
        expect(err).toEqual({ kind: "not_found" });
        expect(data).toBeNull();
        done();
      });
    });

    test('should handle database errors during update', done => {
      const updatedProduct = { name: 'Updated Product' };

      db.query = jest.fn((sql, params, callback) => {
        callback(new Error('Update failed'), null);
      });

      Product.updateById(1, updatedProduct, (err, data) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Update failed');
        expect(data).toBeNull();
        done();
      });
    });
  });

  describe('remove()', () => {
    test('should delete product successfully', done => {
      db.query = jest.fn((sql, params, callback) => {
        callback(null, { affectedRows: 1 });
      });

      Product.remove(1, (err, data) => {
        expect(err).toBeNull();
        expect(data).toEqual({ affectedRows: 1 });
        expect(db.query).toHaveBeenCalledWith(
          "DELETE FROM products WHERE id = ?",
          1,
          expect.any(Function)
        );
        done();
      });
    });

    test('should return not_found error when product to delete does not exist', done => {
      db.query = jest.fn((sql, params, callback) => {
        callback(null, { affectedRows: 0 });
      });

      Product.remove(999, (err, data) => {
        expect(err).toEqual({ kind: "not_found" });
        expect(data).toBeNull();
        done();
      });
    });

    test('should handle database errors during deletion', done => {
      db.query = jest.fn((sql, params, callback) => {
        callback(new Error('Delete operation failed'), null);
      });

      Product.remove(1, (err, data) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Delete operation failed');
        expect(data).toBeNull();
        done();
      });
    });
  });
});
