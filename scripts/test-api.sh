#!/bin/bash

# Vyxlo API Test Script
# Tests all Sprint 1 endpoints

BASE_URL="${1:-http://localhost:3000}"
COOKIE_FILE="test-cookies.txt"

echo "Testing Vyxlo API at: $BASE_URL"
echo "=================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test health endpoint
echo -e "\n${GREEN}1. Testing Health Check${NC}"
curl -s "$BASE_URL/api/v1/health" | jq '.'

# Test user registration
echo -e "\n${GREEN}2. Testing User Registration${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@vyxlo.com",
    "password": "TestPassword123!",
    "username": "testuser",
    "full_name": "Test User"
  }')
echo "$REGISTER_RESPONSE" | jq '.'

# Test user login
echo -e "\n${GREEN}3. Testing User Login${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -c "$COOKIE_FILE" \
  -d '{
    "email": "test@vyxlo.com",
    "password": "TestPassword123!"
  }')
echo "$LOGIN_RESPONSE" | jq '.'

# Test protected endpoint (get current user)
echo -e "\n${GREEN}4. Testing Protected Endpoint (GET /users/me)${NC}"
USER_RESPONSE=$(curl -s "$BASE_URL/api/v1/users/me" \
  -b "$COOKIE_FILE")
echo "$USER_RESPONSE" | jq '.'

# Test token refresh
echo -e "\n${GREEN}5. Testing Token Refresh${NC}"
REFRESH_RESPONSE=$(curl -s -X POST "$BASE_URL/api/v1/auth/refresh" \
  -b "$COOKIE_FILE" \
  -c "$COOKIE_FILE")
echo "$REFRESH_RESPONSE" | jq '.'

# Test logout
echo -e "\n${GREEN}6. Testing Logout${NC}"
LOGOUT_RESPONSE=$(curl -s -X POST "$BASE_URL/api/v1/auth/logout" \
  -b "$COOKIE_FILE")
echo "$LOGOUT_RESPONSE" | jq '.'

# Test protected endpoint after logout (should fail)
echo -e "\n${GREEN}7. Testing Protected Endpoint After Logout (should fail)${NC}"
AFTER_LOGOUT=$(curl -s "$BASE_URL/api/v1/users/me" \
  -b "$COOKIE_FILE")
echo "$AFTER_LOGOUT" | jq '.'

# Cleanup
rm -f "$COOKIE_FILE"

echo -e "\n${GREEN}=================================="
echo "API Testing Complete"
echo "==================================${NC}"
