# SQL Query

SELECT id, name, price, category, quantity 
FROM Products 
WHERE price BETWEEN 50 AND 200 
ORDER BY price ASC 
LIMIT 10 OFFSET 0;

# NoSQL Query

Product.find({ category: "Electronics" })
  .sort({ price: -1 }) // -1 specifies descending order
  .limit(5)
  .skip(0);


# Optimization

## Indexing

- We could create a B-tree index for our pSQL database so that we dont do a full scan of our table with every request

- We could compound index our mongodb database which will allow us to instantly filter products by price and have them pre-sorted

## Caching
- We could in-memory caching on highly-requested read-only endpoints server-side so that we do not have to query our database for data that does not change frequently 