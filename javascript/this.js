// Global Context

// When 'this' is not not inside of declared object
console.log(this) // window

function whatIsThis() {
  return this
}

function variablesInThis() {
  // since the value of this is the window
  // all we are doing is creating a global variable
  this.person = 'Lorem'
}

console.log(person) // Lorem

whatIsThis() // window