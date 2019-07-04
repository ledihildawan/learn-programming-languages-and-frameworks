<?php

session_start();

unset($_SESSION['name']);
// session_destroy();

header('Location: page-3.php');

?>