<?php

session_start();

// $_SESSION['name'] = 'John Doe';
// print_r($_SESSION);

$name = isset($_SESSION['name']) ? $_SESSION['name'] : 'Guest';
$email = $_SESSION['email'];

?>


<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8" />

  <title>PHP Sessions</title>

</head>
<body>
  <p>Thank you <?php echo $name; ?>, You have subscribed with the email <?php echo $email; ?></p>
  <a href="page-4.php">Go to page 4</a>
</body>
</html>