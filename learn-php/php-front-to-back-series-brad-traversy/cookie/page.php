<?php

if (isset($_POST['submit'])) {
  $username = htmlentities($_POST['username']);

  setcookie('username', $username, time() + 3600);
  // 1 Hour

  header('Locaiton: page2.php');
}

?>

<!doctype html>

<html lang="en">
<head>
  <title>PHP Cookie</title>
</head>
<body>
  <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
    <input type="text" name="username" placeholder="Enter Username" />
    <input type="submit" name="submit" value="Submit" />
  </form>
</body>
</html>