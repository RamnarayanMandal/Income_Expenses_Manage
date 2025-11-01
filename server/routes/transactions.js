import express from 'express';
import {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transactionsController.js';
import {
  validateTransaction,
  validateQueryParams,
  handleValidationErrors,
} from '../middleware/validateRequest.js';

const router = express.Router();

// GET /api/transactions - Get all transactions with filtering, pagination, sorting
router.get(
  '/',
  validateQueryParams,
  handleValidationErrors,
  getTransactions
);

// GET /api/transactions/:id - Get single transaction
router.get('/:id', getTransaction);

// POST /api/transactions - Create new transaction
router.post(
  '/',
  validateTransaction,
  handleValidationErrors,
  createTransaction
);

// PUT /api/transactions/:id - Update transaction
router.put(
  '/:id',
  validateTransaction,
  handleValidationErrors,
  updateTransaction
);

// DELETE /api/transactions/:id - Delete transaction
router.delete('/:id', deleteTransaction);

export default router;



