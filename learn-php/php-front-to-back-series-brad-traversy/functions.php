<?php

# FUNCTION - Block of code that can be repeatedly called

/*
  Camel Case - myFunction()
  Lower Case - my_function()
  Pascal Case - MyFunction()
*/

// Create simple function
function simple_function() {
  echo 'Hello World!';
}

// Runs simple function
simple_function();

// Function with Param
function say_hello($name = 'World') {
  echo 'Hello ' . $name . '<br />';
}

// say_hello('Joe');
// say_hello('Bob');
say_hello('Tim');

// Return value
function add_numbers($num1, $num2) {
  return $num1 + $num2;
}

echo add_numbers(2, 3);

// By Reference

$my_num = 10;

function add_five($num) {
  $num += 5;
}

function add_ten(&$num) {
  $num += 10;
}

add_five($my_num);
echo 'Value: ' . $my_num . '<br />';
add_ten($my_num);
echo 'Value: ' . $my_num . '<br />';

?>