#!/bin/bash

# Sample cURL commands for testing the Transactions API

BASE_URL="http://localhost:5000/api"

echo "=== Testing Transactions API ===\n"

# Health Check
echo "1. Health Check"
curl -X GET "₹BASE_URL/health"
echo -e "\n\n"

# Create Transaction - Income
echo "2. Create Income Transaction"
curl -X POST "₹BASE_URL/transactions" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "income",
    "amount": 3000,
    "description": "Monthly salary",
    "category": "Salary",
    "date": "2024-01-15T00:00:00.000Z"
  }'
echo -e "\n\n"

# Create Transaction - Expense
echo "3. Create Expense Transaction"
curl -X POST "₹BASE_URL/transactions" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "expense",
    "amount": 150.50,
    "description": "Grocery shopping",
    "category": "Groceries",
    "date": "2024-01-16T00:00:00.000Z"
  }'
echo -e "\n\n"

# Get All Transactions
echo "4. Get All Transactions"
curl -X GET "₹BASE_URL/transactions?page=1&limit=20&sort=date_desc"
echo -e "\n\n"

# Get Transactions by Type
echo "5. Get Income Transactions Only"
curl -X GET "₹BASE_URL/transactions?type=income"
echo -e "\n\n"

# Get Transactions by Category
echo "6. Get Transactions by Category"
curl -X GET "₹BASE_URL/transactions?category=Groceries"
echo -e "\n\n"

# Get Transactions by Date Range
echo "7. Get Transactions by Date Range"
curl -X GET "₹BASE_URL/transactions?from=2024-01-01&to=2024-01-31"
echo -e "\n\n"

# Note: Replace {id} with actual transaction ID from previous responses
echo "8. Get Single Transaction (replace {id} with actual ID)"
echo "curl -X GET \"₹BASE_URL/transactions/{id}\""
echo -e "\n"

echo "9. Update Transaction (replace {id} with actual ID)"
echo "curl -X PUT \"₹BASE_URL/transactions/{id}\" \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"amount\": 2000}'"
echo -e "\n"

echo "10. Delete Transaction (replace {id} with actual ID)"
echo "curl -X DELETE \"₹BASE_URL/transactions/{id}\""
echo -e "\n"

