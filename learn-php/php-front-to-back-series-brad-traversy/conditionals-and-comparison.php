<?php

# CONDITIONALS

/*
  ==
  ===
  <
  >
  <=
  ?=
  !=
  !==
*/

$num = 5;

if ($num == 5) {
  echo '5 passed';
} elseif ($num = 6) {
  echo '6 passed';
} else {
  echo 'did not pass';
}

# NESTING IF

$num = 5;

if ($num > 5) {
  if ($num < 10) {
    echo $num . ' passed';
  } else {
    echo 'whatever';
  }
}

/*
  LOGICAL OPERATORS
  and &&
  or ||
  xor
*/

if ($num > 4 AND $num < 10) {
  echo $num . ' passed';
}

# SWITCH

$fav_color = 'red';

switch($fav_color) {
  case 'red':
    echo 'Your favorite color is ' . $fav_color;
    break;
  case 'blue':
    echo 'Your favorite color is ' . $fav_color;
    break;
  case 'green':
    echo 'Your favorite color is ' . $fav_color;
    break;
  default:
    echo 'Your favorite color is something else';
}

?>