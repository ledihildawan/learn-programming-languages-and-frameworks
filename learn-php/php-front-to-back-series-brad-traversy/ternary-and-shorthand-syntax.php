<?php

$logged_in = true;

$arr = [1, 2, 3, 4, 5];

if ($logged_in) {
  echo 'You are logged in';
} else {
  echo 'You aren\'t loggged in';
}

echo ($logged_in) ? 'You are logged in' : 'You aren\'t loggged in';

$is_registered = ($logged_in) ? true : false;
echo $is_registered;

$age = 2;
$score = 11;

echo 'You score is: ' . ($score > 10 ? ($age > 10 ? 'Average' : 'Expectional') : ($age > 10 ? 'Horrible' : 'Average'));

?>

<div>
  <?php if ($logged_in) { ?>
    <h1>Welcome User</h1>
  <?php } else { ?>
    <h1>Welcome Guest</h1>
  <?php } ?>

  <?php if ($logged_in): ?>
    <h1>Welcome User</h1>
  <?php else: ?>
    <h1>Welcome Guest</h1>
  <?php endif; ?>
</div>

<ul>
  <?php foreach($arr as $val) { ?>
    <li><?php echo $val; ?></li>
  <?php } ?>
</ul>