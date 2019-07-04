<?php

define('NAME', 'Yoshi');

$name = "yoshi";
$age = 30;
$radius = 25; 
$pi = 3.14;

// strlen()
// strtoupper()
// strtolower()
// str_replace()
// empty()
// substr()
// strpos()

// *, /, +, -, ^, ++, --, *=, /=, +=, -=, .=

// floor()
// ceil()
// pi()

$peopleOne = ['shaun', 'crystal', 'ryu'];
$peopleTwo = array('ken', 'chun-li');
$ages = [20, 30, 40, 50];
// print_r()
$ages[] = 60;
// array_push($ages, 70);
// array_unshift()
// count()
$peopleThree = array_merge($peopleOne, $peopleTwo);

$ninjaOne = [
  'shaun' => 'black',
  'mario' => 'orange',
  'luigi' => 'green'
];

$ninjaTwo = array(
  'luis' => 'purple',
  'james' => 'violet'
);

$ninjaThree = array_merge($ninjaOne, $ninjaTwo);

$blogs = [
  [
    'title' => 'mario party',
    'author' => 'mario',
    'content' => 'lorem',
    'likes' => 30
  ],
  [
    'title' => 'mario kart cheats',
    'author' => 'toad',
    'content' => 'lorem',
    'likes' => 25
  ],
  [
    'title' => 'zelda hidden chests',
    'author' => 'link',
    'content' => 'lorem',
    'likes' => 50
  ]
];

$blogs[] = ['title' => 'castle party', 'author' => 'peach', 'content' => 'lorem', 'likes' => 100];

$popped = array_pop($blogs);

for ($i = 0; $i < 5; $i++) {
  echo $i;
}

$for ($i = 0; $i < count($blogs); $i++) {
  echo $blogs[$i];
}

foreach($blogs as $blog) {
  echo $blog;
}

$products = [
  ['name' => 'shiny start', 'price' => 20],
  ['name' => 'green shell', 'price' => 10],
  ['name' => 'red shell', 'price' => 15],
  ['name' => 'gold coin', 'price' => 5],
  ['name' => 'lightning bolt', 'price' => 40],
  ['name' => 'banana skin', 'price' => 2],
];

$i = 0;

while ($i < count($products)) {
  echo $products['name'] . ' - $' . $products['price'];
  $i++;
}

// comparisons booleans (true or false)
// echo true; // "1"
// echo false; // ""
// >, <, >=, <=
// loose vs strict equal comparison
// ==, ===, !=, !==
// &&, ||

// Conditional statements

$price = 20;

if ($price < 10) {
  echo 'the condition is met';
} else if ($price < 20) {
  echo 'elseif condition met';
} else {
  echo 'condition not met';
}

foreach($products as $product) {
  // if ($product['price'] < 15 && $product['price'] > 2) {
  if ($product['price'] > 20 || $product['price'] < 10) {
    echo $product['price'];
  }
}

foreach($products as $product) {
  if ($product['name'] === 'lightning bolt') {
    break;
  }

  if ($product['price'] > 15) {
    continue;
  }

  echo $product['name'] . '<br />';
}

// var_dump()

// pounds to kilograms
$pounds = 140;
$lb_to_kg = 0.453592;
$kilograms = $pounds * $lb_to_kg;

// miles to km
$miles = 2.5;
$mile_to_km = 1.60934;
$kilometers = $miles * $mile_to_km;

// date()

// daily exercise
$exercise1 = 'Display Hello World!';
$exercise2 = 'Convert Pounds to Kilograms';
$exercise3 = 'Convert Kilograms to Pounds';
$exercise4 = 'Convert Miles to Kilometers';
$exercise5 = 'Convert Kilometers to Miles';
$exercise6 = 'Month long string of the day';
$exercise7 = 'String of the day with levels';

$date = date('N');

if ($date == 1) {
  echo $exercise1;
} else if ($date == 2) {
  echo $exercise2;
} else if ($date == 3) {
  echo $exercise3;
} else if ($date == 4) {
  echo $exercise4;
} else if ($date == 5) {
  echo $exercise5;
} else if ($date == 6) {
  echo $exercise6;
} else if ($date == 7) {
  echo $exercise7;
}

$today = date('l');

switch ($today) {
  case 'Monday':
    echo 'Wash on Monday';
    break;
  case 'Tuesday':
    echo 'Iron on Tuesday';
    break;
  case 'Wednesday':
    echo 'Mend on Wednesday';
    break;
  case 'Thursday':
    echo 'Churn on Thursday';
    break;
  case 'Friday':
    echo 'Clean on Friday';
    break;
  case 'Saturday':
  case 'Sunday':
    echo 'Rest on the weekend';
    break;
}

$first_name = 'Alena';
$last_name = 'Holligan';
$current_grade = 9;
$finalAverage = .90;
$message_body = '';

if (!$first_name || !$last_name) {
  echo 'Please enter a student name';
} elseif ($current_grade < 9 || $current_grade > 12) {
  echo 'This only for high school students. Please enter a grade between 9 and 12';
} else {
  echo "Dear $last_name $first_name\n";
  if ($finalAverage < .70) {
    $message_body = 'We look forward to seeing you at summer school, beginning July 1st!';
  } else {
    switch ($current_grade) {
      case 9:
        $message = 'Congratulations on completing your freshman year in High School! We\'ll see you on September 1st for the start of your sophomore year!';
        break;
      case 10:
        $message = 'Congratulations on completing your sophomore year in High School! We\'ll see you on September 1st for the start of your junior year!';
        break;
      case 11:
        $message = 'Congratulations on completing your junior year in High School! We\'ll see you on September 1st for the start of your senior year!';
        break;
      case 12:
        $message = 'Congratulations! You\'ve graduated High School! Don\'t forget to come back and visit.';
        break;
      default:
        $message = 'Error: Grade level is not 9-12!';
    }
  }
}

// include

function hello() {
  echo 'Hello, world!';
}

hello();

$current_user = 'mike';

function is_mike($current_user) {
  global $current_user;

  if ($current_user === 'mike') {
    echo 'It\'s Mike!';
  } else {
    echo 'Nope, It isn\'t Mike!';
  }
}

is_mike();

// is_array()

function hello($arr) {
  if (is_array($arr)) {
    foreach($arr as $name) {
      echo 'Hello, ' . $name . ' how\'s it going!<br />';
    }
  } else {
    echo 'Hello, friends!';
  }
}

$names = [
  'Mike',
  'Alena'
];

hello($names);

function get_info($name, $title = null) {
  if ($title) {
    echo $name . ' the ' . $title;
  } else {
    echo 'Hello ' . $title;
  }
}

get_info('John', 'Yoyo');

$name = 'John';
$greet = function() use ($name) {
  echo 'Hello, there, ' . $name;
};

$greet();

// array_keys()
// array_walk()
// array_shift()
// is_string()
// implode()

?>

<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <title>PHP &amp; MySQL Tutorial</title>

</head>
<body>
  <h1>User Profile Page</h1>
  <p><?php echo NAME; ?></p>
  <p><?php echo $age; ?></p>
</body>
</html>