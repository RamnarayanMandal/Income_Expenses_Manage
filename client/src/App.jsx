import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from './store/slices/transactionsSlice';
import SummaryCards from './components/SummaryCards';
import Filters from './components/Filters';
import TransactionsTable from './components/TransactionsTable';
import ChartsPanel from './components/ChartsPanel';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBanner from './components/ErrorBanner';

function App() {
  const dispatch = useDispatch();
  const { loading, error, filters, pagination } = useSelector((state) => state.transactions);

  useEffect(() => {
    // Fetch transactions on mount with default filters
    dispatch(fetchTransactions({ 
      page: 1, 
      limit: 20, 
      sort: filters.sort || 'date_desc' 
    }));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Transactions Manager</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Banner */}
        <ErrorBanner error={error} />

        {/* Summary Cards */}
        <SummaryCards />

        {/* Charts Panel */}
        <ChartsPanel />

        {/* Filters */}
        <Filters />

        {/* Transactions Table */}
        {loading && <LoadingSpinner />}
        <TransactionsTable />
      </main>
    </div>
  );
}

export default App;



