# Transactions Manager - Frontend

React frontend application for managing transactions built with Vite, Redux Toolkit, Tailwind CSS, and Recharts.

## Features

- ✅ Dashboard with summary cards (income, expenses, balance)
- ✅ Transaction filtering (type, category, date range)
- ✅ Pagination and sorting
- ✅ Create, update, and delete transactions
- ✅ Interactive charts (expense breakdown, monthly income vs expense)
- ✅ Form validation
- ✅ Error handling and loading states

## Setup

### Prerequisites

- Node.js >= 18
- Backend API running (see server README)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000
```

3. Start the development server:
```bash
npm run dev
```

The app will run on `http://localhost:3000`

4. Build for production:
```bash
npm run build
```

## Project Structure

```
client/
├── public/
├── src/
│   ├── components/
│   │   ├── ChartsPanel.jsx          # Charts (pie and bar)
│   │   ├── ErrorBanner.jsx           # Error display component
│   │   ├── Filters.jsx               # Filter controls
│   │   ├── LoadingSpinner.jsx        # Loading indicator
│   │   ├── SummaryCards.jsx          # Income/Expense/Balance cards
│   │   ├── TransactionForm.jsx       # Create/Edit form modal
│   │   └── TransactionsTable.jsx     # Transactions list with pagination
│   ├── store/
│   │   ├── slices/
│   │   │   └── transactionsSlice.js  # Redux slice with async thunks
│   │   └── store.js                  # Redux store configuration
│   ├── utils/
│   │   └── api.js                    # Axios instance configuration
│   ├── App.jsx                       # Main app component
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Tailwind CSS imports
├── .env.example
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Components

### SummaryCards
Displays three summary cards:
- Total Income
- Total Expenses
- Balance (Income - Expenses)

### Filters
Filter controls for:
- Type (income/expense/all)
- Category (text search)
- Date range (from/to)
- Sort order

### TransactionsTable
- Displays transactions in a table format
- Supports pagination
- Edit and delete actions
- Opens TransactionForm modal

### TransactionForm
Modal form for creating/editing transactions with:
- Client-side validation
- Real-time error display
- Character limits
- Date picker

### ChartsPanel
Two charts:
1. **Pie Chart**: Expense breakdown by category
2. **Bar Chart**: Monthly income vs expense comparison

## Redux State Management

The app uses Redux Toolkit for state management:

- **transactionsSlice**: Contains all transaction-related state and async thunks
  - `fetchTransactions`: Fetch transactions with filters
  - `createTransaction`: Create new transaction
  - `updateTransaction`: Update existing transaction
  - `deleteTransaction`: Delete transaction

### State Structure
```javascript
{
  transactions: [],
  loading: false,
  error: null,
  pagination: { ... },
  filters: { ... }
}
```

## API Integration

The frontend communicates with the backend API via axios instance configured in `src/utils/api.js`. The base URL is configurable via `VITE_API_URL` environment variable.

## Styling

The app uses Tailwind CSS for styling. All components are styled with utility classes for a clean, responsive design.

## Dependencies

- **React 18**: UI library
- **Redux Toolkit**: State management
- **React Redux**: React bindings for Redux
- **Axios**: HTTP client
- **Recharts**: Chart library
- **date-fns**: Date utility library
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Build tool and dev server

## Usage

1. **View Transactions**: Transactions are displayed in a table with pagination
2. **Filter**: Use the filters section to filter by type, category, date range, and sort order
3. **Add Transaction**: Click "Add Transaction" button to open the form modal
4. **Edit Transaction**: Click "Edit" button in the table row
5. **Delete Transaction**: Click "Delete" button (confirmation required)
6. **View Charts**: Charts automatically update based on current transactions

## CURSOR

