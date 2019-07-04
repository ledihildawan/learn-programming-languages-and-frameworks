<?php

$user = ['name' => 'Brad', 'email' => 'test@test.com', 'age' => 35];

$user = serialize($user);

setcookie('user', $user, time() + (86400 * 30));

$user = unserialize($_COOKIE['user']);

print_r($user);