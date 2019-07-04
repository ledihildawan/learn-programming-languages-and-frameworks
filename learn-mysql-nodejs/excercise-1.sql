SELECT
  DATE_FORMAT(created_at, '%b %D %Y') AS earliest_date
FROM users
ORDER BY created_at
LIMIT 1;

SELECT
  DATE_FORMAT(MIN(created_at), '%b %D %Y') AS earliest_date
FROM users;

-----

SELECT
 *
FROM users
WHERE created_at = (SELECT created_at FROM users ORDER BY created_at LIMIT 1);

SELECT *
FROM users
WHERE created_at = (SELECT MIN(created_at) FROM users);

---- 
SELECT
  MONTHNAME(created_at) AS month,
  COUNT(*) AS count
FROM users
GROUP BY month
ORDER BY count DESC;

SELECT COUNT(*) AS yahoo_users FROM users WHERE email LIKE '%@yahoo.com';

SELECT
  CASE
    WHEN email LIKE '%@gmail.com' THEN 'gmail'
    WHEN email LIKE '%@yahoo.com' THEN 'yahoo'
    WHEN email LIKE '%@hotmail.com' THEN 'hotmail'
    ELSE 'others'
  END AS provider,
  COUNT(*) AS total_users
FROM users
GROUP BY provider
ORDER BY total_users DESC;