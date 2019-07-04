<?php

if (filter_has_var(INPUT_POST, 'submit')) {
  session_start(); // Start the session

  $_SESSION['name'] = htmlentities($_POST['name']);
  $_SESSION['email'] = htmlentities($_POST['email']);

  header('Location: page-2.php');
}

?>


<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8" />

  <title>PHP Sessions</title>

</head>
<body>
  <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
    <div>
      <input type="text" name="name" placeholder="Enter name" />
    </div>
    <div>
      <input type="text" name="email" placeholder="Enter email" />
    </div>
    <div>
      <input type="submit" name="submit" value="Submit" />
    </div>
  </form>
</body>
</html>