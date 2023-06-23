<?php

$post_titles = [
  "Hello World",
  "Hello PHP",
  "Hello WordPress!"
];

foreach ( $post_titles as $post_title ) {
  display_title($post_title);
}

/**
 * Display the title for a post
 *
 * @param string $title The title to b displayed
 */
function display_title( $title ) {
  echo "<h3>{$title}</h3>";
}