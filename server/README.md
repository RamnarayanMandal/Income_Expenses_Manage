# Transactions API - Backend

REST API backend for managing transactions (income/expense) built with Node.js, Express, and MongoDB.

## Features

- ✅ Full CRUD operations for transactions
- ✅ Filtering by type, category, and date range
- ✅ Pagination support
- ✅ Sorting options (date, amount)
- ✅ Request validation
- ✅ Centralized error handling
- ✅ MongoDB with Mongoose ODM

## Setup

### Prerequisites

- Node.js >= 18
- MongoDB (local or cloud instance)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/transactions_db
NODE_ENV=development
```

3. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Health Check
```
GET /api/health
```

### Transactions

#### Create Transaction
```
POST /api/transactions
Content-Type: application/json

{
  "type": "income",
  "amount": 1000,
  "description": "Salary",
  "category": "Salary",
  "date": "2024-01-15T00:00:00.000Z"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "type": "income",
    "amount": 1000,
    "description": "Salary",
    "category": "Salary",
    "date": "2024-01-15T00:00:00.000Z",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "errors": [
    {
      "field": "amount",
      "message": "Amount must be a positive number greater than 0"
    }
  ]
}
```

#### Get All Transactions
```
GET /api/transactions?type=income&category=Salary&page=1&limit=20&sort=date_desc
```

**Query Parameters:**
- `type` (optional): Filter by type (`income` or `expense`)
- `category` (optional): Filter by category (case-insensitive search)
- `from` (optional): Start date (ISO 8601 format, e.g., `2024-01-01`)
- `to` (optional): End date (ISO 8601 format, e.g., `2024-01-31`)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `sort` (optional): Sort order (`date_desc`, `date_asc`, `amount_desc`, `amount_asc`)

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "type": "income",
      "amount": 1000,
      "description": "Salary",
      "category": "Salary",
      "date": "2024-01-15T00:00:00.000Z",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "itemsPerPage": 20,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

#### Get Single Transaction
```
GET /api/transactions/:id
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "type": "income",
    "amount": 1000,
    "description": "Salary",
    "category": "Salary",
    "date": "2024-01-15T00:00:00.000Z",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Transaction not found"
}
```

#### Update Transaction
```
PUT /api/transactions/:id
Content-Type: application/json

{
  "amount": 1200,
  "description": "Updated salary"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "type": "income",
    "amount": 1200,
    "description": "Updated salary",
    "category": "Salary",
    "date": "2024-01-15T00:00:00.000Z",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

#### Delete Transaction
```
DELETE /api/transactions/:id
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Transaction deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "type": "income",
    "amount": 1000,
    "description": "Salary",
    "category": "Salary",
    "date": "2024-01-15T00:00:00.000Z"
  }
}
```

## Testing with cURL

### Create Transaction
```bash
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "type": "income",
    "amount": 1000,
    "description": "Salary",
    "category": "Salary",
    "date": "2024-01-15T00:00:00.000Z"
  }'
```

### Get All Transactions
```bash
curl http://localhost:5000/api/transactions?type=income&page=1&limit=20
```

### Get Single Transaction
```bash
curl http://localhost:5000/api/transactions/507f1f77bcf86cd799439011
```

### Update Transaction
```bash
curl -X PUT http://localhost:5000/api/transactions/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1200,
    "description": "Updated salary"
  }'
```

### Delete Transaction
```bash
curl -X DELETE http://localhost:5000/api/transactions/507f1f77bcf86cd799439011
```

## Project Structure

```
server/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   └── transactionsController.js  # Business logic
├── middleware/
│   ├── validateRequest.js    # Request validation
│   └── errorHandler.js       # Error handling
├── models/
│   └── Transaction.js        # Mongoose model
├── routes/
│   └── transactions.js       # API routes
├── utils/
│   └── pagination.js         # Pagination utilities
├── .env.example              # Environment variables example
├── package.json
├── README.md
└── server.js                 # Entry point
```

## Error Responses

All error responses follow this structure:

```json
{
  "success": false,
  "errors": [
    {
      "field": "amount",
      "message": "Amount must be a positive number greater than 0"
    }
  ]
}
```

Or for non-validation errors:

```json
{
  "success": false,
  "message": "Transaction not found"
}
```


