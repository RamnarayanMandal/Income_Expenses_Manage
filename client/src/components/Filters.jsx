import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/slices/transactionsSlice';
import { fetchTransactions } from '../store/slices/transactionsSlice';

const Filters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.transactions);

  const [localFilters, setLocalFilters] = useState({
    type: filters.type || '',
    category: filters.category || '',
    from: filters.from || '',
    to: filters.to || '',
    sort: filters.sort || 'date_desc',
  });

  // Update local filters when Redux filters change
  useEffect(() => {
    setLocalFilters({
      type: filters.type || '',
      category: filters.category || '',
      from: filters.from || '',
      to: filters.to || '',
      sort: filters.sort || 'date_desc',
    });
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    
    // Update Redux filters
    dispatch(setFilters({ [key]: value }));
  };

  const handleApplyFilters = () => {
    // Remove empty filters
    const activeFilters = Object.fromEntries(
      Object.entries(localFilters).filter(([_, v]) => v !== '')
    );
    
    dispatch(setFilters(activeFilters));
    dispatch(fetchTransactions({ ...activeFilters, page: 1, limit: 20 }));
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      type: '',
      category: '',
      from: '',
      to: '',
      sort: 'date_desc',
    };
    setLocalFilters(clearedFilters);
    dispatch(setFilters(clearedFilters));
    dispatch(fetchTransactions({ page: 1, limit: 20, sort: 'date_desc' }));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={localFilters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            value={localFilters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            placeholder="Category..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* From Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From Date
          </label>
          <input
            type="date"
            value={localFilters.from}
            onChange={(e) => handleFilterChange('from', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* To Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Date
          </label>
          <input
            type="date"
            value={localFilters.to}
            onChange={(e) => handleFilterChange('to', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            value={localFilters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date_desc">Date (Newest)</option>
            <option value="date_asc">Date (Oldest)</option>
            <option value="amount_desc">Amount (High to Low)</option>
            <option value="amount_asc">Amount (Low to High)</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={handleApplyFilters}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Filters;



