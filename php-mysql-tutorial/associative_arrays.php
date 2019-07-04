<?php

$ice_cream = [
  'Alena' => 'Black Cherry',
  'Treasure' => 'Chocolate',
  'Dave' => 'Cookies and Cream',
  'Rialla' => 'Strawberry'
];

array_push($ice_cream,
  'alena' => 'Pistachio',
  'Dave Thomas' => 'Cookie Dough',
  // 'Vanilla',
  'Andrew' => true
);

ksort($ice_cream);
krsort($ice_cream);
asort($ice_cream);

$keys = [
  1 => 'a',
  1.5 => 'b',
  '1' => 'c',
  true => 'd'
];

?>