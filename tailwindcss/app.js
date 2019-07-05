const signUpForm = document.querySelector('#signUp');
const signInForm = document.querySelector('#signIn');
const logOut = document.querySelector('#logOut');

// Listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('User logged in: ', user);
  } else {
    console.log('User logged out');
  }
});

// Sign up
signUpForm.addEventListener('submit', e => {
  e.preventDefault();

  const email = signUpForm['signUpEmail'].value.trim();
  const password = signUpForm['signUpPassword'].value.trim();

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(credential => console.log(credential));

  signUpForm.reset();
});

// Sign in
signInForm.addEventListener('submit', e => {
  e.preventDefault();

  const email = signInForm['signInEmail'].value.trim();
  const password = signInForm['signInPassword'].value.trim();

  auth
    .signInWithEmailAndPassword(email, password)
    .then(credential => console.log(credential));

  signInForm.reset();
});

// Log out
logOut.addEventListener('click', e => {
  e.preventDefault();

  auth
    .signOut()
    .then(_ => console.log('User has been logout'));
});