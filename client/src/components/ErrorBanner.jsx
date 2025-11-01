import { useDispatch } from 'react-redux';
import { clearError } from '../store/slices/transactionsSlice';

const ErrorBanner = ({ error }) => {
  const dispatch = useDispatch();

  if (!error) return null;

  // Handle array of errors (validation errors)
  const errorMessages = Array.isArray(error) 
    ? error.map((err) => err.message || err).join(', ')
    : error;

  return (
    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-sm font-medium">{errorMessages}</p>
        </div>
        <button
          onClick={() => dispatch(clearError())}
          className="text-red-700 hover:text-red-900"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ErrorBanner;



