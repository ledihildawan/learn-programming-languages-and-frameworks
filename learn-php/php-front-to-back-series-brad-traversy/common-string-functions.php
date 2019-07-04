<?php

# substr()
# Returns a portion of a string
$output = substr('Hello', 1, 3);
$output = substr('Hello', -2);
echo $output;

# strpos()
# Finds the position of the last occurence of a string
$output = strpos('Hello World', 'o');
echo $output;

# trim()
# Strips whitespace
$text = 'Hello World                               ';
var_dump($text);
$trimmed = trim($text);
var_dump($trimmed);

// strtoupper()
# Makes everything uppercase
$output = strtoupper('Hello World');
echo $output;

// strtolower()
# Makes everything lowercase
$output = strtolower('Hello World');
echo $output;

// ucwords()
# Capitalize every word
$output = ucwords('hello world');
echo $output;

// str_replace()
# Replace all occurences of a search string with a replacement
$text = 'Hello World';
$output = str_replace('World', 'Everyone', $text);
echo $output;

# is_string()
# Check if String
$val = '22';
$output = is_string($val);

echo $output;

$values = [true, false, null, 'abc', 33, '33', 22.4, '22.4', '', ' ', 0, '0'];

foreach ($values as $value) {
  if (is_string($value)) {
    echo "{$value} is a string <br />";
  }
}

# gzcompress
# Compress a string
$string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, deleniti debitis commodi fugiat quibusdam rem ullam sequi at magnam et molestiae vel, recusandae accusamus illum? Vero dignissimos sit officia aliquid!';
$compressed = gzcompress($string);
echo $compressed;
$original = gzuncompress($compressed);
echo $original;

?>