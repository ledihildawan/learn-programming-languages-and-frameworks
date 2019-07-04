<?php

session_start();

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
  <a href="page-3.php">Go to page 3</a>
</body>
</html>