#!/usr/bin/env bash

# Smoke test for SQL Flow
echo "============================================="
echo "1. POST /sql/books - Create SQL Book"
echo "============================================="
curl -X POST http://localhost:3000/sql/books \
  -H "Content-Type: application/json" \
  -d '{"title": "Clean Code", "authorName": "Robert C. Martin"}'
echo -e "\n"

echo "============================================="
echo "2. POST /sql/books - Create Duplicate SQL Book (Expect 409)"
echo "============================================="
curl -X POST http://localhost:3000/sql/books \
  -H "Content-Type: application/json" \
  -d '{"title": "Clean Code", "authorName": "Robert C. Martin"}'
echo -e "\n"

echo "============================================="
echo "3. GET /sql/books - Get All SQL Books"
echo "============================================="
curl -X GET http://localhost:3000/sql/books
echo -e "\n"

echo "============================================="
echo "4. GET /sql/books/1 - Get Detailed SQL Book"
echo "============================================="
curl -X GET http://localhost:3000/sql/books/1
echo -e "\n"

# Smoke test for NoSQL Flow
echo "============================================="
echo "5. POST /nosql/books - Create NoSQL Book"
echo "============================================="
curl -X POST http://localhost:3000/nosql/books \
  -H "Content-Type: application/json" \
  -d '{"title": "MongoDB The Definitive Guide", "authorName": "Shannon Bradshaw", "tags": ["database", "nosql"], "metadata": {"publisher": "O Reilly Media", "edition": "3rd"}}'
echo -e "\n"

echo "============================================="
echo "6. GET /nosql/books - Get All NoSQL Books"
echo "============================================="
curl -X GET http://localhost:3000/nosql/books
echo -e "\n"

echo "============================================="
echo "7. GET /nosql/books - Filter NoSQL Books by Tag"
echo "============================================="
curl -X GET "http://localhost:3000/nosql/books?tag=nosql"
echo -e "\n"

echo "============================================="
echo "8. GET /nosql/books - Filter NoSQL Books by Metadata Key/Value"
echo "============================================="
curl -X GET "http://localhost:3000/nosql/books?metaKey=edition&metaValue=3rd"
echo -e "\n"
