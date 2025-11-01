/**
 * Pagination utility function
 * @param {number} page - Current page number (1-based)
 * @param {number} limit - Number of items per page
 * @returns {Object} - Object with skip and limit values
 */
export const getPaginationParams = (page = 1, limit = 20) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 20));
  const skip = (pageNum - 1) * limitNum;

  return {
    skip,
    limit: limitNum,
    page: pageNum,
  };
};

/**
 * Build pagination response metadata
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total number of items
 * @returns {Object} - Pagination metadata
 */
export const buildPaginationMeta = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);

  return {
    currentPage: page,
    itemsPerPage: limit,
    totalItems: total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
};



