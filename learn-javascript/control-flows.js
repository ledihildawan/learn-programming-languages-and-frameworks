const hours = 12;
let role;

if (!(hours >= 23)) {
  if (hours >= 0 && hours < 12 && role == "moderator") {
    console.log("Good Morning! " + (role ? role : ""));
  } else if (hours >= 12 && hours < 19 && role == "user.") {
    console.log("Good Afternoon! " + (role ? role : ""));
  } else {
    console.log("Good Evening! " + (role ? role : "Guest."));
  }
} else {
  console.log("Please enter valid format hours, 0 to 23.");
}

switch (role) {
  case 'guest':
    console.log('Guest User');
    break;
  case 'moderator':
    console.log('Moderator');
    break;
  default:
    console.log('Unknow User!');
    break;
}