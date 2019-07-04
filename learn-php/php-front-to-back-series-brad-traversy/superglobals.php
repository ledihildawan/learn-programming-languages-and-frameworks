<?php

# $_SERVER Superglobal

// Create Server Array
$server = [
  'Host Server Name' => $_SERVER['SERVER_NAME'],
  'Host Header' => $_SERVER['HTTP_HOST'],
  'Server Software' => $_SERVER['SERVER_SOFTWARE'],
  'Document Root' => $_SERVER['DOCUMENT_ROOT'],
  'Current Page' => $_SERVER['PHP_SELF'],
  'Script Name' => $_SERVER['SCRIPT_NAME'],
  'Absolute Path' => $_SERVER['SCRIPT_FILENAME']
];

// Create Client Array
$client = [
  'Client System Info' => $_SERVER['HTTP_USER_AGENT'],
  'Client IP' => $_SERVER['REMOTE_ADDR'],
  'Remote Port' => $_SERVER['REMOTE_PORT']
];

function get_info($val) {
  $display = 'Not found';
  
  if ($val) {
    $display = '<ul class="list-group">';
      foreach ($val as $key => $value) {
        $display .= '<li class="list-group-item">';
          $display .= '<strong>' . $key . '</strong>: ' . $value;
        $display .= '</li>';
      }
    $display .= '</ul>';

    echo $display;
  } else {
    echo $display;
  }
}

?>

<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <title>System Info</title>

</head>
<body>
  <div class="container">
    <h1>Server &amp; File Info</h1>
    <?php get_info($server); ?>

    <h1>Client Info</h1>
    <?php get_info($client); ?>
  </div>
</body>
</html>