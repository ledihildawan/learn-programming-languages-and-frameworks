<?php

$learn = ['Conditionals', 'Arrays', 'Loops'];
array_push($learn, 'Functions', 'Forms', 'Objects');
array_unshift($learn, 'HTML', 'CSS');
asort($learn);
sort($learn);
rsort($learn);
shuffle($learn);
echo 'you removed ' . array_shift($learn);
echo 'you removed ' . array_pop($learn);
unset($learn[1], $learn[2]);
$learn = array_values($learn);
$learn = 'my learning list';
$learn[0] = 'Email';

?>