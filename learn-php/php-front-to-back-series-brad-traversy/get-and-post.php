<?php

if (isset($_GET['name'])) {
  // print_r($_GET);
  $name = htmlentities($_GET['name']);
  // echo $name;
}

/*
if (isset($_POST['name'])) { 
  // print_r($_POST);  
  $name = htmlentities($_POST['name']);
  echo $name;
}

if (isset($_REQUEST['name'])) {
  // print($_REQUEST);
  $name = htmlentities($_REQUEST['name']);
  echo $name;
}

echo $_SERVER['QUERY_STRING'];
*/

?>

<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>My Website</title>
</head>
<body>
  <form action="./get-and-post.php" method="get">
    <div>
      <label for="name">Name</label>
      <input type="text" name="name" id="name" />
    </div>
    <div>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" />
    </div>
    <input type="submit" value="Submit" />
  </form>
  <ul>
    <li><a href="./get-and-post.php?name=Brad">Brad</a></li>
    <li><a href="./get-and-post.php?name=Steve">Steve</a></li>
  </ul>
  <h1><?php echo isset($name) ? "{$name}'s Profile" : ''; ?></h1>
</body>
</html>