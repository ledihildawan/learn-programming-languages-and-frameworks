-- 1. the first user list
SELECT * FROM users ORDER BY created_at LIMIT 5;

-- 2. Most popular Registration Date
SELECT
  DAYNAME(users.created_at) AS day,
  COUNT(users.created_at) AS total
FROM users
GROUP BY day
ORDER BY total DESC
LIMIT 1;

-- 3. Identify Inactive Users (users with no photos)
SELECT users.username -- my version
  FROM users
LEFT JOIN photos
  ON users.id = photos.user_id
WHERE photos.image_url IS NULL;

SELECT users.username -- solution version
  FROM photos
RIGHT JOIN users
  ON users.id = photos.user_id
WHERE photos.id IS NULL;

-- 4. most likes on single photo
SELECT
  users.username,
  photos.id,
  photos.image_url,
  COUNT(*) AS likes
FROM photos
JOIN likes
  ON likes.photo_id = photos.id
JOIN users
  ON photos.user_id = users.id
GROUP BY photos.id
ORDER BY likes DESC
LIMIT 1;

-- 5. calulate avg number of photos per user
SELECT (SElECT COUNT(*) FROM photos) / (SELECT COUNT(*) FROM users);

-- most commonly used hastags
SELECT
  tags.tag_name,
  COUNT(*) AS total
FROM tags
JOIN photo_tags
  ON photo_tags.tag_id = tags.id
GROUP BY tags.id
ORDER BY total DESC
LIMIT 5;

-- find users who liked every single photo
SELECT
  username,
  COUNT(*) AS num_likes
FROM users
INNER JOIN likes
  ON users.id = likes.user_id
GROUP BY likes.user_id
HAVING num_likes = (SELECT COUNT(*) FROM photos);