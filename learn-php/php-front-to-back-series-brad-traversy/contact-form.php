<?php
// Message Vars
$msg = '';
$msg_class = '';

// Check For Submit
if (filter_has_var(INPUT_POST, 'submit')) {
  // Get Form Data
  $name = htmlspecialchars($_POST['name']);
  $email = htmlspecialchars($_POST['email']);
  $message = htmlspecialchars($_POST['message']);

  // Check Required Fields
  if (!empty($email) && !empty($name) && !empty($message)) {
    // Passed
    if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
      // Failed
      $msg = 'Please use a valid email';
      $msgClass = 'alert-danger';
    } else {
      // Passed
      // Recipient Email
      $to_email = 'support@traversymedia.com';
      $subject = 'Contact Request Form ' . $name;
      $body = '<h2>Contact Request</h2>';
      $body .= '<h4>Name</h4><p>' . $name . '</p>';
      $body .= '<h4>Email</h4><p>' . $email . '</p>';
      $body .= '<h4>Message</h4><p>' . $message . '</p>';
    }

    // Email Headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type:text/html;charset=UTF-8" . "\r\n";

    // Additional Headers
    $headers .= "From: " . $name . "<" . $email . ">" . "\r\n";

    if (mail($to_email, $subject, $body, $headers)) {
      // Email Sent
      $msg = 'Your email has been sent';
      $msg_class = 'alert-success';
    } else {
      // Failed
      $msg = 'Your was email NOT sent';
      $msg_class = 'alert-success';
    }
  } else {
    // Failed
    $msg = 'Please fill in all fields';
    $msg_class = 'alert-danger';
  }
}

?>


<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8" />

  <title>Contact US</title>

  <!-- <link rel="stylesheet" href="" /> -->

</head>
<body>
  <nav class="navbar navbar-default">
    <div class="container">
      <div class="navbar-header">
        <a href="<?php echo $_SERVER['PHP_SELF']; ?>" class="navbar-brand">My Website</a>
      </div>
    </div>
  </nav>
  <div class="container">
    <?php if (!empty($msg)) : ?>
      <div class="alert <?php echo $msg_class; ?>"><?php echo $msg; ?></div>
    <?php endif; ?>
    <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" type="text" name="name" class="form-control" value="<?php echo isset($_POST['name']) ? $name : ''; ?>" />
      </div>
      <div class="form-group">
        <label for="email">Eamil</label>
        <input id="email" type="text" name="email" class="form-control" value="<?php echo isset($_POST['email']) ? $email : ''; ?>" />
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea name="message" id="message"><?php echo isset($_POST['message']) ? $message : ''; ?></textarea>
      </div>
      <button type="submit" name="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</body>
</html>