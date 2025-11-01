import { body, validationResult, query } from 'express-validator';

/**
 * Validation rules for creating/updating transactions
 */
export const validateTransaction = [
  body('type')
    .isIn(['income', 'expense'])
    .withMessage('Type must be either "income" or "expense"'),
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be a positive number greater than 0'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isLength({ max: 100 })
    .withMessage('Category cannot exceed 100 characters'),
  body('date')
    .isISO8601()
    .withMessage('Date must be a valid ISO 8601 date string'),
];

/**
 * Validation rules for query parameters
 */
export const validateQueryParams = [
  query('type')
    .optional()
    .isIn(['income', 'expense'])
    .withMessage('Type must be either "income" or "expense"'),
  query('from')
    .optional()
    .isISO8601()
    .withMessage('From date must be a valid ISO 8601 date string'),
  query('to')
    .optional()
    .isISO8601()
    .withMessage('To date must be a valid ISO 8601 date string'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('sort')
    .optional()
    .isIn(['date_desc', 'date_asc', 'amount_desc', 'amount_asc'])
    .withMessage(
      'Sort must be one of: date_desc, date_asc, amount_desc, amount_asc'
    ),
];

/**
 * Middleware to handle validation errors
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      field: error.type === 'field' ? error.path : error.param,
      message: error.msg,
    }));

    return res.status(400).json({
      success: false,
      errors: formattedErrors,
    });
  }
  next();
};



