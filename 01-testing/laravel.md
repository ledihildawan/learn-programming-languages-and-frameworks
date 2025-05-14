## laravel

queue/jobs?
policy
provider
scope

// Video Project
channels
id
user_id
name
slug
description
image_filename
created_at
updated_at

on delete cascade

videos
id
channel_id
uid
title
description|null
processed|false
video_id|null
video_filename|null
visibility|enum:public,unlisted,private
allow_votes|false
allow_comments|false
processed_percentage|null
deleted_at
created_at
updated_at

video belongs to many channel

// Others
-- Your code to create the view:
CREATE VIEW library_authors AS
SELECT DISTINCT author AS unique_author
FROM books;

-- Select all columns from library_authors
SELECT \*
FROM library_authors;
