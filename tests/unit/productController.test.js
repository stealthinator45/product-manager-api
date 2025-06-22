// File: tests/unit/productController.test.js

const {
  create,
  findAll,
  findOne,
  update,
  remove
} = require('../../controllers/productController');

// Correctly mock the Product class for Jest
jest.mock('../../models/product.model', () => {
  // Mock constructor (so new Product() works)
  function ProductMock(props) {
    return props;
  }
  // Attach static methods
  ProductMock.create = jest.fn();
  ProductMock.getAll = jest.fn();
  ProductMock.findById = jest.fn();
  ProductMock.updateById = jest.fn();
  ProductMock.remove = jest.fn();
  return ProductMock;
});

const Product = require('../../models/product.model');

describe('Product Controller Unit Tests', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { body: {}, params: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
  });

  describe('create()', () => {
    test('should return 400 when body is empty', async () => {
      mockReq.body = null;
      await create(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Content can not be empty!'
      });
    });

    test('should create product and return 200 status', async () => {
      mockReq.body = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        category: 'Test Category'
      };
      const created = { id: 1, ...mockReq.body };
      Product.create.mockImplementation((data, cb) => cb(null, created));

      await create(mockReq, mockRes);
      expect(Product.create).toHaveBeenCalledWith(
        expect.objectContaining(mockReq.body),
        expect.any(Function)
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith(created);
    });

    test('should return 500 on model error', async () => {
      mockReq.body = { name: 'X' };
      Product.create.mockImplementation((data, cb) => 
        cb(new Error('DB error'), null)
      );

      await create(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Some error occurred while creating the Product.'
      });
    });
  });

  describe('findAll()', () => {
    test('should return list of products', async () => {
      const list = [{ id: 1, name: 'A' }];
      Product.getAll.mockImplementation((cb) => cb(null, list));

      await findAll(mockReq, mockRes);
      expect(Product.getAll).toHaveBeenCalled();
      expect(mockRes.send).toHaveBeenCalledWith(list);
    });

    test('should return 500 on getAll error', async () => {
      Product.getAll.mockImplementation((cb) => 
        cb(new Error('fail'), null)
      );

      await findAll(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Some error occurred while retrieving products.'
      });
    });
  });

  describe('findOne()', () => {
    test('should return a single product', async () => {
      mockReq.params.productId = '1';
      const prod = { id: 1, name: 'A' };
      Product.findById.mockImplementation((id, cb) => cb(null, prod));

      await findOne(mockReq, mockRes);
      expect(Product.findById).toHaveBeenCalledWith('1', expect.any(Function));
      expect(mockRes.send).toHaveBeenCalledWith(prod);
    });

    test('should return 404 when not found', async () => {
      mockReq.params.productId = '99';
      Product.findById.mockImplementation((id, cb) => 
        cb({ kind: 'not_found' }, null)
      );

      await findOne(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Not found Product with id 99.'
      });
    });

    test('should return 500 on findById error', async () => {
      mockReq.params.productId = '1';
      Product.findById.mockImplementation((id, cb) => 
        cb(new Error('fail'), null)
      );

      await findOne(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Error retrieving Product with id 1'
      });
    });
  });

  describe('update()', () => {
    test('should update and return product', async () => {
      mockReq.params.productId = '1';
      mockReq.body = { 
        name: 'Updated Product',
        description: 'Updated Description',
        price: 199.99,
        category: 'Updated Category'
      };
      const updated = { id: 1, ...mockReq.body };
      Product.updateById.mockImplementation((id, data, cb) => 
        cb(null, updated)
      );

      await update(mockReq, mockRes);
      expect(Product.updateById).toHaveBeenCalledWith(
        '1',
        expect.objectContaining(mockReq.body),
        expect.any(Function)
      );
      expect(mockRes.send).toHaveBeenCalledWith(updated);
    });

    test('should return 404 on update not found', async () => {
      mockReq.params.productId = '99';
      mockReq.body = { name: 'Updated' };
      Product.updateById.mockImplementation((id, data, cb) => 
        cb({ kind: 'not_found' }, null)
      );

      await update(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Not found Product with id 99.'
      });
    });

    test('should return 500 on update error', async () => {
      mockReq.params.productId = '1';
      mockReq.body = { name: 'Updated' };
      Product.updateById.mockImplementation((id, data, cb) => 
        cb(new Error('fail'), null)
      );

      await update(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Error updating Product with id 1'
      });
    });
  });

  describe('delete()', () => {
    test('should delete a product', async () => {
      mockReq.params.productId = '1';
      Product.remove.mockImplementation((id, cb) => 
        cb(null, { message: 'Product was deleted successfully!' })
      );

      await remove(mockReq, mockRes);
      expect(Product.remove).toHaveBeenCalledWith('1', expect.any(Function));
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Product was deleted successfully!'
      });
    });

    test('should return 404 on delete not found', async () => {
      mockReq.params.productId = '99';
      Product.remove.mockImplementation((id, cb) => 
        cb({ kind: 'not_found' }, null)
      );

      await remove(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Not found Product with id 99.'
      });
    });

    test('should return 500 on delete error', async () => {
      mockReq.params.productId = '1';
      Product.remove.mockImplementation((id, cb) => 
        cb(new Error('fail'), null)
      );

      await remove(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: 'Could not delete Product with id 1'
      });
    });
  });
});
