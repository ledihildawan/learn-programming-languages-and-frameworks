<?php

#Array - Variable that holds multiple value
/*
  - Indexed
  - Associative
  - Multi-dimensional
*/

// Indexed
$people = array('Kevin', 'Jeremy', 'Sara');
$ids = array(23, 55, 12);
$cars = ['Honda', 'Toyoto', 'Ford'];
$cars[3] = 'Chevy';
$cars[] = 'BMW';

// echo count($cars);
// print_r($cars);
var_dump($cars);

// echo $people[3];
// echo $ids[2];
// echo $cars[4];

// Associative arrays
$people = array('Brad' => 35, 'Jose' => 32, 'William' => 37);
$ids = [22 => 'Brad', 44 => 'Jose', 63 => 'William'];

echo $people['Brad'];
echo $ids[22];
$people['Jill'] = 42;
// echo $people['Jill'];
// print_r($people);
// var_dump($people);

$cars = array(
  array('Honda', 20, 10),
  array('Toyota', 30, 20),
  array('Ford', 23, 12)
);

echo $cars[1][0];

?>