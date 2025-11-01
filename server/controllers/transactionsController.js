import Transaction from '../models/Transaction.js';
import { getPaginationParams, buildPaginationMeta } from '../utils/pagination.js';

/**
 * Build sort object from sort query parameter
 */
const buildSortObject = (sortParam) => {
  const sortMap = {
    date_desc: { date: -1 },
    date_asc: { date: 1 },
    amount_desc: { amount: -1 },
    amount_asc: { amount: 1 },
  };

  return sortMap[sortParam] || { createdAt: -1 }; // Default: newest first
};

/**
 * Build filter object from query parameters
 */
const buildFilterObject = (query) => {
  const filter = {};

  if (query.type) {
    filter.type = query.type;
  }

  if (query.category) {
    filter.category = new RegExp(query.category, 'i'); // Case-insensitive search
  }

  if (query.from || query.to) {
    filter.date = {};
    if (query.from) {
      filter.date.$gte = new Date(query.from);
    }
    if (query.to) {
      const toDate = new Date(query.to);
      // Set to end of day to include the entire day
      toDate.setHours(23, 59, 59, 999);
      filter.date.$lte = toDate;
    }
  }

  return filter;
};

/**
 * @desc    Create a new transaction
 * @route   POST /api/transactions
 * @access  Public
 */
export const createTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.create(req.body);

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all transactions with filtering, pagination, and sorting
 * @route   GET /api/transactions
 * @access  Public
 */
export const getTransactions = async (req, res, next) => {
  try {
    const filter = buildFilterObject(req.query);
    const sort = buildSortObject(req.query.sort);
    const { skip, limit, page } = getPaginationParams(
      req.query.page,
      req.query.limit
    );

    // Execute query with pagination
    const [transactions, total] = await Promise.all([
      Transaction.find(filter).sort(sort).skip(skip).limit(limit),
      Transaction.countDocuments(filter),
    ]);

    const pagination = buildPaginationMeta(page, limit, total);

    res.json({
      success: true,
      data: transactions,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single transaction by ID
 * @route   GET /api/transactions/:id
 * @access  Public
 */
export const getTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    res.json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a transaction
 * @route   PUT /api/transactions/:id
 * @access  Public
 */
export const updateTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    res.json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a transaction
 * @route   DELETE /api/transactions/:id
 * @access  Public
 */
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    res.json({
      success: true,
      message: 'Transaction deleted successfully',
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};



