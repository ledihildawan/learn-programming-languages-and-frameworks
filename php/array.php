<?php

$array = [1, 2, 3, 4, 5];
$firstElement = array_first($array);
$lastElement = array_last($array);

$assocArray = [
  'a' => 1,
  'b' => 2,
  'c' => 3,
];

$firstKey = array_key_first($assocArray);
$lastKey = array_key_last($assocArray);

$listArray = [1, 2, 3, 4, 5];

$isList = array_is_list($listArray);
$isAssoc = array_is_list($assocArray);
$assocArrayToList = array_to_list($assocArray);

if (array_key_exists('b', $assocArray)) {
  // Key 'b' exists in $assocArray
}
