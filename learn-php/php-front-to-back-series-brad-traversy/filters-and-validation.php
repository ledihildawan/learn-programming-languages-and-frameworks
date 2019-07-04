<?php

/*
// Check for posted data
if (filter_has_var(INPUT_POST, 'data')) {
  echo 'Data found';
} else {
  echo 'Data NOT found';
}

// filter_input()

if (filter_has_var(INPUT_POST, 'data')) {
  $email = $_POST['data'];

  // Remove Illegal chars
  $email = filter_var($email, FILTER_SANITIZE_EMAIL);
  
  if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo 'Email is valid';
  } else {
    echo 'Email is NOT valid';
  }
}

# FILTER_VALIDATE_BOOLEAN
# FILTER_VALIDATE_EMAIL
# FILTER_VALIDATE_FLOAT
# FILTER_VALIDATE_INT
# FILTER_VALIDATE_IP
# FILTER_VALIDATE_REGEXP
# FILTER_VALIDATE_URL

# FILTER_SANITIZE_EMAIL
# FILTER_SANITIZE_ENCODED
# FILTER_SANITIZE_NUMBER_FLOAT
# FILTER_SANITIZE_NUMBER_INT
# FILTER_SANITIZE_SPECIAL_CHARS
# FILTER_SANITIZE_STRING
# FILTER_SANITIZE_URL

$var = 'dua puluh tiga';
if (filter_var($var, FILTER_VALIDATE_INT)) {
  echo $var . ' is a number';
} else {
  echo $var . ' is NOT a number';
}

$number = '312321fsajl90';
var_dump(filter_var($number, FILTER_SANITIZE_NUMBER_INT));

$filters = [
 'data' => FILTER_VALIDATE_EMAIL,
 'data2' => [
   'filter' => FILTER_VALIDATE_INT,
   'options' => [
     'min_range' => 1,
     'max_range' => 100
   ]
 ]
];

print_r(filter_input_array(INPUT_POST, $filters));
*/

$arr = [
  'name' => 'brad traversy',
  'age' => 35,
  'email' => 'brad@gmail.com'
];

$filters = [
  'name' => [
    'filter' => FILTER_CALLBACK,
    'options' => 'ucwords'
  ],
  'age' => [
    'filter' => FILTER_VALIDATE_INT,
    'options' => [
      'min_range' => 1,
      'max_range' => 120
    ]
  ],
  'email' => FILTER_VALIDATE_EMAIL
];

print_r(filter_var_array($arr, $filters));

?>

<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
  <input type="text" name="data" />
  <input type="text" name="data2" />
  <button type="submit">Send</button>
</form>